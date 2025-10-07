
// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useGetBookingsQuery } from "../redux/api/formApi";

// const BookingList = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [usersPerPage, setUsersPerPage] = useState(5);
//     const [search, setSearch] = useState("");
//     const [selectedDate, setSelectedDate] = useState("");
//     const [selectedMonth, setSelectedMonth] = useState("सर्व");

//     const { data = [], isLoading, isError } = useGetBookingsQuery();

//     if (isLoading) {
//         return <div className="text-center text-xl font-semibold p-10">लोड होत आहे...</div>;
//     }

//     if (isError) {
//         return <div className="text-center text-xl text-red-500 p-10">डेटा मिळाला नाही ❌</div>;
//     }

//     const formattedData = data.map((item) => ({
//         name: item.name || "N/A",
//         event: item.eventType || "—",
//         startDate: item.startDate,
//         endDate: item.endDate,
//         date:
//             item.startDate && item.endDate
//                 ? `${new Date(item.startDate).toLocaleDateString()} - ${new Date(item.endDate).toLocaleDateString()}`
//                 : "N/A",
//         venue: item.location || "N/A",
//         phone: [item.phone1, item.phone2].filter(Boolean),
//         status: item.status || "Enquiry",
//         total: item.totalRs || "-",
//         balance: item.balance || "-",
//     }));

//     // 🔍 Search + Date + Month Filters
//     const filteredData = formattedData.filter((row) => {
//         const searchLower = search.toLowerCase();

//         // Search filter
//         const matchSearch =
//             row.name.toLowerCase().includes(searchLower) ||
//             row.event.toLowerCase().includes(searchLower) ||
//             row.status.toLowerCase().includes(searchLower) ||
//             row.phone.some((num) => num.includes(searchLower));

//         // Date filter
//         const matchDate =
//             !selectedDate ||
//             (row.startDate &&
//                 new Date(row.startDate).toISOString().split("T")[0] === selectedDate);

//         // Month filter
//         const matchMonth =
//             selectedMonth === "सर्व" ||
//             (row.startDate &&
//                 new Date(row.startDate).getMonth() + 1 === Number(selectedMonth));

//         return matchSearch && matchDate && matchMonth;
//     });

//     // 📄 Pagination logic
//     const indexOfLastRow = currentPage * usersPerPage;
//     const indexOfFirstRow = indexOfLastRow - usersPerPage;
//     const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
//     const totalPages = Math.ceil(filteredData.length / usersPerPage);

//     return (
//         <div className="p-6">
//             <h2 className="text-center text-2xl font-bold mb-4">बुकिंग / एनक्वायरी लिस्ट</h2>

//             {/* 🔍 Search Bar */}
//             <div className="bg-white p-4 rounded-md mb-4">
//                 <div className="flex items-center gap-2 border rounded p-3 mb-3">
//                     <FaSearch className="text-gray-500" />
//                     <input
//                         type="text"
//                         value={search}
//                         onChange={(e) => {
//                             setSearch(e.target.value);
//                             setCurrentPage(1);
//                         }}
//                         placeholder="नाव, फोन, इव्हेंट, किंवा स्टेटस शोधा"
//                         className="w-full outline-none"
//                     />
//                 </div>

//                 {/* 🗓️ Filters */}
//                 <div className="flex flex-wrap items-center gap-4 mt-2">
//                     <div>
//                         <label className="mr-2 font-semibold">तारीख निवडा:</label>
//                         <input
//                             type="date"
//                             value={selectedDate}
//                             onChange={(e) => {
//                                 setSelectedDate(e.target.value);
//                                 setCurrentPage(1);
//                             }}
//                             className="border rounded p-2"
//                         />
//                     </div>

