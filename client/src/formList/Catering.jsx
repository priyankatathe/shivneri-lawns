import { useFormik } from 'formik';
import * as yup from "yup";
import React, { useState } from 'react';
import clsx from 'clsx';

const Catering = () => {
    const [cateringItems, setCateringItems] = useState(['पाणी', 'भाजी', 'पोळी']);
    const [newItem, setNewItem] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const formik = useFormik({
        initialValues: {
            catering: "",
        },
        validationSchema: yup.object({
            catering: yup.string().required("कृपया कॅटरिंग निवडा"),
        }),
        onSubmit: (values, { resetForm }) => {
            resetForm();
        }
    });

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
            <form onSubmit={formik.handleSubmit} className="space-y-4">

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

                {/* जर हो निवडलं तर बटण दाखव */}
                {formik.values.catering === "yes" && (
                    <button
                        type="button"
                        onClick={() => setOpenModal(true)}
                        className="border border-yellow-400 text-yellow-400 pr-1 pl-1 rounded hover:bg-yellow-400 hover:text-black text-sm"
                    >
                        🍴 कॅटरिंग आयटम व्यवस्थापीत करा
                    </button>
                )}
            </form>

            {/* Modal */}
            {openModal && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50">
                    <div className="bg-gray-900 text-white rounded-lg shadow-lg w-[400px] p-4">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-sm font-bold text-orange-400">🍴 कॅटरिंग मेनू आयटम</h2>
                            <button
                                className="text-gray-400 hover:text-white text-sm"
                                onClick={() => setOpenModal(false)}
                            >
                                ✖
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="space-y-2">
                            {cateringItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-2 bg-gray-800 p-2 rounded text-sm">
                                    <span className="bg-yellow-500 text-black font-bold w-5 h-5 text-xs flex items-center justify-center rounded-full">{index + 1}</span>
                                    <input
                                        type="text"
                                        value={item}
                                        readOnly
                                        className="flex-1 bg-gray-100 text-black px-2 py-1 rounded text-xs"
                                    />
                                    <button
                                        onClick={() => handleRemoveItem(item)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* नवीन आयटम */}
                        <div className="mt-3 border-t border-gray-700 pt-3">
                            <input
                                type="text"
                                placeholder="नवीन आयटम"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                className="input input-bordered w-full bg-gray-100 text-black text-sm"
                            />
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="mt-2 w-full border border-yellow-400 text-yellow-400 py-1 rounded text-sm hover:bg-yellow-400 hover:text-black"
                            >
                                + नवीन कॅटरिंग आयटम जोडा
                            </button>
                        </div>

                        {/* पूर्ण झाले बटण */}
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
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
