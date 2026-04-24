const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    let url = req.url;

    // 🔥 IMPORTANT: remove query params
    url = url.split('?')[0];

    if (url === '/' || url === '/home') {
        url = '/index.html';
    }

    if (!url.includes('.')) {
        url += '.html';
    }

    const filePath = path.join(process.cwd(), 'public', url);
    const extname = path.extname(filePath);

    const contentTypeMap = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript'
    };

    const contentType = contentTypeMap[extname] || 'text/plain';

    console.log("Requested URL:", url);
    console.log("File path:", filePath);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.log("Error:", err.code);

            if (err.code === 'ENOENT') {
                const notFoundPath = path.join(process.cwd(), 'public', '404.html');

                fs.readFile(notFoundPath, (error, data) => {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data || '404 Not Found');
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
