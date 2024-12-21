const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addProjectMember
} = require('../controllers/project.controller');

const router = express.Router();

router.use(protect); // All project routes require authentication

router
  .route('/')
  .post(createProject)
  .get(getProjects);

router
  .route('/:id')
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

router.post('/:id/members', addProjectMember);

module.exports = router;