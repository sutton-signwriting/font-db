
const fsw = require('../fsw');
const swu = require('../swu');

const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const prefix = '<?xml version="1.0" standalone="no"?>\n';

function toInt(obj) {
  for (const key in obj) {
    obj[key] = parseInt(obj[key]);
  }
  return obj;
}
const server = http.createServer((request, response) => {
  const parsed = url.parse(request.url);
  const parsedQuery = toInt(querystring.parse(parsed.query))
  const parts = decodeURIComponent(parsed.pathname).split('/');
  const label = parts.slice(1, 4).join('-');
  switch (label) {
    case "fsw-symbol-svg":
      fsw.symbolSvg(parts[4]).then( res => {
        response.writeHead(200, { "Content-Type": "image/svg+xml; charset=utf-8" })
        response.write(prefix)
        response.write(res)
        response.end();
      })
      break;
    case "fsw-symbol-png":
      fsw.symbolPng(parts[4],parsedQuery).then( res => {
        response.writeHead(200, { "Content-Type": "image/png" })
        response.write(res)
        response.end();
      })
      break;
    case "fsw-symbol-normalize":
      fsw.symbolNormalize(parts[4]).then( res => {
        response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
        response.write(res || "")
        response.end();
      })
      break;
    case "fsw-sign-svg":
      fsw.signSvg(parts[4]).then ( res => {
        response.writeHead(200, { "Content-Type": "image/svg+xml; charset=utf-8" })
        response.write(prefix)
        response.write(res)
        response.end();
      })
      break;
    case "fsw-sign-png":
      fsw.signPng(parts[4],parsedQuery).then ( res => {
        response.writeHead(200, { "Content-Type": "image/png" })
        response.write(res)
        response.end();
      })
      break;
    case "fsw-sign-normalize":
      fsw.signNormalize(parts[4]).then ( res => {
        response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
        response.write(res)
        response.end();
      })
      break;
    case "swu-symbol-svg":
      swu.symbolSvg(parts[4], parsedQuery).then ( res => {
        response.writeHead(200, { "Content-Type": "image/svg+xml; charset=utf-8" })
        response.write(prefix)
        response.write(res)
        response.end();
      })
      break;
    case "swu-symbol-png":
      swu.symbolPng(parts[4],parsedQuery).then ( res => {
        response.writeHead(200, { "Content-Type": "image/png" })
        response.write(res)
        response.end();
      })
      break;
    case "swu-symbol-normalize":
      swu.symbolNormalize(parts[4]).then ( res => {
        response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
        response.write(res)
        response.end();
      })
      break;
    case "swu-sign-svg":
      swu.signSvg(parts[4]).then ( res => {
        response.writeHead(200, { "Content-Type": "image/svg+xml; charset=utf-8" })
        response.write(prefix)
        response.write(res)
        response.end();
      })
      break;
    case "swu-sign-png":
      swu.signPng(parts[4],parsedQuery).then ( res => {
        response.writeHead(200, { "Content-Type": "image/png" })
        response.write(res)
        response.end();
      })
      break;
    case "swu-sign-normalize":
      swu.signNormalize(parts[4]).then ( res => {
        response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
        response.write(res)
        response.end();
      })
      break;
    default:
      fs.readFile("server/index.html", (err, res) => {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
        response.write(err || res);
        response.end();
      });
  }
})

server.listen(4200);

console.log("Listening at http://localhost:4200")
