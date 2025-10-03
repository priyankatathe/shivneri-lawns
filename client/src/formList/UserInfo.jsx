import { useFormik } from 'formik';
import React from 'react';
import * as yup from "yup";
import clsx from 'clsx';

const UserInfo = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            phone1: "",
            phone2: "",
            address: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("ग्राहकाचे नाव आवश्यक आहे"),
            phone1: yup
                .string()
                .required("फोन नंबर आवश्यक आहे")
                .matches(/^\d{10}$/, "10 अंकी नंबर टाका"),
            phone2: yup
                .string()
                .nullable()
                .matches(/^\d{10}$/, "10 अंकी नंबर टाका")
                .notRequired(),
            address: yup.string().required("पत्ता आवश्यक आहे"),
        }),
        onSubmit: (values, { resetForm }) => {
            resetForm()
        }
    });

    const handleClass = (field) =>
        clsx("input input-bordered w-[96%] bg-blue-50", {
            "border-red-500": formik.touched[field] && formik.errors[field],
            "border-green-500": formik.touched[field] && !formik.errors[field],
        });

    return (
        <div className='w-[320%] '>
            {/* 🟢 Title - मध्यभागी आणि मराठी फॉन्ट */}
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 font-marathi">
                ग्राहकाची माहिती
            </h2>

            {/* ✅ एका row मध्ये 3 input */}
            <div className="flex flex-row gap-4 w-full">
                {/* नाव */}
                <div className="flex flex-col w-1/3 min-w-[250px]">
                    <label className="font-semibold mb-1 block">* ग्राहकाचे नाव</label>
                    <input
                        type="text"
                        placeholder="ग्राहकाचे नाव"
                        className={handleClass("name")}
                        {...formik.getFieldProps("name")}
                        aria-invalid={formik.touched.name && formik.errors.name ? "true" : undefined}
                        aria-describedby="name-error"
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="text-red-600 text-sm mt-1" id="name-error" role="alert">
                            {formik.errors.name}
                        </p>
                    )}
                </div>

                {/* फोन नंबर 1 */}
                <div className="flex flex-col w-1/3 min-w-[250px]">
                    <label className="font-semibold mb-1 block">* फोन नंबर 1</label>
                    <input
                        type="tel"
                        placeholder="10 अंकी फोन नंबर"
                        className={handleClass("phone1")}
                        {...formik.getFieldProps("phone1")}
                        maxLength={10}
                        aria-invalid={formik.touched.phone1 && formik.errors.phone1 ? "true" : undefined}
                        aria-describedby="phone1-error"
                    />
                    {formik.touched.phone1 && formik.errors.phone1 && (
                        <p className="text-red-600 text-sm mt-1" id="phone1-error" role="alert">
                            {formik.errors.phone1}
                        </p>
                    )}
                </div>

                {/* फोन नंबर 2 */}
                <div className="flex flex-col w-1/3 min-w-[250px]">
                    <label className="font-semibold mb-1 block">फोन नंबर 2 (ऐच्छिक)</label>
                    <input
                        type="tel"
                        placeholder="10 अंकी फोन नंबर"
                        className={handleClass("phone2")}
                        {...formik.getFieldProps("phone2")}
                        maxLength={10}
                        aria-invalid={formik.touched.phone2 && formik.errors.phone2 ? "true" : undefined}
                        aria-describedby="phone2-error"
                    />
                    {formik.touched.phone2 && formik.errors.phone2 && (
                        <p className="text-red-600 text-sm mt-1" id="phone2-error" role="alert">
                            {formik.errors.phone2}
                        </p>
                    )}
                </div>
            </div>

            {/* पत्ता */}
            <div className="md:col-span-2 mt-4">
                <label className="font-semibold mb-1 block">* ग्राहकाचा पत्ता</label>
                <textarea
                    rows={2}
                    placeholder="ग्राहकाचा पत्ता"
                    className={handleClass("address")}
                    {...formik.getFieldProps("address")}
                    aria-invalid={formik.touched.address && formik.errors.address ? "true" : undefined}
                    aria-describedby="address-error"
                />
                {formik.touched.address && formik.errors.address && (
                    <p className="text-red-600 text-sm mt-1" id="address-error" role="alert">
                        {formik.errors.address}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UserInfo;
