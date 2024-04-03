const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const courseController = require('../controllers/courseController');
const eventController = require('../controllers/eventController');
const acceptrejectController = require("../controllers/acceptrejectController");

router.get('/currentUser', authController.currentUser)
router.post('/login', authController.login)
router.post('/changePassword', authController.changePassword)

router.get('/getUsers', userController.getUser)
router.post('/createUser', userController.createUser);

router.get('/courses', courseController.courses)
router.post('/addCourse', courseController.addCourse)

router.get('/events', eventController.events)
router.get('/eventAlmostFull', eventController.eventAlmostFull)
router.post('/addEvent', eventController.addEvent)
router.post('/send-email', eventController.sendIntrestedMail)
router.post('/Confirmation', eventController.confirmation)
router.put('/updateEvent/:id', eventController.updateEvent)
router.put('updateEventStatus/:eventId', eventController.updateEventStatus)
router.delete('/deleteEvent/:eventId', eventController.deleteEvent)

router.get('/checkAcceptReject', acceptrejectController.checkAcceptReject)
router.post('/addAcceptReject', acceptrejectController.addAcceptReject)

module.exports = router;
