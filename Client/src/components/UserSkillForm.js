import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UserSkillForm = ({ currentUser }) => {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState('');
  const [experience, setExperience] = useState('');
  const token = sessionStorage.getItem('token');

  const handleSkillChange = (event) => {
    setSkill(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const handleAddSkill = async () => {
    if (skill.trim() !== '' && experience.trim() !== '') {
      try {
        const response = await axios.post("http://localhost:3001/addSkills", {
          FirstName: currentUser.FirstName,
          Email: currentUser.Email,
          Skill: skill,
          Experience: experience
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        setSkills([...skills, { _id: response.data._id, Skill: skill, Experience: experience }]);
        setSkill('');
        setExperience('');
        console.log("Skill data sent to another API:", response.data);
      } catch (error) {
        console.error("Error adding skill:", error);
      }
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteSkill/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      setSkills(skills.filter(skill => skill._id !== id));
      console.log("Skill deleted successfully");
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getSkills", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div>
      <label htmlFor="skill">Skill:</label>
      <input
        type="text"
        id="skill"
        value={skill}
        onChange={handleSkillChange}
        placeholder="Enter skill"
      />

      <label htmlFor="experience">Experience:</label>
      <input
        type="text"
        id="experience"
        value={experience}
        onChange={handleExperienceChange}
        placeholder="Enter experience"
      />

      <button onClick={handleAddSkill}>Add Skill</button>

      <div>
        <h2>Skills List</h2>
        <ul>
          {skills.map((item, index) => (
            <li key={index}>
              Skill: {item.Skill}, Experience: {item.Experience}
              <button onClick={() => handleDeleteSkill(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
