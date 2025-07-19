import Project from '../models/projectModel.js';

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching projects' });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({ id: Number(req.params.id) });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching project' });
  }
};

// Create a new project
const createProject = async (req, res) => {
  try {
    const { id, name, category, tags, image, summary, year, client, rating } = req.body;

    const newProject = new Project({
      id,
      name,
      category,
      tags,
      image,
      summary,
      year,
      client,
      rating,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create project' });
  }
};

// Update a project by ID
// controllers/portfolioController.js

 const updateProject = async (req, res) => {
  try {
    const id = Number(req.params.id); // Convert string to number
    const updatedData = req.body;

    const updatedProject = await Project.findOneAndUpdate(
      { id }, // query using numeric custom ID
      updatedData,
      { new: true, runValidators: true } // Optional: runValidators ensures schema validation
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};



// Delete a project by ID
const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findOneAndDelete({ id: Number(req.params.id) });

    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting project' });
  }
};

export {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};

