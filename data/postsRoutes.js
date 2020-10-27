const express = require('express')
const Hubs = require('./db.js')

const router = express.Router();

router.get('/', (req, res) => {
    const posts = ['Post 1', 'Post 2', 'Post 3'];
    res.status(200).json(posts) 
})

module.exports = router;