// routes/bookingRoutes.js
const express = require("express");
const { createBooking, getAllBookingsWithStatus } = require("../controller/bookingform.controller");
const router = express.Router();


// POST route to create a booking
router
    .post("/bookings", createBooking)
    .get("/full-booking", getAllBookingsWithStatus)

module.exports = router;
