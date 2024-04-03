import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export const AddCourseModel = (props) => {

    const [videoUrl, setVideoUrl] = useState('');
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const token = sessionStorage.getItem('token');


  const handleClose = () => props.setShow(false);

  const handleAddCourse = async () => {
    try {
        const response = await axios.post("http://localhost:3001/addCourse" , {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: {
            videoUrl,
            courseTitle,
            courseDescription
          }
        })
        console.log("Course added successfully:", response.data);
        setVideoUrl('');
        setCourseTitle('');
        setCourseDescription('');
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
          <Button onClick={handleAddCourse} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
