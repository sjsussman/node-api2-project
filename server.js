const express = require('express')

const postsRoutes = require('./data/postsRoutes.js')

const server = express();

server.use(express.json())
server.use(postsRoutes);

server.get('/', (req, res) => {
    res.send('Hello from the home page!')
});

module.exports = server;