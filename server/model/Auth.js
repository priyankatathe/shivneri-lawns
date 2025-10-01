
const mongoose = require("mongoose")

const authSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        mobile: { type: Number, required: true, unique: true },
        password: { type: String, required: true },
        title: { type: String, required: true },
        EventImage: { type: String, default: null },
        LogoImage: { type: String, default: null },
        role: { type: String, default: "admin" },

        // 🔹 Forgot/Reset Password fields
        resetPasswordToken: { type: String },
        resetPasswordExpire: { type: Date },
    },
    { timestamps: true }
)

module.exports = mongoose.model("admin", authSchema);

