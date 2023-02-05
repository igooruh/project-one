// CommonJS
// const http = require('');

// ESModule
// add on file package type: module
import http from 'node:http';
// when use ES Module is needed import file with your extension
import { json } from './middlewares/json.js';

const users = [];

const server = http.createServer(async (request, response) => {

    const { method, url } = request;

    await json(request, response);

    if(method === 'GET' && url === '/users') {
        return response.end(JSON.stringify(users));
    }

    if(method === 'POST' && url === '/user') {

        const { name, email } = request.body;

        users.push({
            id: 1,
            name,
            email
        });

        return response
            .writeHead(201)
            .end();
    }

    return response
        .writeHead(404)
        .end('Not Found');
    
});

server.listen(3333);
