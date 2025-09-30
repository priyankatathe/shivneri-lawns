import { useFormik } from 'formik';
import * as yup from "yup";
import React, { useState } from 'react';
import clsx from 'clsx';

const Catering = () => {
    const [cateringItems, setCateringItems] = useState(['पुलाव', 'भाजी', 'चपाती']);
    const [newItem, setNewItem] = useState('');

    const formik = useFormik({
        initialValues: {
            catering: "", // 'yes' किंवा 'no'
        },
        validationSchema: yup.object({
            catering: yup.string().required("कृपया कॅटरिंग निवडा"),
        }),
        onSubmit: (values, { resetForm }) => {
            resetForm();
        }
    });

    const handleClass = (arg) => clsx(
        "input input-bordered w-full bg-blue-50", {
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
                {/* Catering Select */}
                <div>
                    <label className="font-semibold">कॅटरिंग हवे आहे का?</label>
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
                        <div className="text-red-500 text-sm">{formik.errors.catering}</div>
                    )}
                </div>

                {/* जर "हो" असेल तरच आयटम लिस्ट दाखवा */}
                {formik.values.catering === 'yes' && (
                    <div className="mt-4 space-y-4">
                        <label className="font-semibold">कॅटरिंग आयटम्स</label>

                        {/* ✅ Scrollable List */}
                        <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                            {cateringItems.map((item, index) => (
                                <li key={index} className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded">
                                    <span>{item}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(item)}
                                        className="text-red-500 font-bold hover:text-red-700"
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* नवीन आयटम जोडा */}
                        <div className="flex gap-2 mt-2">
                            <input
                                type="text"
                                placeholder="नवीन आयटम टाका"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                className="input input-bordered w-full bg-blue-50"
                            />
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="btn btn-success"
                            >
                                नवीन आयटम जोडा
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </>
    );
};

export default Catering;
