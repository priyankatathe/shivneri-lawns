
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // search icon
import { Link } from "react-router-dom";

const BookingList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5); // dynamic rows per page
    const [search, setSearch] = useState(""); // 🔍 search state

    const data = [
        {
            name: "vishal gote",
            event: "Birthday",
            date: "26 Sept 2025",
            venue: "Lawn",
            phone: ["9999999999", "8888888888"],
            status: "Booked",
            total: 10000,
            balance: 9000,
        },
        {
            name: "Ashish",
            event: "Marriage",
            date: "01 Oct 2025",
            venue: "Lawn",
            phone: ["9359494949", "9359494949"],
            status: "Enquiry",
            total: 10000,
            balance: 10000,
        },
        {
            name: "poojatayde",
            event: "Marriage",
            date: "02 Oct 2025",
            venue: "Lawn",
            phone: ["9503375709", "9987867856"],
            status: "Booked",
            total: 0,
            balance: -3,
        },
        {
            name: "poojatayde",
            event: "Marriage",
            date: "11 Oct 2025",
            venue: "Lawn",
            phone: ["9503375709", "9987867856"],
            status: "Booked",
            total: 0,
            balance: -3,
        },
        {
            name: "dfghhg",
            event: "Birthday",
            date: "02 Oct 2025",
            venue: "Banquet",
            phone: ["3333333333"],
            status: "Booked",
            total: 70000,
            balance: 20000,
        },
        {
            name: "dfghhg",
            event: "Birthday",
            date: "02 Oct 2025",
            venue: "Banquet",
            phone: ["3333333333"],
            status: "Booked",
            total: 70000,
            balance: 20000,
        },
        {
            name: "dfghhg",
            event: "Birthday",
            date: "02 Oct 2025",
            venue: "Banquet",
            phone: ["3333333333"],
            status: "Booked",
            total: 70000,
            balance: 20000,
        },
    ];

    // 🔍 Filter logic (नाव, फोन, इव्हेंट, status वरून search)
    const filteredData = data.filter((row) => {
        const searchLower = search.toLowerCase();
        return (
            row.name.toLowerCase().includes(searchLower) ||
            row.event.toLowerCase().includes(searchLower) ||
            row.status.toLowerCase().includes(searchLower) ||
            row.phone.some((num) => num.includes(searchLower))
        );
    });

    // Pagination logic (filteredData वापरले आहे)
    const indexOfLastRow = currentPage * usersPerPage;
    const indexOfFirstRow = indexOfLastRow - usersPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredData.length / usersPerPage);

    return <>
        <div className="p-6">
            <h2 className="text-center text-2xl font-bold mb-4">बुकिंग लिस्ट</h2>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-md mb-4">
                {/* Search */}
                <div className="mb-3">
                    <label className="flex items-center gap-2">
                        <div className="input input-bordered flex items-center gap-2 w-full h-20">
                            <span className="font-extrabold">बुकिंग शोधा:</span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1); // शोधल्यावर page reset
                                }}
                                placeholder="नाव, फोन, इव्हेंट प्रकार, किंवा चौकशी प्रकारानुसार शोधा"
                                className="grow focus:outline-none ps-16"
                            />
                        </div>
                    </label>
                </div>

                {/* Date, Month, Rows */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {/* Date */}
                    <label className="flex items-center gap-2">
                        <span className="font-semibold w-28">तारीख निवडा:</span>
                        <input
                            type="date"
                            className="input input-bordered w-40"
                            placeholder="dd-mm-yyyy"
                        />
                    </label>

                    {/* Month */}
                    <label className="flex items-center gap-2">
                        <span className="font-semibold w-28">महिना निवडा:</span>
                        <select className="select select-bordered w-20">
                            <option>सर्व</option>
                            <option>जानेवारी</option>
                            <option>फेब्रुवारी</option>
                            <option>मार्च</option>
                            <option>एप्रिल</option>
                            <option>मे</option>
                            <option>जून</option>
                            <option>जुलै</option>
                            <option>ऑगस्ट</option>
                            <option>सप्टेंबर</option>
                            <option>ऑक्टोबर</option>
                            <option>नोव्हेंबर</option>
                            <option>डिसेंबर</option>
                        </select>
                    </label>

                    {/* Rows per page */}
                    <label className="flex items-center gap-2">
                        <span className="font-semibold w-44">प्रत्येक पृष्ठावर वापरकर्ते:</span>
                        <select
                            className="select select-bordered w-20"
                            value={usersPerPage}
                            onChange={(e) => {
                                setUsersPerPage(Number(e.target.value));
                                setCurrentPage(1); // rows बदलल्यावर page reset करा
                            }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </label>
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
                            <th>ठिकाण प्रकार</th>
                            <th>ग्राहक नंबर</th>
                            <th>पेमेंट स्टेटस</th>
                            <th>अंतिम किंमत</th>
                            <th>शिल्लक रक्कम</th>
                            <th>कृती</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.length > 0 ? currentRows.map((row, index) => (
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
                        )) : (
                            <tr>
                                <td colSpan="9" className="text-center p-4">काहीही सापडले नाही ❌</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-1 p-5">
                <button className="btn btn-sm bg-orange-500 text-white"
                    onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1))} >
                    मागील
                </button>
                <p>
                    Page {currentPage} of {totalPages}
                </p>
                <button className="btn btn-sm bg-orange-500 text-white"
                    onClick={() => setCurrentPage((prev) => prev < totalPages ? prev + 1 : totalPages)}
                >
                    पुढील
                </button>
            </div>

        </div>
    </>
};

export default BookingList;

