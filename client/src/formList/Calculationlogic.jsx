import React, { useEffect, useState } from "react";
import clsx from "clsx";

const Calculationlogic = ({ formik }) => {
    const [totalPrice, setTotalPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [finalPrice, setFinalPrice] = useState(0);
    const [advancePayment, setAdvancePayment] = useState("");
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const total = parseFloat(totalPrice) || 0;
        const disc = parseFloat(discount) || 0;
        let final = total - disc;
        if (final < 0) final = 0;
        setFinalPrice(final);
        formik.setFieldValue("finalPrice", final, false);
    }, [totalPrice, discount]);

    useEffect(() => {
        const advance = parseFloat(advancePayment) || 0;
        let bal = finalPrice - advance;
        if (bal < 0) bal = 0;
        setBalance(bal);
        formik.setFieldValue("extraRs", bal, false);
    }, [finalPrice, advancePayment]);

    const handleClass = (field) =>
        clsx("input input-bordered w-full bg-blue-50 focus:bg-white transition", {
            "border-red-500": formik.touched[field] && formik.errors[field],
            "border-green-500": formik.touched[field] && !formik.errors[field],
        });

    return (
        <div className="overflow-hidden lg:w-[310%]">
            <h2 className="text-3xl font-serif mb-6 text-gray-800 ml-0 lg:ml-96">
                गणना फॉर्म माहिती
            </h2>

            <form
                onSubmit={formik.handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 text-gray-800"
            >
                {/* Inputs: totalPrice, discount, finalPrice */}
                <div className="flex flex-col">
                    <label className="font-semibold mb-1 block">एकूण किंमत</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="एकूण किंमत"
                        className={handleClass("totalRs")}
                        value={totalPrice}
                        onChange={(e) => {
                            setTotalPrice(e.target.value);
                            formik.setFieldValue("totalRs", e.target.value);
                        }}
                    />
                    {formik.touched.totalRs && formik.errors.totalRs && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.totalRs}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold mb-1 block">सवलत</label>
                    <input
                        type="number"
                        min="0"
                        max={totalPrice || undefined}
                        placeholder="सवलत"
                        className={handleClass("discount")}
                        value={discount}
                        onChange={(e) => {
                            setDiscount(e.target.value);
                            formik.setFieldValue("discount", e.target.value);
                        }}
                    />
                    {formik.touched.discount && formik.errors.discount && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.discount}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold mb-1 block">अंतिम किंमत</label>
                    <input
                        type="number"
                        placeholder="अंतिम किंमत"
                        className="input input-bordered w-full bg-blue-100 cursor-not-allowed"
                        value={finalPrice}
                        readOnly
                    />
                </div>

                {/* Inputs: advancePayment, balance */}
                <div className="flex flex-col">
                    <label className="font-semibold mb-1 block">आगाऊ रक्कम</label>
                    <input
                        type="number"
                        min="0"
                        max={finalPrice || undefined}
                        placeholder="आगाऊ रक्कम"
                        className={handleClass("advancers")}
                        value={advancePayment}
                        onChange={(e) => {
                            setAdvancePayment(e.target.value);
                            formik.setFieldValue("advancers", e.target.value);
                        }}
                    />
                    {formik.touched.advancers && formik.errors.advancers && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.advancers}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold mb-1 block">शिल्लक रक्कम</label>
                    <input
                        type="number"
                        placeholder="शिल्लक रक्कम"
                        className="input input-bordered w-full bg-blue-100 cursor-not-allowed"
                        value={balance}
                        readOnly
                    />
                </div>
            </form>
        </div>
    );
};

export default Calculationlogic;

