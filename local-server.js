const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = 8000;

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') {
    reqPath = '/index.html';
  }

  const filePath = path.join(root, reqPath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
    res.end(data);
  });
}).listen(port, () => {
  console.log(`Local server running at http://127.0.0.1:${port}`);
});
