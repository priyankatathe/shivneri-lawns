import { useFormik } from 'formik';
import * as yup from "yup";
import React, { useState } from 'react';
import clsx from 'clsx';

const GetPackege = () => {
    const [getPackege, setgetPackege] = useState([
        { name: 'तुतारी', quantity: 1 },
        { name: 'भालदार', quantity: 1 },
        { name: 'चोपदार', quantity: 1 },
        { name: 'छत्री', quantity: 1 }
    ]);

    const [newItem, setNewItem] = useState('');
    const [newItemError, setNewItemError] = useState('');

    const formik = useFormik({
        initialValues: {
            gatePackage: "", // 'yes' किंवा 'no'
        },
        validationSchema: yup.object({
            gatePackage: yup.string().required("कृपया gatePackage निवडा"),
        }),
        onSubmit: (values, { resetForm }) => {
            resetForm();
        }
    });

    const handleClass = (arg) => clsx(
        "input input-bordered w-full  bg-blue-50", {
        "border-red-500": formik.touched[arg] && formik.errors[arg],
        "border-green-500": formik.touched[arg] && !formik.errors[arg],
    });

    const handleAddItem = () => {
        const trimmedItem = newItem.trim();

        if (!trimmedItem) {
            setNewItemError("कृपया आयटमचे नाव भरा");
            return;
        }

        if (getPackege.find(item => item.name === trimmedItem)) {
            setNewItemError("हा आयटम आधीच यादीत आहे");
            return;
        }

        setgetPackege([...getPackege, { name: trimmedItem, quantity: 1 }]);
        setNewItem('');
        setNewItemError('');
    };

    const handleRemoveItem = (itemToRemove) => {
        setgetPackege(getPackege.filter(item => item.name !== itemToRemove));
    };

    const handleQuantityChange = (index, value) => {
        const updatedItems = [...getPackege];
        const numericValue = parseInt(value, 10);
        updatedItems[index].quantity = isNaN(numericValue) ? 0 : numericValue;
        setgetPackege(updatedItems);
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Catering Select */}
                <div>
                    <label className="font-semibold">कॅटरिंग हवे आहे का?</label>
                    <select
                        name="gatePackage"
                        value={formik.values.gatePackage}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={handleClass("gatePackage")}
                    >
                        <option value="">-- निवडा --</option>
                        <option value="yes">हो</option>
                        <option value="no">नाही</option>
                    </select>
                    {formik.touched.gatePackage && formik.errors.gatePackage && (
                        <div className="text-red-500 text-sm">{formik.errors.gatePackage}</div>
                    )}
                </div>

                {/* जर "हो" असेल तरच आयटम लिस्ट दाखवा */}
                {formik.values.gatePackage === 'yes' && (
                    <div className="mt-4 space-y-4">
                        <label className="font-semibold">कॅटरिंग आयटम्स</label>
                        <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                            {getPackege.map((item, index) => (
                                <li key={index} className="flex items-center gap-2 bg-blue-50 px-2 h-9 py-2 rounded">
                                    <span className="w-24">{item.name}</span>
                                    <input
                                        type="number"
                                        min="0"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                                        className="input h-7 input-bordered w-20 bg-white text-center"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(item.name)}
                                        className="text-red-500 ml-16 font-bold hover:text-red-700"
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* नवीन आयटम जोडा */}
                        <div className="flex gap-2 mt-2 w-full">
                            <div className="w-full">
                                <input
                                    type="text"
                                    placeholder="नवीन आयटम टाका"
                                    value={newItem}
                                    onChange={(e) => {
                                        setNewItem(e.target.value);
                                        if (e.target.value.trim()) {
                                            setNewItemError('');
                                        }
                                    }}
                                    className="input input-bordered w-full bg-blue-50"
                                />
                                {newItemError && (
                                    <div className="text-red-500 text-sm mt-1">{newItemError}</div>
                                )}
                            </div>
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

export default GetPackege;
