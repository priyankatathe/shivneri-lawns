import React, { useState } from "react";
import oc from "./../assets/2.jpg"

const Home = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const months = [
        "जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून",
        "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"
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

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center relative p-6"
            style={{
                backgroundImage: `url(${oc})`, // 👈 यहाँ आपकी oc image background में लग गई
            }}
        >
            {/* Gradient Overlay (Left clear, Right dark) */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/80"></div>

            {/* Content Wrapper */}
            <div className=" w-full max-w-7xl flex flex-col md:flex-row items-start gap-10">
                {/* Left Content */}
                {/* Left Content */}
                <div className="flex-1 text-center md:text-left text-white space-y-6">
                    {/* Big Marathi Heading */}
                    <p className="drop-shadow-lg">
                        <span className="text-6xl md:text-7xl font-serif text-amber-300">वि</span>
                        <span className="text-2xl md:text-3xl font-serif text-gray-200 ml-2">
                            श्वासाच्या नात्याला सुरुवात
                        </span>
                    </p>

                    {/* Decorative Divider */}
                    {/* <div className="flex justify-center md:justify-start">
                        <img
                            src={oc}
                            alt="divider"
                            className="h-100 opacity-70 rounded-2xl"
                        />
                    </div> */}

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-white font-extrabold italic">
                        तुमच्या खास क्षणांना <span className="text-pink-400">अविस्मरणीय</span> बनवा ✨
                    </p>


                </div>




                {/* Calendar Card */}
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl w-full md:w-[550px] overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="flex flex-col items-center border-b p-6 bg-black text-white">
                        <h2 className="text-2xl font-bold tracking-wide drop-shadow">
                            📅 इव्हेंट बुकिंग कॅलेंडर
                        </h2>
                        <div className="flex flex-wrap justify-center mt-3 gap-4 text-sm">
                            <span className="flex items-center gap-1">
                                <span className="w-5 h-5 rounded-full bg-orange-500"></span> लॉन
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-5 h-5 rounded-full bg-red-500"></span> बँक्वेट
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-5 h-5 rounded-full bg-yellow-400"></span> लॉन + बँक्वेट
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-5 h-5 rounded-full border bg-white"></span> उपलब्ध
                            </span>
                        </div>
                    </div>

                    {/* Month Navigation */}
                    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-inner">
                        <button
                            onClick={handlePrev}
                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition text-white text-sm rounded-lg shadow-md"
                        >
                            मागील
                        </button>
                        <h3 className="font-semibold text-lg text-gray-800">
                            {months[month]} {year}
                        </h3>
                        <button
                            onClick={handleNext}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 transition text-white text-sm rounded-lg shadow-md"
                        >
                            पुढील
                        </button>
                    </div>

                    {/* Days Header */}
                    <div className="grid grid-cols-7 text-center font-semibold bg-gray-100 text-gray-700 border-y">
                        {["रवि", "सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"].map((day, i) => (
                            <div key={i} className="p-3">{day}</div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 p-6">
                        {calendarDays.map((day, i) => (
                            <div
                                key={i}
                                className={`h-10 flex items-center justify-center rounded-xl text-sm font-medium border transition transform duration-200 ${day
                                    ? "bg-white hover:bg-yellow-100 text-gray-800 shadow hover:scale-105"
                                    : "bg-transparent"
                                    }`}
                            >
                                {day && <span>{day}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
