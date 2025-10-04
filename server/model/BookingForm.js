const mongoose = require('mongoose');

const CateringItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
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
    location: { type: String, required: function () { return !this.inquiryOnly; } },
    eventType: { type: String, required: function () { return !this.inquiryOnly; } },
    startDate: { type: Date, required: function () { return !this.inquiryOnly; } },
    endDate: { type: Date, required: function () { return !this.inquiryOnly; } },
    package: { type: String, required: function () { return !this.inquiryOnly; } },

    // Catering
    cateringRequired: { type: Boolean, required: function () { return !this.inquiryOnly; } },
    cateringItems: [CateringItemSchema],

    // Gate Package
    gatePackageRequired: { type: Boolean, required: function () { return !this.inquiryOnly; } },
    gatePackageItems: [GatePackageItemSchema],

    // Calculation / Pricing
    totalRs: { type: Number, required: function () { return !this.inquiryOnly; } },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number, required: function () { return !this.inquiryOnly; } },
    advancePayment: { type: Number, required: function () { return !this.inquiryOnly; } },
    balance: { type: Number, required: function () { return !this.inquiryOnly; } },

    // Cheque requirement
    chequeRequired: {
        type: String,
        enum: ["होय", "नाही"],
        required: function () { return !this.inquiryOnly; }
    },

    notes: { type: String },

    // Inquiry Flag
    inquiryOnly: { type: Boolean, default: false },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EventBooking', BookingSchema);
