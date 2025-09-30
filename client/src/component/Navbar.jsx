import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAdminQuery } from "../redux/api/authApi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data, isLoading, isError } = useGetAdminQuery()


    return (
        <nav className="shadow-md w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo + Name */}
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://www.nicepng.com/png/full/376-3764411_events-logo-png-event-management.png"
                            alt="logo"
                            className="w-10 h-10 rounded-full"
                        />

                        {/* API से Admin Name */}
                        {isLoading ? (
                            <span className="text-gray-500">Loading...</span>
                        ) : isError ? (
                            <span className="text-red-500">Error</span>
                        ) : (
                            <span className="text-xl font-bold text-gray-700">
                                {data?.name || "Admin"}
                            </span>
                        )}
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-600 hover:text-blue-600">
                            मुख्य पृष्ठ
                        </Link>
                        <Link to="/Bookinglist" className="text-gray-600 hover:text-blue-600">
                            तक्त्यांची यादी
                        </Link>
                        <Link to="/form" className="text-gray-600 hover:text-blue-600">
                            फॉर्म
                        </Link>
                        <a href="#" className="text-red-600 hover:text-blue-600">
                            लॉगआउट
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 focus:outline-none"
                        >
                            {isOpen ? "✖" : "☰"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Links */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-600 hover:text-blue-600"
                        >
                            मुख्य पृष्ठ
                        </Link>
                        <Link
                            to="/Bookinglist"
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-600 hover:text-blue-600"
                        >
                            तक्त्यांची यादी
                        </Link>
                        <Link
                            to="/form"
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-600 hover:text-blue-600"
                        >
                            फॉर्म
                        </Link>
                        <a
                            href="#"
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-600 hover:text-blue-600"
                        >
                            लॉगआउट
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
