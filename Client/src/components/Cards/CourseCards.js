import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const CourseCards = (props) => {
    const [videoDetails, setVideoDetails] = useState([]);
    const [editMode, setEditMode] = useState([]);
    const [executed, setExecuted] = useState(false);
    const navigate = useNavigate();
    const [editedVideos, setEditedVideos] = useState(Array(props.videoData.length).fill({}));
    const token = sessionStorage.getItem('token');

    const fetchVideoDetails = async () => {
        try {
            const videoIds = props.videoData.map(video => getVideoIdFromUrl(video.VideoURL));
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=YOUR_API_KEY&part=contentDetails&id=${videoIds.join(',')}`);
            setVideoDetails(response.data.items);
            // Initialize editMode state for each card
            setEditMode(Array(props.videoData.length).fill(false));
        } catch (error) {
            console.error('Error fetching video details:', error);
        }
    };

    const myFunction = () => {
        if (!executed) {
            fetchVideoDetails();
            setExecuted(true);
        }
    };

    useEffect(() => {
        myFunction();
    }, []);

    const getVideoIdFromUrl = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/);
        return match && match[1];
    };

    const parseVideoDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = match[1] ? parseInt(match[1].slice(0, -1)) : 0;
        return `${hours > 0 ? hours + 'h' : ''}`;
    };    

    const handleEdit = (index) => {
        setEditedVideos(prevState => {
            const updatedVideos = [...prevState];
            updatedVideos[index] = props.videoData[index]; // Initialize edited video with original data
            return updatedVideos;
        });
        setEditMode(prevState => {
            const updatedMode = [...prevState];
            updatedMode[index] = true; // Enable edit mode for the corresponding card
            return updatedMode;
        });
    };

    const handleSave = async (index) => {
        // Implement saving edited video data here
        setEditMode(prevState => {
            const updatedMode = [...prevState];
            updatedMode[index] = false; // Disable edit mode for the corresponding card
            return updatedMode;
        });

        try {
            // Make a PUT or PATCH request to your backend API with the updated video data
            console.log(editedVideos[0].VideoTitle)
            console.log(token)
            const response = await axios.put(`http://localhost:3001/EditCourse`,{ updatedData  :editedVideos[0]}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
            });
            
            console.log('Video data updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating video data:', error);
            // Handle errors, such as displaying an error message to the user
        }
    };

    const handleCancel = (index) => {
        setEditMode(prevState => {
            const updatedMode = [...prevState];
            updatedMode[index] = false; // Disable edit mode for the corresponding card
            return updatedMode;
        });
    };

    const handleDelete = async (index) => {
        try {
            // Make a DELETE request to your backend API to delete the video data
            const response = await axios.delete(`http://localhost:3001/DeleteVideo/${props.videoData[index]._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            console.log('Video data deleted successfully:', response.data);
            // Optionally, you can update the local state to reflect the deletion
        } catch (error) {
            console.error('Error deleting video data:', error);
            // Handle errors, such as displaying an error message to the user
        }
    };

    const handleGoTo = (index) => {
        const videoId = props.videoData[index]._id; // Assuming _id is the video ID
        navigate(`video?ID=${encodeURIComponent(videoId)}`);
    };


    return (
        <Container>
            <Row xs={1} md={2} lg={3} className="g-4">
                {props.videoData.map((video, index) => (
                    <Col key={index}>
                        <Card>
                            <img
                                src={`https://img.youtube.com/vi/${getVideoIdFromUrl(video.VideoURL)}/0.jpg`}
                                alt={video.VideoTitle}
                                className="card-img-top"
                            />
                            <Card.Body style={{
                                    height: '210px', // Set the desired height for the cards
                                    overflow: 'scroll', // Hide any overflow content
                                }}>
                                {editMode[index] ? (
                                    <Form>
                                        <Form.Group controlId="videoTitle">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control type="text" value={editedVideos[index].VideoTitle} onChange={(e) => setEditedVideos(prevState => {
                                                const updatedVideos = [...prevState];
                                                updatedVideos[index] = { ...editedVideos[index], VideoTitle: e.target.value };
                                                return updatedVideos;
                                            })} />
                                        </Form.Group>
                                        <Form.Group controlId="videoDescription">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={3} value={editedVideos[index].VideoDescription} onChange={(e) => setEditedVideos(prevState => {
                                                const updatedVideos = [...prevState];
                                                updatedVideos[index] = { ...editedVideos[index], VideoDescription: e.target.value };
                                                return updatedVideos;
                                            })} />
                                        </Form.Group>
                                        <Button variant="primary" onClick={() => handleSave(index)}>Save</Button>
                                        <Button variant="secondary" onClick={() => handleCancel(index)}>Cancel</Button>
                                    </Form>
                                ) : (
                                    <>
                                        <Card.Title>{video.VideoTitle}</Card.Title>
                                        {videoDetails[index] && (
                                            <Card.Subtitle className="mb-2 text-muted">{parseVideoDuration(videoDetails[index].contentDetails.duration)}</Card.Subtitle>
                                        )}
                                        <Card.Text style={{
                                            height: '70px', // Set the desired height for the cards
                                            overflow: 'scroll', // Hide any overflow content
                                        }}>{video.VideoDescription}</Card.Text>
                                        {props.Role === "Admin" ? (
                                        <>
                                            <Button variant="primary" onClick={() => handleEdit(index)}>
                                                Edit
                                            </Button>
                                            {' '}
                                            <Button variant="primary" onClick={() => handleDelete(index)}>
                                                Delete
                                            </Button>
                                        </>
                                        ) : (
                                            <Button variant="primary" onClick={() => handleGoTo(index)}>
                                                Go to Courses
                                            </Button>
                                        )}
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CourseCards;
