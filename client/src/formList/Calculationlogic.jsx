import React, { useEffect } from "react";
import clsx from "clsx";

const Calculationlogic = ({ formik }) => {
    const handleClass = (field) =>
        clsx("input input-bordered w-full bg-blue-50 focus:bg-white transition", {
            "border-red-500": formik.touched[field] && formik.errors[field],
            "border-green-500": formik.touched[field] && !formik.errors[field],
        });

    // finalPrice गणना
    useEffect(() => {
        const total = parseFloat(formik.values.totalRs) || 0;
        const disc = parseFloat(formik.values.discount) || 0;
        let final = total - disc;
        if (final < 0) final = 0;
        formik.setFieldValue("finalPrice", final, false);
    }, [formik.values.totalRs, formik.values.discount]);


    useEffect(() => {
        const final = parseFloat(formik.values.finalPrice) || 0;
        const advance = parseFloat(formik.values.advancePayment) || 0;
        let bal = final - advance;
        if (bal < 0) bal = 0;
        formik.setFieldValue("balance", bal, false);
    }, [formik.values.finalPrice, formik.values.advancePayment]);

    return (
        <div className="flex w-full">
            <div className="w-full">
                <h2 className="text-xl font-serif mb-6 text-gray-800 text-center lg:text-left lg:ml-[45%]">
                    गणना फॉर्म माहिती
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 text-gray-800">
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1 block">एकूण किंमत</label>
                        <input
                            type="number"
                            min="0"
                            placeholder="एकूण किंमत"
                            className={handleClass("totalRs")}
                            {...formik.getFieldProps("totalRs")}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold mb-1 block">सवलत</label>
                        <input
                            type="number"
                            min="0"
                            max={formik.values.totalRs || undefined}
                            placeholder="सवलत"
                            className={handleClass("discount")}
                            {...formik.getFieldProps("discount")}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold mb-1 block">अंतिम किंमत</label>
                        <input
                            type="number"
                            placeholder="अंतिम किंमत"
                            className="input input-bordered w-full bg-blue-100 cursor-not-allowed"
                            value={formik.values.finalPrice}
                            readOnly
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold mb-1 block">अडव्हान्स रक्कम</label>
                        <input
                            type="number"
                            min="0"
                            max={formik.values.finalPrice || undefined}
                            placeholder="आगाऊ रक्कम"
                            className={handleClass("advancePayment")}
                            {...formik.getFieldProps("advancePayment")}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold mb-1 block">शिल्लक रक्कम</label>
                        <input
                            type="number"
                            placeholder="शिल्लक रक्कम"
                            className="input input-bordered w-full bg-blue-100 cursor-not-allowed"
                            value={formik.values.balance}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculationlogic;
