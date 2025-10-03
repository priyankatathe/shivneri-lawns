import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import clsx from "clsx";

const Calculationlogic = () => {
    const [totalPrice, setTotalPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [finalPrice, setFinalPrice] = useState(0);
    const [advancePayment, setAdvancePayment] = useState("");
    const [balance, setBalance] = useState(0);

    const formik = useFormik({
        initialValues: {
            totalRs: "",
            discount: "",
            finalPrice: 0,
            advancers: "",
            extraRs: "",
        },
        validationSchema: yup.object({
            totalRs: yup
                .number()
                .required("एकूण रक्कम आवश्यक आहे")
                .min(0, "0 पेक्षा जास्त रक्कम टाका"),
            discount: yup
                .number()
                .min(0, "0 पेक्षा जास्त रक्कम टाका")
                .max(
                    yup.ref("totalRs"),
                    "सवलत एकूण किंमतीपेक्षा जास्त असू शकत नाही"
                )
                .notRequired(),
            advancers: yup
                .number()
                .required("आगाऊ रक्कम आवश्यक आहे")
                .min(0, "0 पेक्षा जास्त रक्कम टाका")
                .max(
                    yup.ref("finalPrice"),
                    "आगाऊ रक्कम अंतिम किंमतीपेक्षा जास्त असू शकत नाही"
                ),
            extraRs: yup
                .number()
                .required("शिल्लक रक्कम आवश्यक आहे")
                .min(0, "0 पेक्षा जास्त रक्कम टाका"),
        }),
        onSubmit: (values, { resetForm }) => {
            setTotalPrice("");
            setDiscount("");
            setAdvancePayment("");
            resetForm();
        },
    });

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
        clsx("input input-bordered w-full bg-blue-50", {
            "border-red-500": formik.touched[field] && formik.errors[field],
            "border-green-500": formik.touched[field] && !formik.errors[field],
        });

    return (
        <div className=" w-[310%]">
            {/* 🔷 बदललेलं Title आणि Font */}
            <h2 className="text-3xl font-serif ml-96 mb-6 text-gray-800 ">
                गणना फॉर्म माहिती
            </h2>

            <form onSubmit={formik.handleSubmit} className="flex flex-wrap gap-4">
                {/* ✅ एकाच Row मध्ये 3 Inputs */}
                <div className="flex flex-row w-full gap-4">
                    <div className="flex flex-col w-1/3 min-w-[250px]">
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
                            <p className="text-red-600 text-sm mt-1">
                                {formik.errors.totalRs}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-1/3 min-w-[250px]">
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
                            <p className="text-red-600 text-sm mt-1">
                                {formik.errors.discount}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-1/3 min-w-[250px]">
                        <label className="font-semibold mb-1 block">अंतिम किंमत</label>
                        <input
                            type="number"
                            placeholder="अंतिम किंमत"
                            className="input input-bordered w-full bg-blue-100 cursor-not-allowed"
                            value={finalPrice}
                            readOnly
                        />
                    </div>
                </div>

                {/* बाकी form जसंचा तसाच ठेवला */}
                <div className="flex flex-col w-1/3 min-w-[250px]">
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
                        <p className="text-red-600 text-sm mt-1">
                            {formik.errors.advancers}
                        </p>
                    )}
                </div>

                <div className="flex flex-col w-1/3 min-w-[250px]">
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
