import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAdminQuery, useLogoutAdminMutation } from "../redux/api/authApi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data, isLoading, isError } = useGetAdminQuery();
    const [logout] = useLogoutAdminMutation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="bg-white/90 backdrop-blur-lg shadow-md w-full fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo + Name */}
                    <div className="flex items-center space-x-3">
                        <img
                            src={data?.LogoImage}
                            alt="logo"
                            className="w-10 h-10 rounded-md object-cover border border-gray-300"
                        />
                        {isLoading ? (
                            <span className="text-gray-500 text-sm">Loading...</span>
                        ) : isError ? (
                            <span className="text-red-500 text-sm">Error</span>
                        ) : (
                            <span className="text-lg font-semibold text-gray-800">
                                {data?.name || "Admin"}
                            </span>
                        )}
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-600 transition font-medium"
                        >
                            मुख्य पृष्ठ
                        </Link>
                        <Link
                            to="/Bookinglist"
                            className="text-gray-700 hover:text-blue-600 transition font-medium"
                        >
                            तक्त्यांची यादी
                        </Link>
                        <Link
                            to="/form"
                            className="text-gray-700 hover:text-blue-600 transition font-medium"
                        >
                            फॉर्म
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:text-blue-600 transition font-medium"
                        >
                            लॉगआउट
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-800 text-2xl focus:outline-none transition"
                        >
                            {isOpen ? "✖" : "☰"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-white shadow-lg border-t transition-all duration-300 overflow-hidden ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-6 py-3 space-y-3">
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="block text-gray-700 hover:text-blue-600 transition font-medium"
                    >
                        मुख्य पृष्ठ
                    </Link>
                    <Link
                        to="/Bookinglist"
                        onClick={() => setIsOpen(false)}
                        className="block text-gray-700 hover:text-blue-600 transition font-medium"
                    >
                        तक्त्यांची यादी
                    </Link>
                    <Link
                        to="/form"
                        onClick={() => setIsOpen(false)}
                        className="block text-gray-700 hover:text-blue-600 transition font-medium"
                    >
                        फॉर्म
                    </Link>
                    <button
                        onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                        }}
                        className="block text-red-600 hover:text-blue-600 w-full text-left font-medium transition"
                    >
                        लॉगआउट
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
