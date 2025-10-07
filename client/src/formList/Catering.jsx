import React, { useState } from "react";
import clsx from "clsx";

const Catering = ({ formik }) => {
    const [newItem, setNewItem] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const cateringItems = formik.values.cateringItems || [];

    const handleCateringChange = (e) => {
        const val = e.target.value;
        formik.handleChange(e);

        if (val !== "yes") {
            setOpenModal(false);
            formik.setFieldValue("cateringItems", []);
        }
    };

    const handleAddItem = () => {
        const trimmedItem = newItem.trim();
        if (
            trimmedItem &&
            !cateringItems.some(
                (item) => item.name.toLowerCase() === trimmedItem.toLowerCase()
            )
        ) {
            formik.setFieldValue("cateringItems", [
                ...cateringItems,
                { name: trimmedItem, quantity: 1 },
            ]);
            setNewItem("");
        }
    };

    const handleRemoveItem = (itemToRemove) => {
        formik.setFieldValue(
            "cateringItems",
            cateringItems.filter((item) => item.name !== itemToRemove.name)
        );
    };

    const handleQuantityChange = (itemToUpdate, newQty) => {
        if (newQty < 1) return;
        const updatedItems = cateringItems.map((item) =>
            item.name === itemToUpdate.name ? { ...item, quantity: newQty } : item
        );
        formik.setFieldValue("cateringItems", updatedItems);
    };

    const handleClass = (field) =>
        clsx("input input-bordered bg-blue-50 w-full", {
            "border-red-500": formik.touched[field] && formik.errors[field],
            "border-green-500": formik.touched[field] && !formik.errors[field],
        });


    return (
        <>
            <div className="space-y-4 overflow-hidden">
                <div>
                    <label className="font-semibold text-sm">कॅटरिंग हवे आहे का?</label>
                    <select
                        name="catering"
                        value={formik.values.catering}
                        onChange={handleCateringChange}
                        onBlur={formik.handleBlur}
                        className={handleClass("catering")}
                    >
                        <option value="">-- निवडा --</option>
                        <option value="yes">हो</option>
                        <option value="no">नाही</option>
                    </select>
                    {formik.touched.catering && formik.errors.catering && (
                        <div className="text-red-500 text-xs">{formik.errors.catering}</div>
                    )}
                </div>

                {formik.values.catering === "yes" && (
                    <button
                        type="button"
                        onClick={() => setOpenModal(true)}
                        className="border border-yellow-400 text-yellow-400 px-2 py-1 rounded hover:bg-yellow-400 hover:text-black text-sm sm:text-xs"
                    >
                        🍴 कॅटरिंग आयटम व्यवस्थापीत करा
                    </button>
                )}
            </div>

            {openModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="absolute inset-0 bg-black opacity-30"
                        onClick={() => setOpenModal(false)}
                    ></div>

                    <div className="relative w-[200%] sm:w-[200%] md:w-[80%] lg:w-[55%] max-w-4xl max-h-[90vh] bg-white text-gray-900 rounded-xl shadow-xl flex flex-col text-sm sm:text-sm md:text-base">

                        {/* Header */}
                        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
                            <h2 className="text-lg sm:text-xl font-semibold text-blue-500 flex items-center gap-2">
                                <span>🍴</span> कॅटरिंग मेनू आयटम
                            </h2>
                            <button
                                onClick={() => setOpenModal(false)}
                                className="text-gray-400 hover:text-blue-700 transition-colors duration-200 text-lg"
                                aria-label="Close modal"
                            >
                                ✖
                            </button>
                        </div>

                        {/* Items list */}
                        <div className="px-4 sm:px-6 py-4 overflow-y-auto flex-grow space-y-3">
                            {cateringItems.length === 0 && (
                                <p className="text-gray-400 text-center text-sm">
                                    अजून कॅटरिंग आयटम नाहीत.
                                </p>
                            )}

                            {cateringItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 sm:gap-2 sm:w-[96%] bg-blue-50 rounded-md pr-2 pl-1 pb-2"
                                >
                                    <span className="bg-blue-500 p-1 ml-1 text-white  text-xs sm:text-xs md:text-xs w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center rounded-full select-none">
                                        {index + 1}
                                    </span>
                                    <input
                                        type="text"
                                        value={item.name}
                                        readOnly
                                        className="flex-grow bg-transparent text-gray-900 border-0 border-b-2 border-blue-200 focus:border-blue-800 transition-colors duration-300 text-sm font-medium px-0 py-1 sm:py-2 rounded-none outline-none"
                                    />



                                    <button
                                        onClick={() => handleRemoveItem(item)}
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
                            <input
                                type="text"
                                placeholder="नवीन आयटम"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                className={clsx(
                                    "w-full bg-transparent text-gray-900 border-0 border-b-2 px-0 py-1 sm:py-2 text-xs sm:text-sm placeholder-gray-400 transition-all duration-300 outline-none",
                                    {
                                        "border-b-blue-400 focus:border-b-blue-700": newItem.trim(),
                                        "border-b-gray-300 focus:border-b-blue-400": !newItem.trim(),
                                    }
                                )}
                            />
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="mt-3 w-full bg-blue-500 text-white font-semibold rounded-md py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-blue-600 transition-colors duration-200"
                                disabled={!newItem.trim()}
                            >
                                + नवीन कॅटरिंग आयटम जोडा
                            </button>
                        </div>

                        {/* Done button */}
                        <div className="px-4 sm:px-6 py-3 border-t border-gray-100 bg-gray-50 flex justify-end rounded-b-xl">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors duration-200"
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
