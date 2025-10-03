const mongoose = require('mongoose');

const CateringItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // आपण फक्त name ठेवू शकतो; quantity नाही कारण catering items सामान्यतः quantity नसेल
});

const GatePackageItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const BookingSchema = new mongoose.Schema({
    // User Info
    name: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: { type: String },
    address: { type: String, required: true },

    // Event Details
    location: { type: String, required: true },
    eventType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    package: { type: String, required: true },

    // Catering
    cateringRequired: { type: Boolean, required: true },
    cateringItems: [CateringItemSchema],  // optional array

    // Gate Package
    gatePackageRequired: { type: Boolean, required: true },
    gatePackageItems: [GatePackageItemSchema],  // optional array

    // Calculation / Pricing
    totalRs: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number, required: true },
    advancePayment: { type: Number, required: true },
    balance: { type: Number, required: true },

    // Cheque requirement
    chequeRequired: { type: String, enum: ["होय", "नाही"], required: true },

    notes: { type: String },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EventBooking', BookingSchema);
