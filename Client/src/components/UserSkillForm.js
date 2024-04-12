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
        const response = await axios.post("http://localhost:3001/getSkills", {Email: currentUser.Email},
        {
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
  }, [handleAddSkill]);

  return (
    <div className="border-b border-gray-900/10 pb-12 mx-20 my-10">
      <label htmlFor="skill" className="block text-sm font-medium leading-6 text-gray-900">Skill:</label>
      <input
        type="text"
        id="skill"
        value={skill}
        onChange={handleSkillChange}
        placeholder="Enter skill"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <label htmlFor="experience" className="block mt-4 text-sm font-medium leading-6 text-gray-900">Experience:</label>
      <input
        type="text"
        id="experience"
        value={experience}
        onChange={handleExperienceChange}
        placeholder="Enter experience"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <button onClick={handleAddSkill} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Skill
      </button>

      <div className="mt-8">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Skills List</h2>
        <ul className="mt-2">
          {skills.map((item) => (
            <li key={item._id} className="mt-2">
              Skill: {item.Skill}, Experience: {item.Experience}
              <button onClick={() => handleDeleteSkill(item._id)} className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
