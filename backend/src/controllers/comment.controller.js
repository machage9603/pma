const Comment = require('../models/comment.model');
const Task = require('../models/task.model');

const createComment = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId)
      .populate('project');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const comment = await Comment.create({
      content: req.body.content,
      user: req.user._id,
      task: task._id,
      mentions: req.body.mentions || []
    });

    await comment.populate(['user', 'mentions']);

    // If using Socket.io, emit event for real-time updates
    req.io.to(`task-${task._id}`).emit('newComment', comment);

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};