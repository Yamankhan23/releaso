const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const auth = require('../middlewares/auth.middleware');

router.use(auth);

// MUST BE ABOVE /:id
router.get('/stats', postCtrl.getStats);

router.get('/', postCtrl.getPosts);
router.post('/', postCtrl.createPost);
router.get('/:id', postCtrl.getPostById);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;