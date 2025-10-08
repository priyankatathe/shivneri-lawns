// routes/bookingRoutes.js
const express = require("express");
const { createBooking, getAllBookingsWithStatus, updateBooking, deleteBooking, getBookings } = require("../controller/bookingform.controller");
const { adminProtected } = require("../middleware/protected");
const router = express.Router();


// POST route to create a booking
router
    .post("/bookings", adminProtected, createBooking)
    .put("/updateBooking/:id", adminProtected, updateBooking)
    // .get("/full-booking", adminProtected, getAllBookingsWithStatus)

    .get("/get-booking", adminProtected, getBookings)

    .delete('/deleteBooking/:id', deleteBooking)
module.exports = router;
