const Event = require('../../Models/Event');
const jwt = require('jsonwebtoken');
const moment = require('moment');

// Create a new event
const createEvent = async (req, res) => {
  try {
    // Verify token from headers
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId

    // Check if decoded token is valid
    if (!decoded) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { type, date, venue, colors, ambiance, food, extraDetails } = req.body;

    // Parse date to ensure correct format
    const eventDate = moment(date, 'YYYY-MM-DD').toDate();

    // Calculate total price
    let totalPrice = 0;
    totalPrice += venue.price;
    ambiance.forEach(item => {
      totalPrice += item.price;
    });
    food.forEach(item => {
      totalPrice += item.price;
    });

    // Check for venue availability on the chosen date
    const existingEvent = await Event.findOne({ 'venue.name': venue.name, date: eventDate });
    if (existingEvent) {
      return res.status(400).json({ error: 'This venue is already booked on the selected date. Please choose another date or venue.' });
    }

    // Create new event with calculated totalPrice
    const newEvent = new Event({
      type,
      date: eventDate,
      venue,
      colors,
      ambiance,
      food,
      totalPrice,
      extraDetails,
      user : userId
    });

    // Save event to database
    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Retrieve all events
const getAllEvents = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const events = await Event.find({ user: userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUpcomingEvents = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const currentDate = new Date();
    const twoDaysLater = new Date(currentDate);
    twoDaysLater.setDate(currentDate.getDate() + 2);

    const upcomingEvents = await Event.find({
      user: userId,
      date: { $gt: twoDaysLater }
    });

    res.json(upcomingEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve events with two days or less remaining
const getEventsWithTwoDaysOrLessRemaining = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const currentDate = moment().startOf('day').toDate();
    const twoDaysLater = moment(currentDate).add(2, 'days').endOf('day').toDate();

    // Find events that are within the next two days and have not yet passed
    const upcomingEvents = await Event.find({
      user: userId,
      date: {
        $gte: currentDate,
        $lte: twoDaysLater
      }
    });

    res.json(upcomingEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve outdated events
const getOutdatedEvents = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const currentDate = moment().startOf('day').toDate();

    // Find events where date is less than current date (i.e., events that have passed)
    const outdatedEvents = await Event.find({
      user: userId,
      date: { $lt: currentDate }
    });

    res.json(outdatedEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getUpcomingEvents,
  getEventsWithTwoDaysOrLessRemaining,
  getOutdatedEvents
};
