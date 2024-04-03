import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const CourseCards = (props) => {
    const [videoDetails, setVideoDetails] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const videoIds = props.videoData.map(video => getVideoIdFromUrl(video.VideoURL));
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAl4QaW5zS1oP1U_c0sqmbRHF7DZRG6hGw&part=contentDetails&id=${videoIds.join(',')}`, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    }
                  });
                setVideoDetails(response.data.items);
            } catch (error) {
                console.error('Error fetching video details:', error);
            }
        };

        fetchVideoDetails();
    }, [props.videoData]);

    const getVideoIdFromUrl = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/);
        return match && match[1];
    };

    const parseVideoDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    
        const hours = match[1] ? parseInt(match[1].slice(0, -1)) : 0;
    
        return `${hours > 0 ? hours + 'h' : ''}`;
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
                                    overflow: 'hidden', // Hide any overflow content
                                }}>
                                <Card.Title>{video.VideoTitle}</Card.Title>
                                {videoDetails[index] && (
                                    <Card.Subtitle className="mb-2 text-muted">{parseVideoDuration(videoDetails[index].contentDetails.duration)}</Card.Subtitle>
                                )}
                                <Card.Text style={{
                                    height: '70px', // Set the desired height for the cards
                                    overflow: 'scroll', // Hide any overflow content
                                }}>{video.VideoDescription}</Card.Text>
                                {props.Role==="Admin" && <Button>Edit</Button>}
                                {props.Role==="User" && <Button>Go To course</Button>}
                                {console.log("hii")}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CourseCards;
