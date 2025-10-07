import React from "react";
import clsx from "clsx";

const UserInfo = ({ formik }) => {
    const handleClass = (field) =>
        clsx("input input-bordered bg-blue-50 w-full", {
            "border-red-500": formik.touched[field] && formik.errors[field],
            "border-green-500": formik.touched[field] && !formik.errors[field],
        });

    return (
        <div className="lg:w-[318%] md:w-[209%] w-full overflow-hidden">
            <h2 className="text-xl font-serif mb-6 text-gray-800 text-center lg:text-left lg:ml-[45%]">
                ग्राहकाची माहिती
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* नाव */}
                <div className="flex flex-col">
                    <label className="font-semibold mb-1 block">* ग्राहकाचे नाव</label>
                    <input
                        type="text"
                        placeholder="ग्राहकाचे नाव"
                        className={handleClass("name")}
                        {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold mb-1 block">* फोन नंबर 1</label>
                    <input
                        type="tel"
                        placeholder="10 अंकी फोन नंबर"
                        className={handleClass("phone1")}
                        {...formik.getFieldProps("phone1")}
                        maxLength={10}
                    />
                    {formik.touched.phone1 && formik.errors.phone1 && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.phone1}</p>
                    )}
                </div>

                {/* फोन नंबर 2 */}
                <div className="flex flex-col">
                    <label className="font-semibold mb-1 block">
                        फोन नंबर 2 (ऐच्छिक)
                    </label>
                    <input
                        type="tel"
                        placeholder="10 अंकी फोन नंबर"
                        className={handleClass("phone2")}
                        {...formik.getFieldProps("phone2")}
                        maxLength={10}
                    />
                    {formik.touched.phone2 && formik.errors.phone2 && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.phone2}</p>
                    )}
                </div>

                {/* पत्ता */}
                <div className="flex flex-col md:col-span-2 lg:col-span-3">
                    <label className="font-semibold mb-1 block">* ग्राहकाचा पत्ता</label>
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
        </div>
    );
};

export default UserInfo;
