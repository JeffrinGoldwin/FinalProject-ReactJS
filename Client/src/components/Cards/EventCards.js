import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { EventDetailsModel } from '../Model/EventDetailsModel';

export const EventCards = (props) => {
  return (
    <div>
      <Container>
        <Row xs={1} md={2} lg={3} className="g-4">
          {props.events.map((event, index) => (
            <Col key={index}>
              <EventCard event={event} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

const EventCard = ({ event }) => {
  const [eventDetailsModelshow, setEventDetailsModelShow] = useState(false);

  const handleEventDetailsModel = () => setEventDetailsModelShow(true);
  const handleClose = () => setEventDetailsModelShow(false);

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{event.EventName}</Card.Title>
          <Card.Subtitle>{event.Time}</Card.Subtitle>
          <br />
          <Button onClick={handleEventDetailsModel} variant="primary">
            View Details
          </Button>
          <EventDetailsModel
            eventDetailsModelshow={eventDetailsModelshow}
            handleClose={handleClose}
            event={event}
          />
        </Card.Body>
      </Card>
    </div>
  );
};
