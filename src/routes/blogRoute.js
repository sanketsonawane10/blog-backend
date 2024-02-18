const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router

    .post('/', blogController.blogCreate)
    .get('/:id', blogController.blogDetails)
    .get('/', blogController.blogList)

module.exports = router;
