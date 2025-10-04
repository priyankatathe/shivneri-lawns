
import React, { useState } from "react";

import backgroundImg from "../assets/3.jpg";
import { useForgotPasswordMutation } from "../redux/api/authApi";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [step, setStep] = useState(1);
    const [forgotPassword] = useForgotPasswordMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return alert("Email required");

        try {
            const res = await forgotPassword({ email }).unwrap();
            setMessage(res.message);
            setStep(2);
        } catch (err) {
            alert(err.data?.message || "Error sending OTP");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <form className="bg-white bg-opacity-90 p-6 rounded shadow-md w-96">
                {step === 1 && (
                    <>
                        <h2 className="text-lg font-bold mb-4">Forgot Password</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 w-full mb-4 rounded"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
                            onClick={handleSubmit}
                        >
                            Send OTP
                        </button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <h2 className="text-lg font-bold mb-4">OTP Sent ✅</h2>
                        <p className="mb-2 text-green-600">{message}</p>
                        <p>Check your email and proceed to reset password.</p>
                    </>
                )}
            </form>
        </div>
    );
};

export default ForgotPassword;
