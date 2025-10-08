const asyncHandler = require("express-async-handler");
const BookingForm = require("../model/BookingForm");
const mongoose = require("mongoose");



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
            bankName,
            chequeNumber,
            notes,
            inquiryOnly
        } = req.body;
        if (chequeRequired === "yes") {
            req.body.chequeRequired = "होय";
        } else if (chequeRequired === "no") {
            req.body.chequeRequired = "नाही";
        }
        if (inquiryOnly) {
            if (!name || !phone1 || !address) {
                return res.status(400).json({ message: "काही आवश्यक फील्ड्स गायब आहेत." });
            }

            // फक्त आवश्यक फील्ड्स ठेवा
            const inquiryData = {
                name,
                phone1,
                phone2: phone2 || "",
                address,
                notes,
                inquiryOnly: true,
                adminId: req.user,
            };

            const booking = await BookingForm.create(inquiryData);

            return res.status(201).json({ message: "चौकशी यशस्वी झाली", booking });
        }
        else {
            // पूर्ण बुकिंगसाठी validation
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

            // dateOverlap
            const conflict = await BookingForm.findOne({
                adminId: req.user,
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

            //   create a booking
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
                bankName: chequeRequired === "होय" ? bankName : "",
                chequeNumber: chequeRequired === "होय" ? chequeNumber : "",
                notes,
                inquiryOnly: false,
                adminId: req.user


            });

            return res.status(201).json({ message: "Booking created successfully", booking });
        }

    } catch (error) {
        console.error("Error in createBooking:", error);
        return res.status(500).json({ message: "Server error" });
    }
})

exports.updateBooking = asyncHandler(async (req, res) => {
    try {
        const bookingId = req.params.id;


        if (req.body.chequeRequired === "yes") {
            req.body.chequeRequired = "होय";
        } else if (req.body.chequeRequired === "no") {
            req.body.chequeRequired = "नाही";
        }

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
            bankName,
            chequeNumber,
            notes,
            inquiryOnly
        } = req.body;
        console.log("🔍 Update Request for ID:", bookingId);
        const booking = await BookingForm.findById(bookingId);

        if (!booking) {
            console.log("⚠️ बुकिंग सापडले नाही या ID साठी:", bookingId);
            return res.status(404).json({ message: "बुकिंग सापडले नाही." });
        }

        if (inquiryOnly) {
            //    inquery keys
            if (!name || !phone1 || !address) {
                return res.status(400).json({ message: "काही आवश्यक फील्ड्स गायब आहेत." });
            }

            booking.name = name;
            booking.phone1 = phone1;
            booking.phone2 = phone2;
            booking.address = address;
            booking.notes = notes;
            booking.inquiryOnly = true;

        } else {
            // all booking keys
            if (!name || !phone1 || !address || !location || !eventType
                || !startDate || !endDate || !pkg || totalRs == null
                || finalPrice == null || advancePayment == null || balance == null
                || chequeRequired == null) {
                return res.status(400).json({ message: "काही आवश्यक फील्ड्स गायब आहेत." });
            }

            const start = new Date(startDate);
            const end = new Date(endDate);

            if (isNaN(start) || isNaN(end)) {
                return res.status(400).json({ message: "तारीखांचा स्वरूप चुकीचा आहे." });
            }

            // दुसर्‍या बुकिंगशी ओव्हरलॅप होत आहे का तपासा
            const conflict = await BookingForm.findOne({
                adminId: req.user,
                _id: { $ne: bookingId },
                $or: [
                    { startDate: { $lte: end }, endDate: { $gte: start } }
                ]
            });


            if (conflict) {
                return res.status(400).json({ message: "ही तारीख आधीपासून दुसर्‍या बुकिंगसाठी आरक्षित आहे." });
            }

            // सर्व फील्ड्स अपडेट करा
            booking.name = name;
            booking.phone1 = phone1;
            booking.phone2 = phone2;
            booking.address = address;
            booking.location = location;
            booking.eventType = eventType;
            booking.startDate = start;
            booking.endDate = end;
            booking.package = pkg;
            booking.cateringRequired = cateringRequired;
            booking.cateringItems = cateringRequired ? cateringItems : [];
            booking.gatePackageRequired = gatePackageRequired;
            booking.gatePackageItems = gatePackageRequired ? gatePackageItems : [];
            booking.totalRs = totalRs;
            booking.discount = discount;
            booking.finalPrice = finalPrice;
            booking.advancePayment = advancePayment;
            booking.balance = balance;
            booking.chequeRequired = chequeRequired;
            booking.bankName = chequeRequired === "होय" ? bankName : "";
            booking.chequeNumber = chequeRequired === "होय" ? chequeNumber : "";

            booking.notes = notes;
            booking.inquiryOnly = false;
        }

        await booking.save();

        return res.status(200).json({ message: "बुकिंग यशस्वीरित्या अपडेट झाले", booking });

    } catch (error) {
        console.error("Error in updateBooking:", error);
        return res.status(500).json({ message: "सर्व्हर एरर" });
    }
});



exports.getBookings = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user._id

        // adminId ने केलेल्या सर्व bookings + inquiries fetch करा
        const bookings = await BookingForm.find({ adminId })

        // प्रत्येक booking/inquiry ला status assign करा
        const bookingsWithStatus = bookings.map(b => ({
            ...b._doc,
            status: b.status || (b.inquiryOnly ? "Inquiry" : "Booking")
        }));

        return res.status(200).json(bookingsWithStatus);
    } catch (error) {
        console.error("Error in getBookings:", error);
        return res.status(500).json({ message: "Server error" });
    }
});



exports.deleteBooking = asyncHandler(async (req, res) => {
    try {
        const bookingId = req.params.id

        const booking = await BookingForm.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "बुकिंग सापडले नाही." })
        }

        await booking.deleteOne();

        return res.status(200).json({ message: "बुकिंग यशस्वीरित्या हटवले गेले." })

    } catch (error) {
        console.error("Error in deleteBooking:", error)
        return res.status(500).json({ message: "सर्व्हर एरर" })
    }
});
