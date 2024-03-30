import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const CourseCards = ({ courses }) => {
  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
        {courses.map((item, index) => (
          <Col key={index}>
            <Card>
              <Card.Body>
                <Card.Title>{item}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CourseCards;
