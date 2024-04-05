const SkillModel = require("../models/skills")

const addSkill = async (req, res) => {
    try {
        const { FirstName, Email, Skill, Experience } = req.body;
        console.log(req.body)
        console.log(Skill)
        const newSkill = new SkillModel({
            FirstName : FirstName,
            Email : Email,
            Skill : Skill,
            Experience :Experience
        });
        await newSkill.save();
        res.status(201).json({ message: "Skill added successfully", skill: newSkill });
    } catch (error) {
        res.status(500).json({ message: "Failed to add skill", error: error.message });
    }
}

const getSkills = async (req, res) => {
    try {
        const skills = await SkillModel.find();
        res.status(200).json(skills);
    } catch (error) {
        console.error("Error fetching skills:", error);
        res.status(500).json({ message: "Failed to fetch skills", error: error.message });
    }
}

const deleteSkills = async (req, res) => {
    const skillId = req.params.id;
  try {
    // Find the skill by ID and delete it
    const deletedSkill = await SkillModel.findByIdAndDelete(skillId);
    
    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {addSkill, getSkills, deleteSkills}