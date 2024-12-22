const Task = require('../models/task.model');
const Project = require('../models/project.model');

// @desc    Create new task
// @route   POST /api/projects/:projectId/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user has access to project
    const isMember = project.members.some(member =>
      member.user.toString() === req.user._id.toString()
    );

    if (project.owner.toString() !== req.user._id.toString() && !isMember) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const task = await Task.create({
      ...req.body,
      project: req.params.projectId
    });

    await task.populate('assignedTo', 'name email');

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get project tasks
// @route   GET /api/projects/:projectId/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'name email');

    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/projects/:projectId/tasks/:taskId
// @access  Private
const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findById(task.project);

    // Check if user has access to project
    const isMember = project.members.some(member =>
      member.user.toString() === req.user._id.toString()
    );

    if (project.owner.toString() !== req.user._id.toString() && !isMember) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/projects/:projectId/tasks/:taskId
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findById(task.project);

    // Check if user has access to project
    const isMember = project.members.some(member =>
      member.user.toString() === req.user._id.toString()
    );

    if (project.owner.toString() !== req.user._id.toString() && !isMember) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await task.remove();

    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};
