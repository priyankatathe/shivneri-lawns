import React from "react";
import backgroundImg from "../assets/photo.jpg"; // तुमचा image path

const Login = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {/* Background Image with blur */}
            <img
                src={backgroundImg}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover filter blur-xs"
            />


            {/* Login Form */}
            <div className="relative bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6"> लॉगिन</h2>
                <form className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-1 font-semibold">ईमेल</label>
                        <input
                            type="email"
                            placeholder="आपला ईमेल टाका"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">पासवर्ड</label>
                        <input
                            type="password"
                            placeholder="पासवर्ड"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        लॉगिन
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    पासवर्ड विसरलात?{" "}
                    <a href="#" className="text-orange-500">
                        रिसेट करा
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
