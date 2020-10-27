const express = require('express');
const { route } = require('../server.js');
const Posts = require('./db.js')

const router = express.Router();

router.get('/api/posts', (req, res) => {
    console.log(req.query)
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        //log error to data
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving posts'
        })
    })
})

router.get('/api/posts/:id', (req, res) => {
    console.log(req.query)
    Posts.findById(req.params.id)
    .then(post => {
        if (post.length) {
            res.status(200).json(post);
            console.log(post)
        } else {
            res.status(404).json({ message:'Post not found' })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: 'Error retrieving the posts'
        })
    })
})

router.get('/api/posts/:id/comments', (req, res) => {
    console.log(req.query)
    Posts.findPostComments(req.params.id)
    .then(post => {
        if (post.length) {
            const temp = post.map((comment)=>{
                return comment.text
            })
            res.status(200).json(temp);
            console.log(post)
        } else {
            res.status(404).json({ message:'Post not found' })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: 'Error retrieving the comments'
        })
    })
})

router.post('/api/posts', (req, res) => {
    Posts.insert(req.body)
    .then(post => {
    // console.log(req.body)
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the post',
      });
    });
  });

  router.post('/api/posts/:id/comments', (req, res) => {
      const newComment = { post_id: req.params.id, ...req.body }
      console.log('REQ BODY:', req.body)
      Posts.insertComment(newComment)
      .then(post => {
          res.status(201).json(post);
        //   console.log(req.body)
      })
      .catch(error => {
        console.log(error.message, error.stack) // you need both of these pieces
        res.status(500).json({
          message: error.message,
          stack: error.stack,
        })
      })
    })

    router.delete('/api/posts/:id', (req, res) => {
        Posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                    message: 'The post has been deleted'
                })
            } else {
                res.status(404).json({
                    message: 'Error removing the post'
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
              message: 'Error removing the post',
            });
          });
    })

    router.put('/api/posts/:id', (req, res) => {
        const postChanges= req.body;
        Posts.update(req.params.id, postChanges)
        .then(edit => {
            if(edit) {
                res.status(200).json(postChanges);
                console.log(postChanges)
                //console logging edit returns 1
            } else {
                res.status(404).json({
                    message: 'The post could not be found'
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error updating the posts'
            })
        })
    })

module.exports = router;