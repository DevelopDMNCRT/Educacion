const http = require('http');
const server = http.createServer((req, res) => res.end('hello'));
server.listen(4000, () => console.log('HTTP Server listening on 4000'));
