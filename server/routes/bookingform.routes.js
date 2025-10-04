// routes/bookingRoutes.js
const express = require("express");
const { createBooking, getAllBookingsWithStatus } = require("../controller/bookingform.controller");
const { adminProtected } = require("../middleware/protected");
const router = express.Router();


// POST route to create a booking
router
    .post("/bookings", adminProtected, createBooking)
    .get("/full-booking", adminProtected, getAllBookingsWithStatus)

module.exports = router;