//                     <div>
//                         <label className="mr-2 font-semibold">महिना निवडा:</label>
//                         <select
//                             value={selectedMonth}
//                             onChange={(e) => {
//                                 setSelectedMonth(e.target.value);
//                                 setCurrentPage(1);
//                             }}
//                             className="border rounded p-2"
//                         >
//                             <option value="सर्व">सर्व</option>
//                             {Array.from({ length: 12 }, (_, i) => (
//                                 <option key={i + 1} value={i + 1}>
//                                     {i + 1} महिना
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div>
//                         <label className="mr-2 font-semibold">प्रत्येक पृष्ठावर वापरकर्ते:</label>
//                         <select
//                             value={usersPerPage}
//                             onChange={(e) => {
//                                 setUsersPerPage(Number(e.target.value));
//                                 setCurrentPage(1);
//                             }}
//                             className="border rounded p-2"
//                         >
//                             <option value="5">5</option>
//                             <option value="10">10</option>
//                             <option value="20">20</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             {/* 🧾 Table */}
//             <div className="overflow-x-auto p-3">
//                 <table className="table w-full border">
//                     <thead>
//                         <tr className="bg-orange-500 text-white text-center">
//                             <th>ग्राहकाचे नाव</th>
//                             <th>इव्हेंट प्रकार</th>
//                             <th>तारीख</th>
//                             <th>ठिकाण</th>
//                             <th>फोन नंबर</th>
//                             <th>स्थिती</th>
//                             <th>एकूण रक्कम</th>
//                             <th>शिल्लक</th>
//                             <th>कृती</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentRows.length > 0 ? (
//                             currentRows.map((row, index) => (
//                                 <tr
//                                     key={index}
//                                     className={`text-center ${row.status === "Enquiry" ? "bg-yellow-50" : "bg-white"
//                                         }`}
//                                 >
//                                     <td>{row.name}</td>
//                                     <td>{row.event}</td>
//                                     <td>{row.date}</td>
//                                     <td>{row.venue}</td>
//                                     <td>
//                                         {row.phone.map((num, i) => (
//                                             <div key={i}>{num}</div>
//                                         ))}
//                                     </td>
//                                     <td
//                                         className={`font-semibold ${row.status === "Enquiry"
//                                             ? "text-yellow-600"
//                                             : "text-green-600"
//                                             }`}
//                                     >
//                                         {row.status}
//                                     </td>
//                                     <td>{row.total}</td>
//                                     <td>{row.balance}</td>
//                                     <td className="flex justify-center gap-2">
//                                         <button className="btn btn-sm bg-orange-500 text-white">
//                                             संपादित करा
//                                         </button>
//                                         <button className="btn btn-sm bg-red-500 text-white">
//                                             हटवा
//                                         </button>

//                                         {row.status !== "Enquiry" && (
//                                             <Link
//                                                 to="/bill"
//                                                 state={{ booking: data[index] }}
//                                                 className="btn btn-sm bg-blue-500 text-white"
//                                             >
//                                                 View Bill
//                                             </Link>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="9" className="text-center p-4">
//                                     काहीही सापडले नाही ❌
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* 📑 Pagination */}
//             <div className="flex justify-between items-center mt-4">
//                 <button
//                     className="btn btn-sm bg-orange-500 text-white"
//                     onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                 >
//                     मागील
//                 </button>
//                 <p>
//                     पृष्ठ {currentPage} पैकी {totalPages}
//                 </p>
//                 <button
//                     className="btn btn-sm bg-orange-500 text-white"
//                     onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//                 >
//                     पुढील
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default BookingList;






import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetBookingsQuery } from "../redux/api/formApi";

const BookingList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("सर्व");

    const { data = [], isLoading, isError } = useGetBookingsQuery();
    console.log("Bookings Data:", data);


    if (isLoading) {
        return <div className="text-center text-xl font-semibold p-10">लोड होत आहे...</div>;
    }

    if (isError) {
        return <div className="text-center text-xl text-red-500 p-10">डेटा मिळाला नाही ❌</div>;
    }

    const formattedData = data.map((item) => ({
        name: item.name || "N/A",
        event: item.eventType || "—",
        startDate: item.startDate,
        endDate: item.endDate,
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

    // 🔍 Search + Date + Month Filters
    const filteredData = formattedData.filter((row) => {
        const searchLower = search.toLowerCase();

        // Search filter
        const matchSearch =
            row.name.toLowerCase().includes(searchLower) ||
            row.event.toLowerCase().includes(searchLower) ||
            row.status.toLowerCase().includes(searchLower) ||
            row.phone.some((num) => num.includes(searchLower));

        // Date filter
        const matchDate =
            !selectedDate ||
            (row.startDate &&
                new Date(row.startDate).toISOString().split("T")[0] === selectedDate);

        // Month filter
        const matchMonth =
            selectedMonth === "सर्व" ||
            (row.startDate &&
                new Date(row.startDate).getMonth() + 1 === Number(selectedMonth));

        return matchSearch && matchDate && matchMonth;
    });

    // 📄 Pagination logic
    const indexOfLastRow = currentPage * usersPerPage;
    const indexOfFirstRow = indexOfLastRow - usersPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredData.length / usersPerPage);

    return (
        <div className="p-6">
            <h2 className="text-center text-2xl font-bold mb-4">बुकिंग / एनक्वायरी लिस्ट</h2>
            <pre> {JSON.stringify(data, null, 2)}</pre>
            {/* 🔍 Search Bar */}
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

                {/* 🗓️ Filters */}
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
                                <option key={i + 1} value={i + 1}>
                                    {i + 1} महिना
                                </option>
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
            <div className="overflow-x-auto p-3">
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
                                    className={`text-center ${row.status === "Enquiry" ? "bg-yellow-50" : "bg-white"
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
                                        <button className="btn btn-sm bg-orange-500 text-white">
                                            संपादित करा
                                        </button>
                                        <button className="btn btn-sm bg-red-500 text-white">
                                            हटवा
                                        </button>

                                        {row.status !== "Enquiry" && (
                                            <Link
                                                to="/bill"
                                                state={{ booking: data[index] }}
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

















