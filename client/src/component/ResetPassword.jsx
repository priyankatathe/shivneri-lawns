import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/3.jpg";
import { useResetPasswordWithOTPMutation } from "../redux/api/authApi";


const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [resetPasswordWithOTP] = useResetPasswordWithOTPMutation();
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        if (!email || !otp || !newPassword) return alert("All fields required");

        try {
            const res = await resetPasswordWithOTP({ email, otp, newPassword }).unwrap();
            alert(res.message);
            navigate("/login");
        } catch (err) {
            alert(err.data?.message || "OTP invalid or expired");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <form className="bg-white bg-opacity-90 p-6 rounded shadow-md w-96" onSubmit={handleReset}>
                <h2 className="text-lg font-bold mb-4">Reset Password</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                />
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border p-2 w-full mb-4 rounded"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600 transition"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
