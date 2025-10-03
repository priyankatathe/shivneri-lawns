// import React, { useState } from "react";
// import backgroundImg from "../assets/3.jpg";
// import { useForgotPasswordMutation } from "../redux/api/authApi"; // RTK Query mutation

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");
//     const [error, setError] = useState("");

//     // RTK Query mutation hook
//     const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage("");
//         setError("");

//         if (!email) {
//             setError("ईमेल आवश्यक आहे");
//             return;
//         }

//         try {
//             const res = await forgotPassword({ email }).unwrap();
//             setMessage(`तुमच्या ईमेलवर लिंक पाठवली गेली!`);
//             setEmail("");
//         } catch (err) {
//             setError(err?.data?.message || "काहीतरी चूक झाली");
//         }
//     };

//     return (
//         <div className="relative min-h-screen flex items-center justify-center">
//             <img
//                 src={backgroundImg}
//                 alt="Background"
//                 className="absolute inset-0 w-full h-full object-cover filter blur-sm"
//             />

//             <div className="relative bg-white bg-opacity-90 shadow-lg p-8 rounded-xl w-full max-w-md">
//                 <h2 className="text-2xl font-bold mb-6 text-center">पासवर्ड विसरलात?</h2>

//                 {message && (
//                     <p className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</p>
//                 )}
//                 {error && (
//                     <p className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</p>
//                 )}

//                 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                     <div>
//                         <label className="block font-medium mb-2">ईमेल</label>
//                         <input
//                             type="email"
//                             placeholder="आपला ईमेल टाका"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
//                     >
//                         {isLoading ? "लिंक पाठवत आहे..." : "रीसेट लिंक पाठवा"}
//                     </button>
//                 </form>

//                 <p className="text-center text-gray-500 mt-4">
//                     Back to <a href="/login" className="text-blue-500">लॉगिन</a>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;



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
