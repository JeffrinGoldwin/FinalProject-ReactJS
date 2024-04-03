const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const courseController = require('../controllers/courseController');
const eventController = require('../controllers/eventController');
const acceptrejectController = require("../controllers/acceptrejectController");
const verifyToken = require("../utils/verifyJWT")

router.get('/currentUser', verifyToken, authController.currentUser)
router.post('/login', authController.login)
router.post('/changePassword', verifyToken, authController.changePassword)

router.get('/getUsers', verifyToken, userController.getUser)
router.post('/createUser', verifyToken, userController.createUser);

router.get('/courses', verifyToken, courseController.courses)
router.post('/addCourse', verifyToken, courseController.addCourse)

router.get('/events', verifyToken, eventController.events)
router.get('/eventAlmostFull', verifyToken, eventController.eventAlmostFull)
router.post('/addEvent', verifyToken, eventController.addEvent)
router.post('/send-email', verifyToken, eventController.sendIntrestedMail)
router.post('/Confirmation', verifyToken, eventController.confirmation)
router.put('/updateEvent/:id', verifyToken, eventController.updateEvent)
router.put('updateEventStatus/:eventId', verifyToken, eventController.updateEventStatus)
router.delete('/deleteEvent/:eventId', verifyToken, eventController.deleteEvent)

router.get('/checkAcceptReject', verifyToken, acceptrejectController.checkAcceptReject)
router.post('/addAcceptReject', verifyToken, acceptrejectController.addAcceptReject)

module.exports = router;
