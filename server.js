const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    let url = req.url === '/' || req.url === '/home' ? '/index.html' : req.url;
    
    // Ensure .html extension for clean routes
    if (!url.includes('.')) url += '.html';

    const filePath = path.join(__dirname, 'public', url);
    const extname = path.extname(filePath);

    const contentTypeMap = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript'
    };

    const contentType = contentTypeMap[extname] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (error, data) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(data, 'utf8');
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
