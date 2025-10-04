
// import React, { useState } from "react";

// import backgroundImg from "../assets/3.jpg";
// import { useForgotPasswordMutation } from "../redux/api/authApi";

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");
//     const [step, setStep] = useState(1);
//     const [forgotPassword] = useForgotPasswordMutation();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!email) return alert("Email required");

//         try {
//             const res = await forgotPassword({ email }).unwrap();
//             setMessage(res.message);
//             setStep(2);
//         } catch (err) {
//             alert(err.data?.message || "Error sending OTP");
//         }
//     };

//     return (
//         <div
//             className="min-h-screen flex items-center justify-center bg-cover bg-center"
//             style={{ backgroundImage: `url(${backgroundImg})` }}
//         >
//             <form className="bg-white bg-opacity-90 p-6 rounded shadow-md w-96">
//                 {step === 1 && (
//                     <>
//                         <h2 className="text-lg font-bold mb-4">Forgot Password</h2>
//                         <input
//                             type="email"
//                             placeholder="Enter your email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="border p-2 w-full mb-4 rounded"
//                         />
//                         <button
//                             type="submit"
//                             className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
//                             onClick={handleSubmit}
//                         >
//                             Send OTP
//                         </button>
//                     </>
//                 )}
//                 {step === 2 && (
//                     <>
//                         <h2 className="text-lg font-bold mb-4">OTP Sent ✅</h2>
//                         <p className="mb-2 text-green-600">{message}</p>
//                         <p>Check your email and proceed to reset password.</p>
//                     </>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default ForgotPassword;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/3.jpg";
import { useForgotPasswordMutation } from "../redux/api/authApi";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [step, setStep] = useState(1);
    const [countdown, setCountdown] = useState(5); // ५ सेकंदाचा countdown
    const [forgotPassword] = useForgotPasswordMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return alert("ईमेल आवश्यक आहे");

        try {
            const res = await forgotPassword({ email }).unwrap();
            setMessage(res.message);
            setStep(2);
        } catch (err) {
            alert(err.data?.message || "OTP पाठवण्यात त्रुटी");
        }
    };

    // OTP पाठवल्यानंतर ५ सेकंदात Reset Password पेजवर navigate
    useEffect(() => {
        if (step === 2) {
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        navigate("/reset", { state: { email } });
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [step, navigate, email]);

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <form className="bg-white bg-opacity-90 p-6 rounded shadow-md w-96">
                {step === 1 && (
                    <>
                        <h2 className="text-lg font-bold mb-4">पासवर्ड विसरलात?</h2>
                        <input
                            type="email"
                            placeholder="आपला ईमेल टाका"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 w-full mb-4 rounded"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
                            onClick={handleSubmit}
                        >
                            OTP पाठवा
                        </button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <h2 className="text-lg font-bold mb-4">OTP पाठवले ✅</h2>
                        <p className="mb-2 text-green-600">{message}</p>
                        <p>आपला ईमेल तपासा. {countdown} सेकंदात Reset Password पेजवर जाईल...</p>
                    </>
                )}
            </form>
        </div>
    );
};

export default ForgotPassword;

