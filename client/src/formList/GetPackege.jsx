import { useFormik } from 'formik';
import * as yup from "yup";
import React, { useState } from 'react';
import clsx from 'clsx';

const GetPackege = () => {
    const [getPackege, setGetPackege] = useState([
        { name: 'तुतारी', quantity: 1 },
        { name: 'भालदार', quantity: 2 },
        { name: 'फुलांची कमान', quantity: 1 },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedYes, setSelectedYes] = useState(false);

    const formik = useFormik({
        initialValues: {
            gatePackage: "",
        },
        validationSchema: yup.object({
            gatePackage: yup.string().required("कृपया पॅकेज पर्याय निवडा"),
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });

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
        <>
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

                {/* इथेच बटण ठेवलेलं आहे */}
                {selectedYes && (
                    <div className="mt-2">
                        <button
                            type="button"
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 border border-pink-500 text-pink-500 px-3 py-1 rounded text-sm hover:bg-pink-600 hover:text-white transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="w-4 h-4 text-pink-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0H7m6 0v6" />
                            </svg>
                            गेट पॅकेज आयटम व्यवस्थापित करा
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal Box */}
                    <div className="bg-[#1e1f25] text-white rounded-xl shadow-lg w-[600px] max-h-[70vh] overflow-y-auto p-6 relative">

                        {/* Header */}
                        <h2 className="text-lg font-bold text-pink-400 mb-4 flex items-center gap-2">
                            🏰 गेट पॅकेज सजावट
                        </h2>

                        {/* Items */}
                        <ul className="space-y-3">
                            {getPackege.map((item, index) => (
                                <li key={index} className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded">
                                    <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                        {index + 1}
                                    </span>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleNameChange(index, e.target.value)}
                                        placeholder="आयटमचे नाव प्रविष्ट करा"
                                        className="bg-gray-900 border-b border-pink-300 flex-1 text-white px-2 text-sm"
                                    />
                                    <span className="text-pink-300 text-sm">संख्या</span>
                                    <input
                                        type="number"
                                        min="0"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                                        className="w-14 bg-black text-center text-white rounded text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(index)}
                                        className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-2 py-1 text-sm"
                                    >
                                        ✖
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Divider */}
                        <div className="border-t border-pink-400 my-4"></div>
                        <p className="text-center text-sm mb-2">नवीन आयटम</p>

                        {/* Add New Item */}
                        <button
                            type="button"
                            onClick={handleAddNewItem}
                            className="w-full mt-2 text-white bg-pink-500 border border-pink-500 rounded px-3 py-2 text-sm hover:bg-pink-600 transition"
                        >
                            + नवीन गेट आयटम जोडा
                        </button>

                        {/* Footer */}
                        <div className="flex justify-end mt-6">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-sm"
                            >
                                पूर्ण झाले
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default GetPackege;
