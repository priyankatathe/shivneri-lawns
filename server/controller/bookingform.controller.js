const asyncHandler = require("express-async-handler");
const BookingForm = require("../model/BookingForm");

exports.createBooking = asyncHandler(async (req, res) => {
    try {
        // ✅ Step 1: Parse cateringItems
        let cateringItems = req.body.cateringItems;
        if (typeof cateringItems === "string") {
            try {
                cateringItems = JSON.parse(cateringItems);
            } catch (e) {
                console.error("Invalid cateringItems JSON string");
                cateringItems = [];
            }
        }

        // ✅ Step 2: Parse gatePackageItems
        let gatePackageItems = req.body.gatePackageItems;
        if (typeof gatePackageItems === "string") {
            try {
                gatePackageItems = JSON.parse(gatePackageItems);
            } catch (e) {
                console.error("Invalid gatePackageItems JSON string");
                gatePackageItems = [];
            }
        }

        // ✅ Step 3: Get flags from user input (string to boolean)
        let cateringRequired = req.body.cateringRequired;
        let gatePackageRequired = req.body.gatePackageRequired;

        // Convert "true"/"false" strings to real booleans if needed
        if (typeof cateringRequired === "string") cateringRequired = cateringRequired === "true";
        if (typeof gatePackageRequired === "string") gatePackageRequired = gatePackageRequired === "true";

        // ✅ Step 4: Strict Validation — if items दिले आहेत तर required = true हवंच
        if (Array.isArray(cateringItems) && cateringItems.length > 0) {
            if (!cateringRequired) {
                return res.status(400).json({
                    message: "तुम्ही cateringItems दिले आहेत, पण cateringRequired false आहे.",
                });
            }
        }

        if (Array.isArray(gatePackageItems) && gatePackageItems.length > 0) {
            if (!gatePackageRequired) {
                return res.status(400).json({
                    message: "तुम्ही gatePackageItems दिले आहेत, पण gatePackageRequired false आहे.",
                });
            }
        }

        // ✅ Step 5: Remaining fields
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
            totalRs,
            discount = 0,
            finalPrice,
            advancePayment,
            balance,
            chequeRequired,
            notes,
            inquiryOnly
        } = req.body;

        // ✅ Step 6: Inquiry Only Case
        if (inquiryOnly) {
            if (!name || !phone1 || !address) {
                return res.status(400).json({ message: "काही आवश्यक फील्ड्स गायब आहेत." });
            }

            const booking = await BookingForm.create({
                name,
                phone1,
                phone2,
                address,
                inquiryOnly: true,
            });

            return res.status(201).json({ message: "चौकशी यशस्वी झाली", booking });
        }

        // ✅ Step 7: Validate full booking
        if (
            !name || !phone1 || !address || !location || !eventType ||
            !startDate || !endDate || !pkg ||
            totalRs === undefined || finalPrice === undefined ||
            advancePayment === undefined || balance === undefined ||
            chequeRequired === undefined || chequeRequired === null
        ) {
            return res.status(400).json({ message: "काही आवश्यक फील्ड्स गायब आहेत." });
        }

        // ✅ Step 8: Validate Dates
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start) || isNaN(end)) {
            return res.status(400).json({ message: "तारीखांचा स्वरूप चुकीचा आहे." });
        }

        // ✅ Step 9: Check Date Conflict
        const conflict = await BookingForm.findOne({
            startDate: { $lte: end },
            endDate: { $gte: start }
        });

        if (conflict) {
            return res.status(400).json({ message: "ही तारीख आधीपासून बुक आहे." });
        }

        // ✅ Step 10: Build Booking Data
        // ✅ Step 10: Build Booking Data
        const bookingData = {
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
            gatePackageRequired,
            totalRs,
            discount,
            finalPrice,
            advancePayment,
            balance,
            chequeRequired: chequeRequired ? "होय" : "नाही", // ✅ enum friendly value
            notes,
            inquiryOnly: false,
        };


        if (cateringRequired && Array.isArray(cateringItems)) {
            bookingData.cateringItems = cateringItems;
        }

        if (gatePackageRequired && Array.isArray(gatePackageItems)) {
            bookingData.gatePackageItems = gatePackageItems;
        }

        // ✅ Step 11: Save booking
        const booking = await BookingForm.create(bookingData);

        return res.status(201).json({ message: "Booking created successfully", booking });

    } catch (error) {
        console.error("Error in createBooking:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

exports.updateBooking = asyncHandler(async (req, res) => {
    try {
        const { bookingId } = req.params;

        let booking = await BookingForm.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "बुकिंग सापडले नाही." });
        }

        // ✅ Parse cateringItems
        let cateringItems = req.body.cateringItems;
        if (typeof cateringItems === "string") {
            try {
                cateringItems = JSON.parse(cateringItems);
            } catch (e) {
                console.error("Invalid cateringItems JSON string");
                cateringItems = [];
            }
        }

        // ✅ Parse gatePackageItems
        let gatePackageItems = req.body.gatePackageItems;
        if (typeof gatePackageItems === "string") {
            try {
                gatePackageItems = JSON.parse(gatePackageItems);
            } catch (e) {
                console.error("Invalid gatePackageItems JSON string");
                gatePackageItems = [];
            }
        }

        // ✅ Convert boolean flags
        let cateringRequired = req.body.cateringRequired;
        let gatePackageRequired = req.body.gatePackageRequired;

        if (typeof cateringRequired === "string") cateringRequired = cateringRequired === "true";
        if (typeof gatePackageRequired === "string") gatePackageRequired = gatePackageRequired === "true";

        // ✅ Validation
        if (Array.isArray(cateringItems) && cateringItems.length > 0 && !cateringRequired) {
            return res.status(400).json({
                message: "तुम्ही cateringItems दिले आहेत, पण cateringRequired false आहे.",
            });
        }

        if (Array.isArray(gatePackageItems) && gatePackageItems.length > 0 && !gatePackageRequired) {
            return res.status(400).json({
                message: "तुम्ही gatePackageItems दिले आहेत, पण gatePackageRequired false आहे.",
            });
        }

        // ✅ Extract fields
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
            totalRs,
            discount = 0,
            finalPrice,
            advancePayment,
            balance,
            chequeRequired,
            notes,
            inquiryOnly
        } = req.body;

        // ✅ Handle inquiryOnly
        if (inquiryOnly) {
            if (!name || !phone1 || !address) {
                return res.status(400).json({ message: "काही आवश्यक फील्ड्स गायब आहेत." });
            }

            booking.name = name;
            booking.phone1 = phone1;
            booking.phone2 = phone2;
            booking.address = address;
            booking.inquiryOnly = true;
            booking.notes = notes;

            await booking.save();
            return res.status(200).json({ message: "चौकशी अपडेट झाली", booking });
        }

        // ✅ Validate essential fields
        if (
            !name || !phone1 || !address || !location || !eventType ||
            !startDate || !endDate || !pkg ||
            totalRs === undefined || finalPrice === undefined ||
            advancePayment === undefined || balance === undefined ||
            chequeRequired === undefined || chequeRequired === null
        ) {
            return res.status(400).json({ message: "काही आवश्यक फील्ड्स गायब आहेत." });
        }

        // ✅ Check dates
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start) || isNaN(end)) {
            return res.status(400).json({ message: "तारीखांचा स्वरूप चुकीचा आहे." });
        }

        // ✅ Conflict check (exclude current booking)
        const conflict = await BookingForm.findOne({
            _id: { $ne: bookingId },
            startDate: { $lte: end },
            endDate: { $gte: start },
        });

        if (conflict) {
            return res.status(400).json({ message: "ही तारीख आधीपासून बुक आहे." });
        }

        // ✅ Update fields
        booking.name = name;
        booking.phone1 = phone1;
        booking.phone2 = phone2;
        booking.address = address;
        booking.location = location;
        booking.eventType = eventType;
        booking.startDate = start;
        booking.endDate = end;
        booking.package = pkg;
        booking.totalRs = totalRs;
        booking.discount = discount;
        booking.finalPrice = finalPrice;
        booking.advancePayment = advancePayment;
        booking.balance = balance;
        booking.chequeRequired = chequeRequired ? "होय" : "नाही";
        booking.notes = notes;
        booking.inquiryOnly = false;
        booking.cateringRequired = cateringRequired;
        booking.gatePackageRequired = gatePackageRequired;

        if (cateringRequired && Array.isArray(cateringItems)) {
            booking.cateringItems = cateringItems;
        } else {
            booking.cateringItems = [];
        }

        if (gatePackageRequired && Array.isArray(gatePackageItems)) {
            booking.gatePackageItems = gatePackageItems;
        } else {
            booking.gatePackageItems = [];
        }

        await booking.save();

        return res.status(200).json({ message: "Booking अपडेट झाली", booking });

    } catch (error) {
        console.error("Error in updateBooking:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
