const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { createComment } = require('../controllers/comment.controller');

const router = express.Router({ mergeParams: true });

router.use(protect);
router.post('/', createComment);

module.exports = router;
