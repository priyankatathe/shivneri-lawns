import React, { useState } from "react";
import clsx from "clsx";
import { useEffect } from "react";

const Catering = ({ formik }) => {
    const [newItem, setNewItem] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const cateringItems = formik.values.cateringItems || [];
    useEffect(() => {
        console.log("🟢 Catering component render, current formik.values.cateringItems:", formik.values.cateringItems);
    }, [formik.values.cateringItems]);



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

    const handleRemoveItem = (index) => {
        const updated = [...cateringItems];
        updated.splice(index, 1);
        formik.setFieldValue("cateringItems", updated);
    };

    const handleQuantityChange = (index, value) => {
        const updated = [...cateringItems];
        updated[index] = { ...updated[index], quantity: parseInt(value) || 1 };
        formik.setFieldValue("cateringItems", updated);
    };

    const handleNameChange = (index, value) => {
        const updated = [...cateringItems];
        updated[index] = { ...updated[index], name: value };
        formik.setFieldValue("cateringItems", updated);
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
                        {...formik.getFieldProps("catering")}
                        className={handleClass("catering")}
                    >
                        <option value="">-- निवडा --</option>
                        <option value="हो">हो</option>
                        <option value="नाही">नाही</option>
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

                    <div className="relative w-[90%] max-w-3xl max-h-[90vh] bg-white text-gray-900 rounded-xl shadow-xl flex flex-col overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-blue-500 flex items-center gap-2">
                                🍴 कॅटरिंग मेनू आयटम
                            </h2>
                            <button
                                onClick={() => setOpenModal(false)}
                                className="text-gray-400 hover:text-blue-700 text-lg"
                            >
                                ✖
                            </button>
                        </div>

                        {/* Items list */}
                        <div className="px-4 py-4 overflow-y-auto flex-grow space-y-3">
                            {cateringItems.length === 0 && (
                                <p className="text-gray-400 text-center text-sm">
                                    अजून कॅटरिंग आयटम नाहीत.
                                </p>
                            )}

                            {cateringItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-blue-50 rounded-md pr-2 pl-1 pb-2"
                                >
                                    <span className="bg-blue-500 p-1 text-white w-4 h-4 flex items-center justify-center rounded-full text-xs">
                                        {index + 1}
                                    </span>

                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleNameChange(index, e.target.value)}
                                        className="flex-grow bg-transparent text-gray-900 border-0 border-b-2 border-blue-200 focus:border-blue-800 px-0 py-1 text-sm outline-none"
                                    />

                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(index, parseInt(e.target.value))
                                        }
                                        className="w-14 border border-gray-300 rounded text-center text-sm"
                                    />

                                    <button
                                        onClick={() => handleRemoveItem(index)}
                                        className="bg-red-100 hover:bg-red-200 text-red-600 font-bold rounded-md px-2 py-1 text-xs"
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add new item */}
                        <div className="px-4 py-4 border-t border-gray-100 bg-gray-50">
                            <input
                                type="text"
                                placeholder="नवीन आयटम"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                className="w-full border-b-2 border-gray-300 px-2 py-1 text-sm outline-none"
                            />
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="mt-2 w-full bg-blue-500 text-white rounded-md py-1.5 text-sm hover:bg-blue-600"
                                disabled={!newItem.trim()}
                            >
                                + नवीन कॅटरिंग आयटम जोडा
                            </button>
                        </div>

                        {/* Done button */}
                        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md px-4 py-1.5 text-sm"
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