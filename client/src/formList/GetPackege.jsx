import { useFormik } from 'formik';
import * as yup from "yup";
import React, { useState } from 'react';
import clsx from 'clsx';

const GetPackege = ({ formik }) => {
    const [getPackege, setGetPackege] = useState([
        { name: 'तुतारी', quantity: 1 },
        { name: 'भालदार', quantity: 2 },
        { name: 'फुलांची कमान', quantity: 1 },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedYes, setSelectedYes] = useState(false);


    const handleClass = (arg) => clsx(
        "input input-bordered w-full mt-1 bg-blue-50 text-sm", {
        "border-red-500": formik.touched[arg] && formik.errors[arg],
        "border-green-500": formik.touched[arg] && !formik.errors[arg],
    });

    const handleRemoveItem = (index) => {
        const updated = [...getPackege];
        updated.splice(index, 1);
        setGetPackege(updated);
    };

    const handleQuantityChange = (index, value) => {
        const updated = [...getPackege];
        updated[index].quantity = parseInt(value) || 0;
        setGetPackege(updated);
    };

    const handleNameChange = (index, value) => {
        const updated = [...getPackege];
        updated[index].name = value;
        setGetPackege(updated);
    };

    const handleAddNewItem = () => {
        setGetPackege([...getPackege, { name: '', quantity: 1 }]);
    };

    return (
        <div className='overflow-hidden'>
            {/* Select Box */}
            <div className="mb-4">
                <label className="font-semibold text-sm">गेट पॅकेज आवश्यक आहे का? *</label>
                <select
                    name="gatePackage"
                    value={formik.values.gatePackage}
                    onChange={(e) => {
                        formik.handleChange(e);
                        if (e.target.value === "yes") {
                            setSelectedYes(true);
                        } else {
                            setSelectedYes(false);
                        }
                    }}
                    onBlur={formik.handleBlur}
                    className={handleClass("gatePackage")}
                >
                    <option value="">-- निवडा --</option>
                    <option value="yes">होय</option>
                    <option value="no">नाही</option>
                </select>
                {formik.touched.gatePackage && formik.errors.gatePackage && (
                    <div className="text-red-500 text-xs">{formik.errors.gatePackage}</div>
                )}

                {/* Button */}
                {selectedYes && (
                    <div className="mt-2">
                        <button
                            type="button"
                            onClick={() => setShowModal(true)}
                            className="border border-yellow-400 text-yellow-400 pr-1 pl-1 rounded hover:bg-yellow-400 hover:text-black text-sm"
                        >
                            🍴 गेट पॅकेज आयटम व्यवस्थापित करा
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10 px-4">
                    <div className="relative bg-white rounded-xl border border-blue-100 shadow-2xl max-w-full sm:w-[600px] md:w-[760px] max-h-[85vh] flex flex-col">

                        {/* Header */}
                        <div className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b border-blue-100 rounded-t-xl bg-gradient-to-r from-blue-50 via-white to-blue-50">
                            <h2 className="text-lg sm:text-xl font-bold text-blue-700 flex items-center gap-2">
                                🏰 गेट पॅकेज सजावट
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-2xl text-blue-400 hover:text-blue-700 transition-all font-light focus:outline-none"
                                aria-label="Close"
                            >×</button>
                        </div>

                        {/* Scrollable Items List */}
                        <div className="px-4 sm:px-8 pt-3 sm:pt-4 overflow-y-auto" style={{ maxHeight: "50vh" }}>
                            <ul className="space-y-3 pb-2">
                                {getPackege.map((item, index) => (
                                    <li key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pr-2 pl-2 pb-1">
                                        <span className="bg-blue-300 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">{index + 1}</span>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => handleNameChange(index, e.target.value)}
                                            placeholder="आयटमचे नाव प्रविष्ट करा"
                                            className="bg-transparent border-b-2 border-gray-300 text-gray-800 text-sm px-1 py-1 focus:border-gray-600 outline-none flex-1 w-full sm:w-auto"
                                        />
                                        <span className="text-gray-700 text-sm font-medium">संख्या</span>
                                        <input
                                            type="number"
                                            min="0"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                                            className="w-20 sm:w-14 bg-transparent border-b-2 border-gray-300 text-gray-800 text-center focus:border-gray-600 rounded-none outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveItem(index)}
                                            className="bg-blue-200 hover:bg-blue-400 text-white rounded-full p-2 text-base transition self-start sm:self-auto"
                                            aria-label="Remove"
                                        >✖</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* New Item Card */}
                        <div className="px-4 sm:px-8 mt-3">
                            <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-md py-3 px-4 text-center">
                                <p className="text-base font-semibold">नवीन आयटम</p>
                                <button
                                    type="button"
                                    onClick={handleAddNewItem}
                                    className="mt-2 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto"
                                >
                                    + नवीन गेट आयटम जोडा
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end px-4 sm:px-8 py-4 border-t border-blue-100 bg-white rounded-b-xl ">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="bg-green-500 hover:bg-green-600 text-white p-2 pl-2 rounded-sm font-bold text-sm transition"
                            >
                                पूर्ण झाले
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default GetPackege;
