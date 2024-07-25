const express = require('express');
const router = express.Router();
const eventController = require('../../Controllers/EventController/eventController');
const authMiddleware = require('../../Middleware/authMiddleware');


// Create a new event
router.post('/create', authMiddleware, eventController.createEvent);

// Get all events
router.get('/',authMiddleware, eventController.getAllEvents);

// Get upcoming events (more than two days left)
router.get('/upcoming', authMiddleware, eventController.getUpcomingEvents);

// Get events with two days or less remaining
router.get('/two-days-or-less', authMiddleware, eventController.getEventsWithTwoDaysOrLessRemaining);

// Get outdated events
router.get('/outdated', authMiddleware, eventController.getOutdatedEvents);

module.exports = router;
