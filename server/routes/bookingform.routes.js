const router = require("express").Router()
const { createBooking, updateBooking } = require("../controller/bookingform.controller");

router
    // POST route to create a booking
    .post("/bookings", createBooking)
    .put("/update/:bookingId", updateBooking)

module.exports = router
