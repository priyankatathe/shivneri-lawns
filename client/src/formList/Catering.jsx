import React, { useState, useEffect } from "react";
import clsx from "clsx";

const Catering = ({ formik }) => {
    const [cateringItems, setCateringItems] = useState(["पाणी", "भाजी", "पोळी"]);
    const [newItem, setNewItem] = useState("");
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        formik.setFieldValue("cateringItems", cateringItems);
    }, [cateringItems]);

    const handleClass = (arg) =>
        clsx(
            "input input-bordered w-full bg-blue-50 mt-1 text-sm",
            {
                "border-red-500": formik.touched[arg] && formik.errors[arg],
                "border-green-500": formik.touched[arg] && !formik.errors[arg],
            }
        );

    const handleAddItem = () => {
        const trimmedItem = newItem.trim();
        if (trimmedItem && !cateringItems.includes(trimmedItem)) {
            setCateringItems([...cateringItems, trimmedItem]);
            setNewItem("");
        }
    };

    const handleRemoveItem = (itemToRemove) => {
        setCateringItems(cateringItems.filter((item) => item !== itemToRemove));
    };

    return (
        <>
            <div className="space-y-4 overflow-hidden">
                <div>
                    <label className="font-semibold text-sm">
                        कॅटरिंग हवे आहे का?
                    </label>
                    <select
                        name="catering"
                        value={formik.values.catering}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={handleClass("catering")}
                    >
                        <option value="">-- निवडा --</option>
                        <option value="yes">हो</option>
                        <option value="no">नाही</option>
                    </select>
                    {formik.touched.catering && formik.errors.catering && (
                        <div className="text-red-500 text-xs">
                            {formik.errors.catering}
                        </div>
                    )}
                </div>
                {formik.values.catering === "yes" && (
                    <button
                        type="button"
                        onClick={() => setOpenModal(true)}
                        className="border border-yellow-400 text-yellow-400 pr-1 pl-1 rounded hover:bg-yellow-400 hover:text-black text-sm"
                    >
                        🍴 कॅटरिंग आयटम व्यवस्थापीत करा
                    </button>
                )}
            </div>

            {openModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Transparent backdrop */}
                    <div
                        className="absolute inset-0 bg-black opacity-30"
                        onClick={() => setOpenModal(false)}
                    ></div>

                    {/* Modal content */}
                    {/* <div className="relative w-[130%] bg-white text-gray-900 rounded-xl shadow-xl  max-w-lg max-h-[80vh] flex flex-col"> */}
                    {/* <div className="relative w-[55%]    max-w-4xl bg-white text-gray-900 rounded-xl shadow-xl max-h-[80vh] flex flex-col"> */}
                    <div className="relative w-[55%] max-w-4xl max-h-[80vh] bg-white text-gray-900 rounded-xl shadow-xl flex flex-col">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-blue-500 flex items-center gap-2">
                                <span>🍴</span> कॅटरिंग मेनू आयटम
                            </h2>
                            <button
                                onClick={() => setOpenModal(false)}
                                className="text-gray-400 hover:text-blue-700 transition-colors duration-200"
                                aria-label="Close modal"
                            >
                                ✖
                            </button>
                        </div>

                        {/* Items list - scrollable */}
                        <div className="px-6 py-4 overflow-y-auto flex-grow space-y-3">
                            {cateringItems.length === 0 && (
                                <p className="text-gray-400 text-center text-sm">
                                    अजून कॅटरिंग आयटम नाहीत.
                                </p>
                            )}

                            {cateringItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 bg-blue-50 rounded-md pr-2 pl-2 pb-2"
                                >
                                    <span className="bg-blue-500 text-white font-bold w-6 h-6 text-sm flex items-center justify-center rounded-full select-none">
                                        {index + 1}
                                    </span>
                                    <input
                                        type="text"
                                        value={item}
                                        readOnly
                                        className="flex-grow bg-transparent text-gray-900 border-0 border-b-2 border-blue-200 focus:border-blue-800 transition-colors duration-300 text-sm font-medium px-0  py-2 rounded-none outline-none"
                                    />
                                    <button
                                        onClick={() => handleRemoveItem(item)}
                                        className="bg-red-100 hover:bg-red-200 text-red-600 font-bold transition-colors duration-200 rounded-md px-3 py-1 text-sm"
                                        aria-label={`Remove ${item}`}
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add new item */}
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                            <input
                                type="text"
                                placeholder="नवीन आयटम"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                className={clsx(
                                    "w-full bg-transparent text-gray-900 border-0 border-b-2 px-0 py-2 text-sm placeholder-gray-400 transition-all duration-300 outline-none",
                                    {
                                        "border-b-blue-400 focus:border-b-blue-700":
                                            newItem.trim(),
                                        "border-b-gray-300 focus:border-b-blue-400":
                                            !newItem.trim(),
                                    }
                                )}
                            />
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="mt-3 w-full bg-blue-500 text-white font-semibold rounded-md py-2 hover:bg-blue-600 transition-colors duration-200"
                                disabled={!newItem.trim()}
                            >
                                + नवीन कॅटरिंग आयटम जोडा
                            </button>
                        </div>

                        {/* Done button */}
                        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 flex justify-end rounded-b-xl">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md px-5 py-2 transition-colors duration-200"
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

export default Catering;
