const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    let url = req.url === '/' || req.url === '/home' ? '/index.html' : req.url;

    // Add .html if no extension
    if (!url.includes('.')) url += '.html';

    const filePath = path.join(process.cwd(), 'public', url);
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
                fs.readFile(path.join(process.cwd(), 'public', '404.html'), (error, data) => {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                });
            } else {
                res.statusCode = 500;
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.end(content);
        }
    });
};
