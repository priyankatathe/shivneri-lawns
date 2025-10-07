
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteBookingMutation, useGetBookingsQuery } from "../redux/api/formApi";
import { toast } from "react-toastify";

const BookingList = () => {
    const [deleteBooking] = useDeleteBookingMutation();

    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [search, setSearch] = useState("");

    const { data = [], isLoading, isError } = useGetBookingsQuery();
    const handleDelete = async (id) => {
        try {
            await deleteBooking(id).unwrap();
            toast.success("बुकिंग यशस्वीरित्या हटवले गेले ✅");
        } catch (error) {
            console.error("❌ Delete failed:", error);
            toast.error("हटवताना त्रुटी आली ❌");
        }
    };

    if (isLoading) {
        return <div className="text-center text-xl font-semibold p-10">लोड होत आहे...</div>;
    }

    if (isError) {
        return <div className="text-center text-xl text-red-500 p-10">डेटा मिळाला नाही ❌</div>;
    }

    const formattedData = data.map((item) => ({
        name: item.name || "N/A",
        event: item.eventType || "—",
        date:
            item.startDate && item.endDate
                ? `${new Date(item.startDate).toLocaleDateString()} - ${new Date(item.endDate).toLocaleDateString()}`
                : "N/A",
        venue: item.location || "N/A",
        phone: [item.phone1, item.phone2].filter(Boolean),
        status: item.status || "Enquiry", // जर status नसली तरी "Enquiry" दाखवेल
        total: item.totalRs || "-",
        balance: item.balance || "-",
    }));

    // 🔍 Search filter (सर्चने Enquiry पण शोधता येईल)
    const filteredData = formattedData.filter((row) => {
        const searchLower = search.toLowerCase();
        return (
            row.name.toLowerCase().includes(searchLower) ||
            row.event.toLowerCase().includes(searchLower) ||
            row.status.toLowerCase().includes(searchLower) ||
            row.phone.some((num) => num.includes(searchLower))
        );
    });

    // 📄 Pagination logic
    const indexOfLastRow = currentPage * usersPerPage;
    const indexOfFirstRow = indexOfLastRow - usersPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredData.length / usersPerPage);

    return (
        <div className="p-6">
            <h2 className="text-center text-2xl font-bold mb-4">बुकिंग / एनक्वायरी लिस्ट</h2>

            {/* 🔍 Search Bar */}
            <div className="bg-white p-4 rounded-md mb-4">
                <div className="flex items-center gap-2 border rounded p-3">
                    <FaSearch className="text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="नाव, फोन, इव्हेंट, किंवा स्टेटस शोधा"
                        className="w-full outline-none"
                    />
                </div>
            </div>

            {/* 🧾 Table */}
            <div className="overflow-x-auto p-3 text-black">
                <table className="table w-full border">
                    <thead>
                        <tr className="bg-orange-500 text-white text-center">
                            <th>ग्राहकाचे नाव</th>
                            <th>इव्हेंट प्रकार</th>
                            <th>तारीख</th>
                            <th>ठिकाण</th>
                            <th>फोन नंबर</th>
                            <th>स्थिती</th>
                            <th>एकूण रक्कम</th>
                            <th>शिल्लक</th>
                            <th>कृती</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.length > 0 ? (
                            currentRows.map((row, index) => (
                                <tr
                                    key={index}
                                    className={`text-center ${row.status === "Enquiry"
                                        ? "bg-yellow-50"
                                        : "bg-white"
                                        }`}
                                >
                                    <td>{row.name}</td>
                                    <td>{row.event}</td>
                                    <td>{row.date}</td>
                                    <td>{row.venue}</td>
                                    <td>
                                        {row.phone.map((num, i) => (
                                            <div key={i}>{num}</div>
                                        ))}
                                    </td>

                                    {/* Enquiry असल्यास वेगळं रंग दाखवू */}
                                    <td
                                        className={`font-semibold ${row.status === "Enquiry"
                                            ? "text-yellow-600"
                                            : "text-green-600"
                                            }`}
                                    >
                                        {row.status}
                                    </td>

                                    <td>{row.total}</td>
                                    <td>{row.balance}</td>
                                    <td className="flex justify-center gap-2">
                                        <button
                                            className="btn btn-sm bg-orange-500 text-white"
                                            onClick={() => navigate("/form", { state: { booking: data[index] } })}
                                        >
                                            संपादित करा
                                        </button>
                                        <button
                                            className="btn btn-sm bg-red-500 text-white"
                                            onClick={() => handleDelete(data[index]._id)}
                                        >
                                            हटवा
                                        </button>

                                        {/* फक्त Booking झालं असेल तरच बिल बटन */}
                                        {row.status !== "Enquiry" && (
                                            <Link
                                                to="/bill"
                                                state={{ booking: data[index] }}  // 👉 मूळ MongoDB डेटा पास कर
                                                className="btn btn-sm bg-blue-500 text-white"
                                            >
                                                View Bill
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center p-4">
                                    काहीही सापडले नाही ❌
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 📑 Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    className="btn btn-sm bg-orange-500 text-white"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                >
                    मागील
                </button>
                <p>
                    पृष्ठ {currentPage} पैकी {totalPages}
                </p>
                <button
                    className="btn btn-sm bg-orange-500 text-white"
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                >
                    पुढील
                </button>
            </div>
        </div>
    );
};

export default BookingList;



