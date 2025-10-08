
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteBookingMutation, useGetBookingsQuery } from "../redux/api/formApi";
import { toast } from "react-toastify";

const BookingList = () => {
    const [deleteBooking] = useDeleteBookingMutation();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("सर्व");

    const { data = [], isLoading, isError } = useGetBookingsQuery();

    if (isLoading) return <div className="text-center text-xl font-semibold p-10">लोड होत आहे...</div>;
    if (isError) return <div className="text-center text-xl text-red-500 p-10">डेटा मिळाला नाही ❌</div>;

    // 🔹 Filter + Search logic
    const filteredData = data.filter(item => {
        const searchLower = search.toLowerCase();
        const matchSearch =
            item.name?.toLowerCase().includes(searchLower) ||
            item.eventType?.toLowerCase().includes(searchLower) ||
            item.status?.toLowerCase().includes(searchLower) ||
            [item.phone1, item.phone2].filter(Boolean).some(num => num.includes(searchLower));

        const matchDate =
            !selectedDate ||
            (item.startDate && new Date(item.startDate).toISOString().split("T")[0] === selectedDate);

        const matchMonth =
            selectedMonth === "सर्व" ||
            (item.startDate && new Date(item.startDate).getMonth() + 1 === Number(selectedMonth));

        return matchSearch && matchDate && matchMonth;
    });

    // 📄 Pagination
    const indexOfLastRow = currentPage * usersPerPage;
    const indexOfFirstRow = indexOfLastRow - usersPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredData.length / usersPerPage);

    const handleDelete = async (id) => {
        try {
            await deleteBooking(id).unwrap();
            toast.success("बुकिंग यशस्वीरित्या हटवले गेले ✅");
        } catch (error) {
            console.error("❌ Delete failed:", error);
            toast.error("हटवताना त्रुटी आली ❌");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-center text-2xl font-bold mb-4">बुकिंग / एनक्वायरी लिस्ट</h2>

            {/* 🔍 Search & Filters */}
            <div className="bg-white p-4 rounded-md mb-4">
                <div className="flex items-center gap-2 border rounded p-3 mb-3">
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

                <div className="flex flex-wrap items-center gap-4 mt-2">
                    <div>
                        <label className="mr-2 font-semibold">तारीख निवडा:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="mr-2 font-semibold">महिना निवडा:</label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => {
                                setSelectedMonth(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border rounded p-2"
                        >
                            <option value="सर्व">सर्व</option>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1} महिना</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mr-2 font-semibold">प्रत्येक पृष्ठावर वापरकर्ते:</label>
                        <select
                            value={usersPerPage}
                            onChange={(e) => {
                                setUsersPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="border rounded p-2"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </div>
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
                            currentRows.map((row) => (
                                <tr
                                    key={row._id}
                                    className={`text-center ${row.status === "Enquiry" ? "bg-yellow-50" : "bg-white"}`}
                                >
                                    <td>{row.name}</td>
                                    <td>{row.eventType}</td>
                                    <td>
                                        {row.startDate && row.endDate
                                            ? `${new Date(row.startDate).toLocaleDateString()} - ${new Date(row.endDate).toLocaleDateString()}`
                                            : "N/A"}
                                    </td>
                                    <td>{row.location}</td>
                                    <td>
                                        {[row.phone1, row.phone2].filter(Boolean).map((num, i) => (
                                            <div key={i}>{num}</div>
                                        ))}
                                    </td>
                                    <td className={`font-semibold ${row.status === "Enquiry" ? "text-yellow-600" : "text-green-600"}`}>
                                        {row.status}
                                    </td>
                                    <td>{row.totalRs || "-"}</td>
                                    <td>{row.balance || "-"}</td>
                                    <td className="flex justify-center gap-2">
                                        {/* Edit */}
                                        <button
                                            className="btn btn-sm bg-orange-500 text-white"
                                            onClick={() => navigate("/form", { state: { booking: row } })}
                                        >
                                            संपादित करा
                                        </button>

                                        {/* Delete */}
                                        <button
                                            className="btn btn-sm bg-red-500 text-white"
                                            onClick={() => handleDelete(row._id)}
                                        >
                                            हटवा
                                        </button>

                                        {/* View Bill */}
                                        {row.status !== "Enquiry" && (
                                            <Link
                                                to="/bill"
                                                state={{ booking: row }} // मूळ booking object
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





