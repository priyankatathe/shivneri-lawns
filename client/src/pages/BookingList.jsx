
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

    const handleDelete = async (id) => {
        try {
            await deleteBooking(id).unwrap();
            toast.success("बुकिंग यशस्वीरित्या हटवले ✅");
        } catch (error) {
            console.error("❌ Delete failed:", error);
            toast.error("हटवताना त्रुटी आली ❌");
        }
    };

    if (isLoading)
        return <div className="text-center text-xl font-semibold p-10 text-orange-600">लोड होत आहे...</div>;

    if (isError)
        return <div className="text-center text-xl text-red-500 p-10">डेटा मिळाला नाही ❌</div>;

    // डेटा फॉरमॅटिंग
    const formattedData = data.map((item) => ({
        original: item,
        name: item.name || "N/A",
        event: item.eventType || "—",
        startDate: item.startDate ? new Date(item.startDate) : null,
        endDate: item.endDate ? new Date(item.endDate) : null,
        date:
            item.startDate && item.endDate
                ? `${new Date(item.startDate).toLocaleDateString()} - ${new Date(item.endDate).toLocaleDateString()}`
                : "N/A",
        venue: item.location || "N/A",
        phone: [item.phone1, item.phone2].filter(Boolean),
        status: item.status || "Enquiry",
        total: item.totalRs || "-",
        balance: item.balance || "-",
    }));

    // Filters
    const filteredData = formattedData.filter((row) => {
        const searchLower = search.toLowerCase();

        const matchesSearch =
            row.name.toLowerCase().includes(searchLower) ||
            row.event.toLowerCase().includes(searchLower) ||
            row.status.toLowerCase().includes(searchLower) ||
            row.phone.some((num) => num.includes(searchLower));

        const matchesDate = selectedDate
            ? row.startDate && row.startDate.toISOString().split("T")[0] === selectedDate
            : true;

        const matchesMonth =
            selectedMonth === "सर्व"
                ? true
                : row.startDate && row.startDate.getMonth() + 1 === parseInt(selectedMonth);

        return matchesSearch && matchesDate && matchesMonth;
    });

    // Pagination
    const indexOfLastRow = currentPage * usersPerPage;
    const indexOfFirstRow = indexOfLastRow - usersPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredData.length / usersPerPage);

    return (
        <div className="min-h-screen bg-gray-100 p-8 pt-20">

            {/* Search & Filters */}
            <div className="p-6 rounded-xl mb-4 space-y-6">
                <h2 className="text-center text-2xl font-bold mb-6 text-orange-600">बुकिंग / एनक्वायरी लिस्ट</h2>
                <div className="flex items-center gap-3 border border-gray-300 rounded-md p-3 focus-within:ring-2 focus-within:ring-orange-400">
                    <FaSearch className="text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="नाव, फोन, इव्हेंट, किंवा स्टेटस शोधा"
                        className="w-full outline-none text-gray-700"
                    />
                </div>

                <div className="flex flex-wrap gap-6 items-center justify-start">
                    {/* Date Filter */}
                    <div>
                        <label className="font-semibold text-gray-700">तारीख निवडा:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border border-gray-300 rounded-md p-2 ml-2"
                        />
                    </div>

                    {/* Month Filter */}
                    <div>
                        <label className="font-semibold text-gray-700">महिना निवडा:</label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => {
                                setSelectedMonth(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border border-gray-300 rounded-md p-2 ml-2"
                        >
                            <option value="सर्व">सर्व</option>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {new Date(0, i).toLocaleString("mr-IN", { month: "long" })}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Rows per page */}
                    <div>
                        <label className="font-semibold text-gray-700">प्रत्येक पृष्ठावर वापरकर्ते:</label>
                        <select
                            value={usersPerPage}
                            onChange={(e) => {
                                setUsersPerPage(parseInt(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="border border-gray-300 rounded-md p-2 ml-2"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-md rounded-xl bg-white">
                <table className="table-auto w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-orange-500 text-white text-center">
                            <th className="py-2 px-3">ग्राहकाचे नाव</th>
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
                                    className={`text-center border-b ${row.status === "Enquiry" ? "bg-yellow-50" : "bg-white"} hover:bg-orange-50 transition`}
                                >
                                    <td className="py-2">{row.name}</td>
                                    <td>{row.event}</td>
                                    <td>{row.date}</td>
                                    <td>{row.venue}</td>
                                    <td>{row.phone.map((num, i) => (<div key={i}>{num}</div>))}</td>
                                    <td className={`font-semibold ${row.status === "Enquiry" ? "text-yellow-600" : "text-green-600"}`}>{row.status}</td>
                                    <td>{row.total}</td>
                                    <td>{row.balance}</td>
                                    <td className="flex justify-center gap-2 py-2">
                                        <button
                                            className="bg-orange-500 text-white px-3 py-1 rounded-md text-xs hover:bg-orange-600"
                                            onClick={() => navigate("/form", { state: { booking: row.original } })}
                                        >
                                            संपादित करा
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600"
                                            onClick={() => handleDelete(row.original._id)}
                                        >
                                            हटवा
                                        </button>
                                        {row.status !== "Enquiry" && (
                                            <Link
                                                to="/bill"
                                                state={{ booking: row.original }}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-600"
                                            >
                                                View Bill
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-6 text-gray-600">
                                    काहीही सापडले नाही ❌
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <button
                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                >
                    मागील
                </button>
                <p className="font-semibold text-gray-700">
                    पृष्ठ {currentPage} पैकी {totalPages}
                </p>
                <button
                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                >
                    पुढील
                </button>
            </div>
        </div>
    );
};

export default BookingList;

