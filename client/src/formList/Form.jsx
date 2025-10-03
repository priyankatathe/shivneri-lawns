import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import clsx from "clsx";
import Catering from "./Catering";
import GetPackege from "./GetPackege";
import Calculationlogic from "./Calculationlogic";
import UserInfo from "./UserInfo";
import { useCreateBookingMutation } from "../redux/api/formApi";

const Form = () => {
    const [createBooking] = useCreateBookingMutation()
    const [totalPrice, setTotalPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [finalPrice, setFinalPrice] = useState(0);
    const [advancePayment, setAdvancePayment] = useState("");
    const [balance, setBalance] = useState(0);

    const validationSchema = yup.object({
        name: yup.string().required("ग्राहकाचे नाव आवश्यक आहे"),
        location: yup.string().required("ठिकाण निवडा"),
        eventType: yup.string().required("इव्हेंट प्रकार आवश्यक आहे"),
        startDate: yup.date().required("प्रारंभ तारीख आवश्यक आहे"),
        endDate: yup
            .date()
            .required("समाप्त तारीख आवश्यक आहे")
            .min(yup.ref("startDate"), "समाप्त तारीख प्रारंभ तारीखे नंतर असावी"),
        package: yup.string().required("पॅकेज निवडा"),
        chequeRequired: yup.string().required("चेक तपशील निवडा"),
        notes: yup.string().notRequired(),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            phone1: "",
            phone2: "",
            address: "",
            location: "",
            eventType: "",
            startDate: "",
            endDate: "",
            package: "",
            cateringRequired: false,
            cateringItems: [],
            gatePackageRequired: false,
            gatePackageItems: [],
            totalRs: 0,
            discount: 0,
            finalPrice: 0,
            advancePayment: 0,
            balance: 0,
            chequeRequired: "",
            notes: "",
            inquiryOnly: false,


        },

        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await createBooking(values).unwrap();
                toast.success("फॉर्म यशस्वीपणे सबमिट झाला!");
                console.log("Submitted values:", response);
                resetForm();
                setTotalPrice("");
                setDiscount("");
                setAdvancePayment("");
                setBalance("");
            } catch (error) {
                console.error("Form submit error:", error);
                toast.error(error?.data?.message || "फॉर्म सबमिट करताना त्रुटी आली!");
            }
        }


    });
    const handleInquiryClick = async () => {
        const inquiryData = {
            name: formik.values.name,
            phone1: formik.values.phone1,
            address: formik.values.address,
            inquiryOnly: true,
        };

        if (!inquiryData.name || !inquiryData.phone1 || !inquiryData.address) {
            toast.error("कृपया नाव, फोन नंबर आणि पत्ता भरा!");
            return;
        }

        try {
            const response = await createBooking(inquiryData).unwrap();
            toast.success("चौकशी यशस्वी झाली!");
            formik.resetForm();
        } catch (error) {
            toast.error(error?.data?.message || "चौकशी करताना त्रुटी आली!");
        }
    };


    const handleClass = (field) =>
        clsx("input input-bordered w-full bg-blue-50 focus:bg-white transition", {
            "border-red-500": formik.touched[field] && formik.errors[field],
            "border-green-500": formik.touched[field] && !formik.errors[field],
        });

    return (
        <div className="min-h-screen overflow-hidden bg-gray-100 flex items-center justify-center p-6">
            <div className="relative max-w-6xl w-full mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="mb-10 flex items-center justify-center gap-3">
                    <img
                        src="https://cdn-icons-png.freepik.com/512/2037/2037690.png"
                        alt="Event icon"
                        className="w-10 h-10 rounded-lg"
                    />
                    <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        इव्हेंट मॅनेजमेंट फॉर्म
                    </h2>
                </div>

                <form
                    onSubmit={formik.handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 text-gray-800"
                >

                    <UserInfo formik={formik} />



                    <div className="flex flex-row gap-6 lg:col-span-3">
                        {/* ठिकाण */}
                        <div className="flex flex-col w-1/3">
                            <label className="font-semibold mb-1">* ठिकाण निवडा</label>
                            <select
                                className={handleClass("location")}
                                {...formik.getFieldProps("location")}
                            >
                                <option value="">निवडा</option>
                                <option value="Lawn">Lawn</option>
                                <option value="Banquet">Banquet</option>
                                <option value="Both">Both</option>
                            </select>
                            {formik.touched.location && formik.errors.location && (
                                <p className="text-red-600 text-sm mt-1">
                                    {formik.errors.location}
                                </p>
                            )}
                        </div>

                        {/* इव्हेंट प्रकार */}
                        <div className="flex flex-col w-1/3">
                            <label className="font-semibold mb-1">* इव्हेंट प्रकार</label>
                            <select
                                className={handleClass("eventType")}
                                {...formik.getFieldProps("eventType")}
                            >
                                <option value="">निवडा</option>
                                <option value="Lawn">lagn</option>
                                <option value="Banquet">haldi</option>
                                <option value="Both">mehndi</option>
                            </select>
                            {formik.touched.eventType && formik.errors.eventType && (
                                <p className="text-red-600 text-sm mt-1">
                                    {formik.errors.eventType}
                                </p>
                            )}
                        </div>

                        {/* पॅकेज निवडा */}
                        <div className="flex flex-col w-1/3">
                            <label className="font-semibold mb-1">* पॅकेज निवडा</label>
                            <select
                                className={handleClass("package")}
                                {...formik.getFieldProps("package")}
                            >
                                <option value="">-- निवडा --</option>
                                <option value="Basic">Basic</option>
                                <option value="Standard">Standard</option>
                                <option value="Premium">Premium</option>
                            </select>
                            {formik.touched.package && formik.errors.package && (
                                <p className="text-red-600 text-sm mt-1">
                                    {formik.errors.package}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* प्रारंभ तारीख */}
                    <div>
                        <label className="font-semibold mb-1 block">* प्रारंभ तारीख</label>
                        <input
                            type="date"
                            className={handleClass("startDate")}
                            {...formik.getFieldProps("startDate")}
                        />
                        {formik.touched.startDate && formik.errors.startDate && (
                            <p className="text-red-600 text-sm mt-1">
                                {formik.errors.startDate}
                            </p>
                        )}
                    </div>

                    {/* समाप्त तारीख */}
                    <div>
                        <label className="font-semibold mb-1 block">* समाप्त तारीख</label>
                        <input
                            type="date"
                            className={handleClass("endDate")}
                            {...formik.getFieldProps("endDate")}
                        />
                        {formik.touched.endDate && formik.errors.endDate && (
                            <p className="text-red-600 text-sm mt-1">
                                {formik.errors.endDate}
                            </p>
                        )}
                    </div>



                    {/* Catering, GetPackege */}
                    <div>
                        <Catering formik={formik} />
                    </div>
                    <div>
                        <GetPackege formik={formik} />
                    </div>

                    {/* चेक तपशील */}
                    <div className="lg:col-span-3">
                        <label className="font-semibold block mb-2">
                            चेक तपशील आवश्यक आहे का?
                        </label>
                        <div className="flex gap-8">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="chequeRequired"
                                    value="होय"
                                    onChange={formik.handleChange}
                                    checked={formik.values.chequeRequired === "होय"}
                                    className="radio radio-primary"
                                />
                                होय
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="chequeRequired"
                                    value="नाही"
                                    onChange={formik.handleChange}
                                    checked={formik.values.chequeRequired === "नाही"}
                                    className="radio radio-primary"
                                />
                                नाही
                            </label>
                        </div>
                        {formik.touched.chequeRequired && formik.errors.chequeRequired && (
                            <p className="text-red-600 text-sm mt-1">
                                {formik.errors.chequeRequired}
                            </p>
                        )}
                    </div>

                    {/* Calculation logic */}
                    {/* <div className="lg:col-span-3"> */}
                    <Calculationlogic formik={formik} />
                    {/* </div> */}

                    {/* नोट्स */}
                    <div className="lg:col-span-3">
                        <label className="font-semibold mb-1 block">नोट्स</label>
                        <textarea
                            rows={3}
                            placeholder="तुमचे नोट्स येथे लिहा"
                            className={handleClass("notes")}
                            {...formik.getFieldProps("notes")}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="lg:col-span-3 flex flex-col md:flex-row justify-end gap-4 pt-6">
                        {/* <button type="button" onClick={handleInquirySubmit}>फक्त चौकशी साठी</button> */}
                        <button
                            onClick={handleInquiryClick}
                            type="button"
                            className="btn btn-info btn-wide shadow hover:brightness-110 transition"
                        >
                            फक्त चौकशी साठी
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary btn-wide shadow hover:scale-105 transition"
                        >
                            सबमिट करा
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
