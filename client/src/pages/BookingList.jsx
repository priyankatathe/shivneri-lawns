
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetBookingsQuery } from "../redux/api/formApi";

const BookingList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [search, setSearch] = useState("");

    const { data = [], isLoading, isError } = useGetBookingsQuery();

    if (isLoading) {
        return <div className="text-center text-xl font-semibold p-10">लोड होत आहे...</div>;
    }

    if (isError) {
        return <div className="text-center text-xl text-red-500 p-10">डेटा मिळाला नाही ❌</div>;
    }

    // ✅ API ने दिलेल्या keys प्रमाणे map करा
    const formattedData = data.map((item) => ({
        name: item.name,
        event: item.eventType,
        date: `${new Date(item.startDate).toLocaleDateString()} - ${new Date(item.endDate).toLocaleDateString()}`,
        venue: item.location,
        phone: [item.phone1, item.phone2].filter(Boolean),
        status: item.status,
        total: item.totalRs,
        balance: item.balance,
    }));

    // 🔍 Search filter
    const filteredData = formattedData.filter((row) => {
        const searchLower = search.toLowerCase();
        return (
            row.name.toLowerCase().includes(searchLower) ||
            row.event.toLowerCase().includes(searchLower) ||
            row.status.toLowerCase().includes(searchLower) ||
            row.phone.some((num) => num.includes(searchLower))
        );
    });

    // Pagination logic
    const indexOfLastRow = currentPage * usersPerPage;
    const indexOfFirstRow = indexOfLastRow - usersPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredData.length / usersPerPage);

    return (
        <div className="p-6">
            <h2 className="text-center text-2xl font-bold mb-4">बुकिंग लिस्ट</h2>

            {/* Search Bar */}
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

            {/* Table */}
            <div className="overflow-x-auto p-3">
                <table className="table w-full border">
                    <thead>
                        <tr className="bg-orange-500 text-white text-center">
                            <th>ग्राहकाचे नाव</th>
                            <th>इव्हेंट प्रकार</th>
                            <th>तारीख</th>
                            <th>ठिकाण</th>
                            <th>फोन नंबर</th>
                            <th>स्टेटस</th>
                            <th>एकूण रक्कम</th>
                            <th>शिल्लक</th>
                            <th>कृती</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.length > 0 ? (
                            currentRows.map((row, index) => (
                                <tr key={index} className="text-center">
                                    <td>{row.name}</td>
                                    <td>{row.event}</td>
                                    <td>{row.date}</td>
                                    <td>{row.venue}</td>
                                    <td>
                                        {row.phone.map((num, i) => (
                                            <div key={i}>{num}</div>
                                        ))}
                                    </td>
                                    <td>{row.status}</td>
                                    <td>{row.total}</td>
                                    <td>{row.balance}</td>
                                    <td className="flex justify-center gap-2">
                                        <button className="btn btn-sm bg-orange-500 text-white">
                                            संपादित करा
                                        </button>
                                        <button className="btn btn-sm bg-red-500 text-white">
                                            हटवा
                                        </button>
                                        <Link to="/Bill" className="btn btn-sm bg-blue-500 text-white">
                                            बिल
                                        </Link>
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

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    className="btn btn-sm bg-orange-500 text-white"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                >
                    मागील
                </button>
                <p>पृष्ठ {currentPage} पैकी {totalPages}</p>
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


