

import React, { useState } from "react";
import { useGetAdminQuery } from "../redux/api/authApi";
import { useGetBookingsQuery } from "../redux/api/formApi";
import defaultBg from "../assets/2.jpg";

const Home = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { data } = useGetAdminQuery();
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

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) calendarDays.push(null);
    for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

    const handlePrev = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNext = () => setCurrentDate(new Date(year, month + 1, 1));

    const getBookingStatus = (day) => {
        const currentDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const current = new Date(currentDateStr);

        const dayBookings = bookingsData.filter((b) => {
            const start = new Date(b.startDate);
            const end = new Date(b.endDate);
            return current >= start && current <= end;
        });

        if (dayBookings.length === 0) return { color: "white", names: [] };

        const names = dayBookings.map((b) => b.name);
        const locations = dayBookings.map((b) => b.location || b.eventType);

        let color = "white";
        if (locations.includes("Lawn and Banquet") || locations.includes("Both")) color = "#FFD93D";
        else if (locations.includes("Banquet")) color = "#FF6B6B";
        else if (locations.includes("Lawn")) color = "#FFA559";

        return { color, names };
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative p-4 md:p-8">
            {/* Background */}
            <img
                src={data?.EventImage || bgImage}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-0 brightness-[0.6]"
            />
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* Main Content */}
            <div className="relative z-20 w-full max-w-6xl flex flex-col md:flex-row items-start gap-10 md:gap-20">

                {/* Left Text */}
                <div className="flex-1 text-center md:text-left text-white space-y-4">
                    <h1 className="text-5xl md:text-6xl font-bold">
                        {data?.title ? data.title : "श्वासाच्या नात्याला सुरुवात"}
                    </h1>
                    <p className="text-lg md:text-xl font-medium italic">
                        {data?.subHeading || "तुमच्या खास क्षणांना "}
                        <span className="text-pink-400 font-bold">अविस्मरणीय</span>
                        {data?.subHeading2 || " बनवा ✨"}
                    </p>
                </div>

                {/* Calendar Card */}
                <div className="w-full md:w-[400px] bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 overflow-hidden">

                    {/* Header */}
                    <div className="p-4 text-center border-b border-gray-300 bg-gray-100 font-semibold">
                        <h2 className="text-lg">{data?.calendarHeading || "इव्हेंट बुकिंग कॅलेंडर"}</h2>
                        <div className="flex justify-center mt-2 gap-2 text-xs">
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#FFA559]"></span> लॉन</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#FF6B6B]"></span> बँक्वेट</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#FFD93D]"></span> लॉन + बँक्वेट</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full border border-gray-400 bg-white"></span> उपलब्ध</span>
                        </div>
                    </div>

                    {/* Month Navigation */}
                    <div className="flex justify-between items-center px-4 py-2 bg-gray-50 font-medium">
                        <button
                            onClick={handlePrev}
                            className="px-3 py-1 rounded-md bg-gray-300 text-gray-700 text-xs hover:bg-gray-400"
                        >
                            मागील
                        </button>
                        <h3 className="text-base font-semibold">{months[month]} {year}</h3>
                        <button
                            onClick={handleNext}
                            className="px-3 py-1 rounded-md bg-gray-300 text-gray-700 text-xs hover:bg-gray-400"
                        >
                            पुढील
                        </button>
                    </div>

                    {/* Weekdays */}
                    <div className="grid grid-cols-7 text-center font-semibold bg-gray-100 border-b border-gray-300 text-xs">
                        {["रवि", "सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"].map((day, i) => (
                            <div key={i} className="p-2">{day}</div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="p-3 overflow-y-auto max-h-[300px]">
                        <div className="grid grid-cols-7 gap-2">
                            {calendarDays.map((day, i) => {
                                if (!day) return <div key={i} />;
                                const status = getBookingStatus(day);
                                return (
                                    <div
                                        key={i}
                                        className="h-12 flex flex-col items-center justify-center rounded-lg text-[9px] font-semibold border border-gray-300 bg-white"
                                        style={{ backgroundColor: status.color }}
                                    >
                                        <span className="text-xs font-bold">{day}</span>
                                        {status.names.length > 0 && (
                                            <div className="text-[8px] text-center leading-tight mt-0.5 px-0.5">
                                                {status.names.map((n, idx) => <div key={idx}>{n}</div>)}
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


