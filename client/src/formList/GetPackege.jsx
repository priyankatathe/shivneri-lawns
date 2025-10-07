import { useFormik } from 'formik';
import * as yup from "yup";
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

const GetPackege = ({ formik }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedYes, setSelectedYes] = useState(false);

    // Reflect initial formik value for gatePackage to local state so the manage button shows on edit
    useEffect(() => {
        if (formik?.values?.gatePackage === "yes") {
            setSelectedYes(true)
        } else {
            setSelectedYes(false)
        }
    }, [formik?.values?.gatePackage])



    const gatePackageItems = formik.values.gatePackageItems || [];

    const handleClass = (arg) =>
        clsx("input input-bordered w-full mt-1 bg-blue-50 text-sm", {
            "border-red-500": formik.touched[arg] && formik.errors[arg],
            "border-green-500": formik.touched[arg] && !formik.errors[arg],
        });

    const handleRemoveItem = (index) => {
        const updated = [...gatePackageItems];
        updated.splice(index, 1);
        formik.setFieldValue("gatePackageItems", updated);
    };

    const handleQuantityChange = (index, value) => {
        const updated = [...gatePackageItems];
        updated[index] = { ...updated[index], quantity: parseInt(value) || 0 };
        formik.setFieldValue("gatePackageItems", updated);
    };

    const handleNameChange = (index, value) => {
        const updated = [...gatePackageItems];
        updated[index] = { ...updated[index], name: value };
        formik.setFieldValue("gatePackageItems", updated);
    };

    const handleAddNewItem = () => {
        formik.setFieldValue("gatePackageItems", [
            ...gatePackageItems,
            { name: '', quantity: 1 }
        ]);
    };

    return (


        <div className='overflow-hidden'>


            <div className="mb-4">
                <label className="font-semibold text-sm">गेट पॅकेज आवश्यक आहे का? *</label>
                <select
                    className={handleClass("gatePackage")}
                    {...formik.getFieldProps("gatePackage")}
                    name="gatePackage"

                >
                    <option value="">-- निवडा --</option>
                    <option value="होय">होय</option>
                    <option value="नाही">नाही</option>
                </select>
                {formik.touched.gatePackage && formik.errors.gatePackage && (
                    <div className="text-red-500 text-xs">{formik.errors.gatePackage}</div>
                )}
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

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 p-2 sm:p-4">
                    <div className="relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[55%] max-w-4xl max-h-[90vh] bg-white text-gray-900 rounded-xl shadow-xl flex flex-col text-sm sm:text-sm md:text-base overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-white to-blue-50">
                            <h2 className="text-lg sm:text-xl font-semibold text-blue-500 flex items-center gap-2">
                                <span>🏰</span> गेट पॅकेज सजावट
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-blue-700 transition-colors duration-200 text-lg"
                                aria-label="Close modal"
                            >
                                ✖
                            </button>
                        </div>

                        {/* Items list */}
                        <div className="px-4 sm:px-6 py-4 overflow-y-auto flex-grow space-y-3">
                            {gatePackageItems.length === 0 && (
                                <p className="text-gray-400 text-center text-sm">अजून गेट पॅकेज आयटम नाहीत.</p>
                            )}

                            {gatePackageItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 sm:gap-2 sm:w-[96%] bg-blue-50 rounded-md pr-2 pl-1 pb-2"
                                >
                                    <span className="bg-blue-500 p-1 ml-1 text-white text-xs sm:text-xs md:text-xs w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center rounded-full select-none">
                                        {index + 1}
                                    </span>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleNameChange(index, e.target.value)}
                                        placeholder="आयटमचे नाव"
                                        className="flex-grow min-w-0 bg-transparent text-gray-900 border-0 border-b-2 border-blue-200 focus:border-blue-800 transition-colors duration-300 text-sm font-medium px-0 py-1 sm:py-2 rounded-none outline-none"
                                    />

                                    {/* Quantity controls */}
                                    <div className="flex items-center space-x-1 sm:space-x-2">
                                        <span className="text-gray-700 text-xs sm:text-sm">संख्या</span>
                                        <input
                                            type="number"
                                            min="0"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                                            className="w-10 sm:w-12 text-center border border-gray-300 rounded py-0.5 sm:py-1 text-xs sm:text-sm"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(index)}
                                        className="bg-red-100 hover:bg-red-200 text-red-600 font-bold transition-colors duration-200 rounded-md px-1 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-sm ml-1 sm:ml-0"
                                        aria-label={`Remove ${item.name}`}
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add new item */}
                        <div className="px-4 sm:px-6 py-4 border-t border-gray-100 bg-gray-50">
                            <div className="w-full">
                                <button
                                    type="button"
                                    onClick={handleAddNewItem}
                                    className="w-full bg-blue-500 text-white font-semibold rounded-md py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-blue-600 transition-colors duration-200"
                                >
                                    + नवीन गेट आयटम जोडा
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-4 sm:px-6 py-3 border-t border-gray-100 bg-gray-50 flex justify-end rounded-b-xl">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors duration-200"
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
