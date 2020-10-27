const express = require('express')

const postsRoutes = require('./data/postsRoutes')
const server = express();

server.use('/posts', postsRoutes);

server.use('/', (req, res) => {
    res.status(200).send('Hello from the home page!')
});

server.listen(8000, () => {
    console.log('Server is listening on PORT 8000')
})