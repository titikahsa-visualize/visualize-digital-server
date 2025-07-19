import ProjectDetails from '../models/ProjectDetails.js';

// Dummy project generator
const generateDummyProject = (id) => ({
  id,
  name: "Untitled Project",
  category: "General",
  subtitle: "This is a placeholder project",
  description: "Dummy description for a newly created placeholder project.",
  heroImage: "https://via.placeholder.com/800x600.png?text=Project+Image",
  tags: ["Placeholder", "Dummy"],
  year: "2025",
  client: "Unknown",
  rating: 3,
  role: "Not Assigned",
  duration: "TBD",
  teamSize: "TBD",
  keyFeatures: [
    "This is a dummy feature",
    "Auto-generated on missing ID"
  ],
  liveLink: "",
  githubLink: ""
});

// ✅ Fetch project details or create dummy if not found
export const getProjectDetails = async (req, res) => {
  const id = Number(req.params.id);

  try {
    // Check if the specific project exists
    let project = await ProjectDetails.findOne({ id });

    // If not, create dummy project
    if (!project) {
      const dummyData = generateDummyProject(id);
      await ProjectDetails.create(dummyData);
    }

    // Now fetch all projects (including the one just created)
    const allProjects = await ProjectDetails.find();

    return res.status(200).json({
      message: "Project list fetched successfully",
      data: allProjects
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


// ✅ Update project or create dummy first if not found
export const updateProjectById = async (req, res) => {
  const id = Number(req.params.id); // Convert ID to number
  const updateData = req.body;

  try {
    let project = await ProjectDetails.findOne({ id });

    if (!project) {
      const dummyData = generateDummyProject(id);
      await ProjectDetails.create(dummyData);
    }

    const updated = await ProjectDetails.findOneAndUpdate(
      { id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Project updated",
      data: updated
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

export const deleteProjectById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const project = await ProjectDetails.findOne({ id });

    if (!project) {
      return res.status(404).json({
        message: "Project not found. Nothing to delete.",
      });
    }

    await ProjectDetails.deleteOne({ id });

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete project",
      error: error.message,
    });
  }
};
