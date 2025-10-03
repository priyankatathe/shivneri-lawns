const asyncHandler = require("express-async-handler");
const BookingForm = require("../model/BookingForm");
// const Booking = require("../models/EventBooking");  // तुझं booking मॉडेल



exports.createBooking = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            phone1,
            phone2,
            address,
            location,
            eventType,
            startDate,
            endDate,
            package: pkg,
            cateringRequired,
            cateringItems,
            gatePackageRequired,
            gatePackageItems,
            totalRs,
            discount,
            finalPrice,
            advancePayment,
            balance,
            chequeRequired,
            notes
        } = req.body;

        // बेसिक validation
        if (!name || !phone1 || !address || !location || !eventType
            || !startDate || !endDate || !pkg || totalRs == null
            || finalPrice == null || advancePayment == null || balance == null
            || chequeRequired == null) {
            return res.status(400).json({ message: "काही आवश्यक फील्ड्स गायब आहेत." });
        }

        // तारीख स्वरूप तपासणी
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start) || isNaN(end)) {
            return res.status(400).json({ message: "तारीखांचा स्वरूप चुकीचा आहे." });
        }

        // तारीख ओव्हरलॅप तपासणी
        const conflict = await BookingForm.findOne({
            $or: [
                {
                    startDate: { $lte: end },
                    endDate: { $gte: start }
                }
            ]
        });

        if (conflict) {
            return res.status(400).json({ message: "ही तारीख आधीपासून बुक आहे." });
        }
        console.log("Request Body:", req.body);

        // बुकिंग तयार करा
        const booking = await BookingForm.create({
            name,
            phone1,
            phone2,
            address,
            location,
            eventType,
            startDate: start,
            endDate: end,
            package: pkg,
            cateringRequired,
            cateringItems: cateringRequired ? cateringItems : [],
            gatePackageRequired,
            gatePackageItems: gatePackageRequired ? gatePackageItems : [],
            totalRs,
            discount,
            finalPrice,
            advancePayment,
            balance,
            chequeRequired,
            notes
        });
        console.log("Saved Booking:", booking);
        return res.status(201).json({ message: "Booking created successfully", booking });

    } catch (error) {
        console.error("Error in createBooking:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

