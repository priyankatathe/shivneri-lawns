import React, { useEffect } from "react";
import clsx from "clsx";

const Calculationlogic = ({ formik }) => {
    const totalPrice = parseFloat(formik.values.totalRs) || 0;
    const discount = parseFloat(formik.values.discount) || 0;
    const advancePayment = parseFloat(formik.values.advancers) || 0;
    const finalPrice = totalPrice - discount > 0 ? totalPrice - discount : 0;
    const balance = finalPrice - advancePayment > 0 ? finalPrice - advancePayment : 0;

    useEffect(() => {
        formik.setFieldValue("finalPrice", finalPrice);
    }, [totalPrice, discount]);

    useEffect(() => {
        formik.setFieldValue("extraRs", balance);
    }, [finalPrice, advancePayment]);

    const handleClass = (field) =>
        clsx("input input-bordered w-full bg-blue-50", {
            "border-red-500": formik.touched[field] && formik.errors[field],
            "border-green-500": formik.touched[field] && !formik.errors[field],
        });

    return (
        <div className="w-[310%]">
            <h2 className="text-3xl font-serif ml-96 mb-6 text-gray-800">
                गणना फॉर्म माहिती
            </h2>

            <div className="flex flex-wrap gap-4">
                {/* ✅ एकाच Row मध्ये 3 Inputs */}
                <div className="flex flex-row w-full gap-4">
                    {/* एकूण किंमत */}
                    <div className="flex flex-col w-1/3 min-w-[250px]">
                        <label className="font-semibold mb-1 block">एकूण किंमत</label>
                        <input
                            type="number"
                            min="0"
                            placeholder="एकूण किंमत"
                            className={handleClass("totalRs")}
                            {...formik.getFieldProps("totalRs")}
                        />
                        {formik.touched.totalRs && formik.errors.totalRs && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.totalRs}</p>
                        )}
                    </div>

                    {/* सवलत */}
                    <div className="flex flex-col w-1/3 min-w-[250px]">
                        <label className="font-semibold mb-1 block">सवलत</label>
                        <input
                            type="number"
                            min="0"
                            placeholder="सवलत"
                            className={handleClass("discount")}
                            {...formik.getFieldProps("discount")}
                        />
                        {formik.touched.discount && formik.errors.discount && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.discount}</p>
                        )}
                    </div>

                    {/* अंतिम किंमत */}
                    <div className="flex flex-col w-1/3 min-w-[250px]">
                        <label className="font-semibold mb-1 block">अंतिम किंमत</label>
                        <input
                            type="number"
                            value={finalPrice}
                            readOnly
                            className="input input-bordered w-full bg-blue-100 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* आगाऊ रक्कम */}
                <div className="flex flex-col w-1/3 min-w-[250px]">
                    <label className="font-semibold mb-1 block">आगाऊ रक्कम</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="आगाऊ रक्कम"
                        className={handleClass("advancers")}
                        {...formik.getFieldProps("advancers")}
                    />
                    {formik.touched.advancers && formik.errors.advancers && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.advancers}</p>
                    )}
                </div>

                {/* शिल्लक रक्कम */}
                <div className="flex flex-col w-1/3 min-w-[250px]">
                    <label className="font-semibold mb-1 block">शिल्लक रक्कम</label>
                    <input
                        type="number"
                        value={balance}
                        readOnly
                        className="input input-bordered w-full bg-blue-100 cursor-not-allowed"
                    />
                </div>
            </div>
        </div>
    );
};

export default Calculationlogic;
