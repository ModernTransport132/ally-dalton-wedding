const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(process.argv[2] || __dirname);
const port = Number(process.argv[3] || 4178);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.ics': 'text/calendar' };
http.createServer((req, res) => {
  let url, pathname;
  try { url = new URL(req.url, 'http://localhost'); pathname = decodeURIComponent(url.pathname); }
  catch { res.writeHead(400); return res.end('Invalid URL'); }
  const page = pathname.match(/^\/([a-z0-9-]+)(?:\.html|\/)?$/i);
  const name = pathname === '/' ? 'index' : page && page[1];
  const filename = name === 'home' ? 'index' : name;
  const pageFile = filename && path.join(root, filename + '.html');
  let file;
  if (pageFile && fs.existsSync(pageFile)) {
    const canonical = filename === 'index' ? '/home' : '/' + filename;
    if (pathname !== canonical) {
      res.writeHead(302, { Location: canonical + url.search });
      return res.end();
    }
    file = pageFile;
  } else {
    file = path.resolve(root, '.' + pathname);
  }
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      const notFound = path.join(root, '404.html');
      return res.end(req.method === 'HEAD' ? undefined : fs.existsSync(notFound) ? fs.readFileSync(notFound) : 'Not found');
    }
    res.setHeader('Content-Type', mime[path.extname(file).toLowerCase()] || 'application/octet-stream');
    res.end(req.method === 'HEAD' ? undefined : data);
  });
}).listen(port, '127.0.0.1', () => console.log('Preview on http://localhost:' + port + '/home'));
