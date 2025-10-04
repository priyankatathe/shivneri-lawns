import React from 'react';
import clsx from 'clsx';

const UserInfo = ({ formik }) => {
    const handleClass = (field) =>
        clsx("input input-bordered bg-blue-50 w-full", {
            "border-red-500": formik.touched[field] && formik.errors[field],
            "border-green-500": formik.touched[field] && !formik.errors[field],
        });

    return (
        <div className="w-[318%] overflow-hidden md:1-[56%] lg:[10%]  ">
            {/* <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 font-marathi">
                ग्राहकाची माहिती
            </h2> */}

            <h2 className="text-3xl font-serif mb-6 text-gray-800 ml-0 lg:ml-96">
                गणना फॉर्म माहिती
            </h2>
            <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* नाव */}
                <div className="flex flex-col w-[32%] md:w-[56%] lg:w-1/2">
                    <label className="font-semibold mb-1 block">* ग्राहकाचे नाव</label>
                    <input
                        type="text"
                        placeholder="ग्राहकाचे नाव"
                        className={handleClass("name")}
                        {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.name}
                        </p>
                    )}
                </div>

                {/* फोन नंबर 1 */}
                <div className="flex flex-col w-[32%] md:w-1/3 lg:w-1/2">
                    <label className="font-semibold mb-1 block">* फोन नंबर 1</label>
                    <input
                        type="tel"
                        placeholder="10 अंकी फोन नंबर"
                        className={handleClass("phone1")}
                        {...formik.getFieldProps("phone1")}
                        maxLength={10}
                    />
                    {formik.touched.phone1 && formik.errors.phone1 && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.phone1}
                        </p>
                    )}
                </div>

                {/* फोन नंबर 2 */}
                <div className="flex flex-col w-[32%] md:w-1/3 lg:w-1/2">
                    <label className="font-semibold mb-1 block">फोन नंबर 2 (ऐच्छिक)</label>
                    <input
                        type="tel"
                        placeholder="10 अंकी फोन नंबर"
                        className={handleClass("phone2")}
                        {...formik.getFieldProps("phone2")}
                        maxLength={10}
                    />
                    {formik.touched.phone2 && formik.errors.phone2 && (
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.phone2}
                        </p>
                    )}
                </div>
            </div>

            {/* पत्ता */}
            <div className="mt-4  w-[32%] md:w-1/3 lg:w-5/5">
                <label className="font-semibold   mb-1 block">* ग्राहकाचा पत्ता</label>
                <textarea
                    rows={2}
                    placeholder="ग्राहकाचा पत्ता"
                    className={handleClass("address")}
                    {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address && (
                    <p className="text-red-600 text-sm mt-1">
                        {formik.errors.address}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UserInfo;
