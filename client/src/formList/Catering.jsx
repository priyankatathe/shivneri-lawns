import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const Catering = ({ formik }) => {
    const [cateringItems, setCateringItems] = useState(['पाणी', 'भाजी', 'पोळी']);
    const [newItem, setNewItem] = useState('');
    const [openModal, setOpenModal] = useState(false);

    // कॅटरिंगसाठी एक extra field — array of items
    useEffect(() => {
        formik.setFieldValue("cateringItems", cateringItems);
    }, [cateringItems]);

    const handleClass = (arg) => clsx(
        "input input-bordered w-full bg-blue-50 mt-1 text-sm", {
        "border-red-500": formik.touched[arg] && formik.errors[arg],
        "border-green-500": formik.touched[arg] && !formik.errors[arg],
    });

    const handleAddItem = () => {
        const trimmedItem = newItem.trim();
        if (trimmedItem && !cateringItems.includes(trimmedItem)) {
            setCateringItems([...cateringItems, trimmedItem]);
            setNewItem('');
        }
    };

    const handleRemoveItem = (itemToRemove) => {
        setCateringItems(cateringItems.filter(item => item !== itemToRemove));
    };

    return (
        <>
            <div className="space-y-4">
                <div>
                    <label className="font-semibold text-sm">कॅटरिंग हवे आहे का?</label>
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
                        <div className="text-red-500 text-xs">{formik.errors.catering}</div>
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
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                    {/* Modal content */}
                    <div
                        className="relative bg-gray-900 text-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col pointer-events-auto"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                            <h2 id="modal-title" className="text-xl font-semibold text-orange-400 flex items-center gap-2">
                                <span>🍴</span> कॅटरिंग मेनू आयटम
                            </h2>
                            <button
                                onClick={() => setOpenModal(false)}
                                className="text-gray-400 hover:text-white transition-colors duration-200"
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
                                    className="flex items-center gap-3 bg-gray-800 rounded-md p-3"
                                >
                                    <span className="bg-yellow-500 text-black font-bold w-6 h-6 text-sm flex items-center justify-center rounded-full select-none">
                                        {index + 1}
                                    </span>
                                    <input
                                        type="text"
                                        value={item}
                                        readOnly
                                        className="flex-grow bg-gray-700 text-white rounded-md px-3 py-2 text-sm select-text"
                                    />
                                    <button
                                        onClick={() => handleRemoveItem(item)}
                                        className="bg-red-600 hover:bg-red-700 transition-colors duration-200 rounded-md px-3 py-1 text-sm"
                                        aria-label={`Remove ${item}`}
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add new item */}
                        <div className="px-6 py-4 border-t border-gray-700">
                            <input
                                type="text"
                                placeholder="नवीन आयटम"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="mt-3 w-full bg-yellow-400 text-black font-semibold rounded-md py-2 hover:bg-yellow-500 transition-colors duration-200"
                                disabled={!newItem.trim()}
                            >
                                + नवीन कॅटरिंग आयटम जोडा
                            </button>
                        </div>

                        {/* Done button */}
                        <div className="px-6 py-3 border-t border-gray-700 flex justify-end">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md px-5 py-2 transition-colors duration-200"
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
