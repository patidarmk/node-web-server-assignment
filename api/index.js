const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    let url = req.url.split('?')[0];

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

    fs.readFile(filePath, (err, content) => {
        if (err) {
            const notFoundPath = path.join(process.cwd(), 'public', '404.html');

            fs.readFile(notFoundPath, (error, data) => {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end(data || '404 Not Found');
            });
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.end(content);
        }
    });
};
