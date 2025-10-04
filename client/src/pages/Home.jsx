import React, { useState } from "react";
import { useGetAdminQuery } from "../redux/api/authApi";
import { useGetBookingsQuery } from "../redux/api/formApi";
import defaultBg from "../assets/2.jpg";

const Home = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { data, isLoading, isError } = useGetAdminQuery();
    const { data: bookingsData = [] } = useGetBookingsQuery();

    const bgImage = data?.backgroundImg || defaultBg;

    const months = [
        "जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून",
        "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर",
    ];

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    // Calendar grid तयार करा
    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) calendarDays.push(null);
    for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

    const handlePrev = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNext = () => setCurrentDate(new Date(year, month + 1, 1));

    // ✅ Multiple bookings handle करणारा function
    const getBookingStatus = (day) => {
        const currentDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
            day
        ).padStart(2, "0")}`;
        const current = new Date(currentDateStr);

        const dayBookings = bookingsData.filter((b) => {
            const start = new Date(b.startDate);
            const end = new Date(b.endDate);
            return current >= start && current <= end;
        });

        if (dayBookings.length === 0) return { color: "white", names: [], types: [] };

        const names = dayBookings.map((b) => b.name);
        const locations = dayBookings.map((b) => b.location || b.eventType);

        let color = "white";
        if (locations.includes("Lawn and Banquet") || locations.includes("Both")) {
            color = "yellow";
        } else if (locations.includes("Banquet")) {
            color = "red";
        } else if (locations.includes("Lawn")) {
            color = "orange";
        }

        return { color, names, types: locations };
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative p-4 md:p-8 overflow-hidden">
            {/* Background */}
            <img
                src={data?.EventImage || bgImage}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/80 z-10"></div>

            {/* Main Content */}
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-start gap-8 relative z-20 overflow-hidden">
                {/* Left Section */}
                <div className="flex-1 text-center md:text-left text-white space-y-6 relative">
                    <p className="drop-shadow-lg flex items-start md:items-center">
                        <span className="text-[7rem] md:text-[10rem] font-serif text-white leading-none flex-shrink-0">
                            {data?.title ? data.title.charAt(0) : "वि"}
                        </span>
                        <span className="text-2xl md:text-4xl font-serif text-white ml-4 mt-6 md:mt-10">
                            {data?.title ? data.title.slice(1) : "श्वासाच्या नात्याला सुरुवात"}
                        </span>
                    </p>
                    <p className="text-base md:text-lg text-white font-extrabold italic">
                        {data?.subHeading || "तुमच्या खास क्षणांना "}
                        <span className="text-pink-400">अविस्मरणीय</span>
                        {data?.subHeading2 || " बनवा ✨"}
                    </p>
                </div>

                {/* Calendar */}
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl w-full md:w-[450px] overflow-hidden border border-gray-200 max-h-[550px]">
                    {/* Header */}
                    <div className="flex flex-col items-center border-b p-4 bg-black text-white">
                        <h2 className="text-xl font-bold tracking-wide drop-shadow">
                            📅 {data?.calendarHeading || "इव्हेंट बुकिंग कॅलेंडर"}
                        </h2>
                        <div className="flex flex-wrap justify-center mt-2 gap-2 text-xs">
                            <span className="flex items-center gap-1">
                                <span className="w-4 h-4 rounded-full bg-orange-500"></span> लॉन
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-4 h-4 rounded-full bg-red-500"></span> बँक्वेट
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-4 h-4 rounded-full bg-yellow-400"></span> लॉन + बँक्वेट
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-4 h-4 rounded-full border bg-white"></span> उपलब्ध
                            </span>
                        </div>
                    </div>

                    {/* Month Navigation */}
                    <div className="flex justify-between items-center px-4 py-3 bg-white shadow-inner">
                        <button
                            onClick={handlePrev}
                            className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition text-white text-xs rounded-md shadow-md"
                        >
                            मागील
                        </button>
                        <h3 className="font-semibold text-base text-gray-800">
                            {months[month]} {year}
                        </h3>
                        <button
                            onClick={handleNext}
                            className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 transition text-white text-xs rounded-md shadow-md"
                        >
                            पुढील
                        </button>
                    </div>

                    {/* Weekdays */}
                    <div className="grid grid-cols-7 text-center font-semibold bg-gray-100 text-gray-700 border-y text-xs">
                        {["रवि", "सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"].map((day, i) => (
                            <div key={i} className="p-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="p-3">
                        <div className="grid grid-cols-7 gap-1.5">
                            {calendarDays.map((day, i) => {
                                if (!day) return <div key={i} />;

                                const status = getBookingStatus(day);

                                return (
                                    <div
                                        key={i}
                                        className="h-14 flex flex-col items-center justify-center rounded-lg text-[9px] font-semibold border shadow-sm text-gray-900 transition duration-200"
                                        style={{ backgroundColor: status.color }}
                                    >
                                        <span className="text-xs font-bold">{day}</span>
                                        {status.names.length > 0 && (
                                            <div className="text-[8px] text-center leading-tight mt-0.5 px-0.5">
                                                {status.names.map((n, idx) => (
                                                    <div key={idx}>{n}</div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
