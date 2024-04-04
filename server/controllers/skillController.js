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

module.exports = {addSkill, getSkills}