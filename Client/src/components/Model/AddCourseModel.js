import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export const AddCourseModel = (props) => {

    const [videoUrl, setVideoUrl] = useState('');
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDifficulty, setCourseDifficulty] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const token = sessionStorage.getItem('token');


  const handleClose = () => props.setShow(false);

  const handleAddCourse = async () => {
    try {
      const response = await axios.post("http://localhost:3001/addCourse" , {
        videoUrl : videoUrl,
        courseTitle : courseTitle,
        courseDifficulty : courseDifficulty,
        courseDescription : courseDescription
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        console.log("Course added successfully:", response.data);
        setVideoUrl('');
        setCourseTitle('');
        setCourseDescription('');
        setCourseDifficulty('');
        handleClose();
    } catch (error) {
        console.error("Error adding course:", error);
    }
};

  return (
    <div>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Course Title : <input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}/>
          <br />
          <br />
          Course Difficulty : <select type="text" value={courseDifficulty} onChange={(e) => setCourseDifficulty(e.target.value)}>
            <option selected hidden> -- select option --</option>
            <option value = "Easy">Easy</option>
            <option value="Intermediate">Intermediate</ option>
            <option value="Hard">Hard</option>
          </select>
          <br />
          <br />
          Course Link : <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)}/>
          <br />
          <br />
          Description : {''}
          <textarea
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            rows={3}
            col={20}
            style={{ resize: "vertical", width: "190px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleAddCourse} className="flex rounded-md mx-1 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add</button>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
};
