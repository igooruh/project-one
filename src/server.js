// CommonJS
// const http = require('');

// ESModule
// add on file package type: module
import http from 'node:http';
// when use ES Module is needed import file with your extension
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

const server = http.createServer(async (request, response) => {
    const { method, url } = request;

    await json(request, response);

    const route = routes.find(route => {
        return route.method === method && route.path === url;
    });

    if(route) {
        return route.handler(request, response);
    }

    return response
        .writeHead(404)
        .end('Not Found');
});

server.listen(3333);
