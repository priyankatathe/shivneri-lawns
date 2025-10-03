// routes/bookingRoutes.js
const express = require("express");
const { createBooking } = require("../controller/bookingform.controller");
const router = express.Router();


// POST route to create a booking
router.post("/bookings", createBooking);

module.exports = router;
