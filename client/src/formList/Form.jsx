import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import clsx from "clsx";
import Catering from "./Catering";
import GetPackege from "./GetPackege";
import Calculationlogic from "./Calculationlogic";
import UserInfo from "./UserInfo";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCreateBookingMutation, useDeleteBookingMutation, useUpdateBookingMutation } from "../redux/api/formApi";

const Form = () => {
    const [deleteBooking, { isSuccess, isError, error }] = useDeleteBookingMutation()
    const [createBooking] = useCreateBookingMutation();
    const [updateBooking] = useUpdateBookingMutation()
    const location = useLocation();
    const editingData = location.state?.booking || null;

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);


    const formik = useFormik({
        initialValues: {
            bankName: "",
            chequeNumber: "",
            notes: "",
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
            catering: "",
            cateringItems: [
                { name: "पाणी", quantity: 1 },
                { name: "भाजी", quantity: 1 },
                { name: "पोळी", quantity: 1 },
                { name: "लिंबू सरबत", quantity: 1 },
                { name: "समोसा", quantity: 1 },
                { name: "चहा", quantity: 1 },
                { name: "कढीपत्ता", quantity: 1 },
            ],
            gatePackageRequired: false,
            gatePackageItems: [
                { name: "तुतारी", quantity: 1 },
                { name: "भालदार", quantity: 1 },
                { name: "फुलांची कमान", quantity: 1 },
            ],
            totalRs: "",
            discount: 0,
            finalPrice: "",
            advancePayment: "",
            balance: 0,
            chequeRequired: "",
            notes: "",
            inquiryOnly: false,
        },
        validationSchema: yup.object({
            bankName: yup.string().test(
                "bankName-required",
                "बँकेचे नाव आवश्यक आहे",
                (value, context) => context.parent.chequeRequired === "होय" ? !!value : true
            ),

            chequeNumber: yup.string().test(
                "chequeNumber-required",
                "चेक क्रमांक आवश्यक आहे",
                (value, context) => context.parent.chequeRequired === "होय" ? !!value : true
            ),
            gatePackage: yup.string().required("कृपया गेट पॅकेज निवडा"),
            catering: yup.string().required("कृपया कॅटरिंग निवडा"),
            totalRs: yup.number().required("एकूण रक्कम आवश्यक आहे"),
            discount: yup.number().required("सवलत आवश्यक आहे"),
            finalPrice: yup.number().required("अंतिम किंमत आवश्यक आहे"),
            advancePayment: yup.number().required("अॅडव्हान्स रक्कम आवश्यक आहे"),
            balance: yup.number().required("बाकी रक्कम आवश्यक आहे"),
            name: yup.string().required("ग्राहकाचे नाव आवश्यक आहे"),
            phone1: yup.string().required("फोन नंबर आवश्यक आहे"),
            address: yup.string().required("पत्ता आवश्यक आहे"),
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
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log("Submitting chequeRequired:", values.chequeRequired);
            const cleanCateringItems = Array.isArray(values.cateringItems)
                ? values.cateringItems.filter((item) => item.name && item.quantity != null)
                : [];

            const cleanGatePackageItems = Array.isArray(values.gatePackageItems)
                ? values.gatePackageItems.filter((item) => item.name && item.quantity != null)
                : [];

            const cateringRequired = cleanCateringItems.length > 0;
            const gatePackageRequired = cleanGatePackageItems.length > 0;

            const payload = {
                ...values,
                cateringItems: cleanCateringItems,
                gatePackageItems: cleanGatePackageItems,
                cateringRequired,
                gatePackageRequired,
            };

            try {
                if (isEditing && editingId) {
                    console.log("⏫ Updating booking with ID:", editingId);
                    await updateBooking({ ...payload, _id: editingId }).unwrap()

                    toast.success("Booking updated successfully!");
                } else {
                    console.log("🆕 Creating new booking");
                    await createBooking(payload).unwrap();
                    toast.success("Booking created successfully!");
                }


                resetForm();
                setIsEditing(false);
                setEditingId(null);
            } catch (error) {
                console.error("❌ Update failed:", error);
                toast.error(error?.data?.message || "Booking operation failed!");
            }
        }
    })



    useEffect(() => {
        if (editingData) {
            const { _id, startDate, endDate, ...rest } = editingData;

            formik.resetForm({
                values: {
                    ...formik.initialValues,
                    ...rest,
                    startDate: startDate ? startDate.slice(0, 10) : "",
                    endDate: endDate ? endDate.slice(0, 10) : "",
                    chequeRequired: rest.chequeRequired || "",
                    bankName: rest.bankName || "",
                    chequeNumber: rest.chequeNumber || "",
                    cateringItems: rest.cateringItems || formik.initialValues.cateringItems,
                    gatePackageItems: rest.gatePackageItems || formik.initialValues.gatePackageItems,
                    cateringRequired: rest.cateringRequired ?? false,
                    gatePackageRequired: rest.gatePackageRequired ?? false,
                    inquiryOnly: rest.inquiryOnly ?? false,
                },
            });

            setIsEditing(true);
            setEditingId(_id);
        }
    }, [editingData]);


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
            await createBooking(inquiryData).unwrap();
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


        <div className="min-h-screen mt-15 overflow-hidden bg-gray-100 flex items-center justify-center p-4 sm:p-6 ">

            <div className="relative max-w-6xl mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="mb-10 flex items-center justify-center gap-3 flex-wrap text-center">
                    <img
                        src="https://cdn-icons-png.freepik.com/512/2037/2037690.png"
                        alt="Event icon"
                        className="w-10 h-10 rounded-lg"
                    />
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">
                        इव्हेंट मॅनेजमेंट फॉर्म
                    </h2>
                </div>

                <form
                    onSubmit={formik.handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 text-gray-800"
                >


                    <UserInfo formik={formik} />
                    <div className="grid lg:mt-0   md:mt-80 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  overflow-hidden lg:col-span-3">
                    </div>

                    {/* प्रारंभ आणि समाप्त तारीख */}
                    <div>
                        <label className="font-semibold mb-1 block">* पॅकेज निवडा</label>
                        <select className={handleClass("package")} {...formik.getFieldProps("package")}>
                            <option value="">-- निवडा --</option>
                            <option value="Basic">Basic</option>
                            <option value="Standard">Standard</option>
                            <option value="Premium">Premium</option>
                        </select>
                        {formik.touched.package && formik.errors.package && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.package}</p>
                        )}
                    </div>
                    <div>
                        <label className="font-semibold mb-1 block">* इव्हेंट प्रकार</label>
                        <select className={handleClass("eventType")} {...formik.getFieldProps("eventType")}>
                            <option value="">निवडा</option>
                            <option value="Lagn">लग्न</option>
                            <option value="Haldi">हल्दी</option>
                            <option value="Mehndi">मेहंदी</option>
                        </select>
                        {formik.touched.eventType && formik.errors.eventType && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.eventType}</p>
                        )}
                    </div>
                    <div>
                        <label className="font-semibold mb-1">* ठिकाण निवडा</label>
                        <select className={handleClass("location")} {...formik.getFieldProps("location")}>
                            <option value="">निवडा</option>
                            <option value="Lawn">Lawn</option>
                            <option value="Banquet">Banquet</option>
                            <option value="Both">Both</option>
                        </select>
                        {formik.touched.location && formik.errors.location && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.location}</p>
                        )}
                    </div>
                    <div>
                        <label className="font-semibold mb-1 block">* प्रारंभ तारीख</label>
                        <input type="date" className={handleClass("startDate")} {...formik.getFieldProps("startDate")} />
                        {formik.touched.startDate && formik.errors.startDate && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.startDate}</p>
                        )}
                    </div>

                    <div>
                        <label className="font-semibold mb-1 block">* समाप्त तारीख</label>
                        <input type="date" className={handleClass("endDate")} {...formik.getFieldProps("endDate")} />
                        {formik.touched.endDate && formik.errors.endDate && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.endDate}</p>
                        )}
                    </div>

                    {/* Catering, GetPackege */}
                    <div>
                        <Catering formik={formik} />
                    </div>
                    {/* Catering, GetPackege, Calculationlogic */}


                    <div className="md:col-span-2 lg:col-span-3 space-y-8">
                        {/* ✅ गेट पॅकेज */}
                        <GetPackege formik={formik} />

                        {/* ✅ गेट पॅकेजच्या खाली लगेच गणना */}
                        <Calculationlogic formik={formik} />
                    </div>
                    <div className="lg:col-span-3 lg:w-[100%] md:w-[207%] mt-7">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* ✅ चेक तपशील आवश्यक आहे का? */}
                            <div>
                                <h2 className="font-semibold mb-3">चेक तपशील आवश्यक आहे का?</h2>
                                <div className="flex gap-5">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="chequeRequired"
                                            value="होय"
                                            onChange={formik.handleChange}
                                            checked={formik.values.chequeRequired === "होय"}
                                        />
                                        होय
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="chequeRequired"
                                            value="नाही"
                                            onChange={formik.handleChange}
                                            checked={formik.values.chequeRequired === "नाही"}
                                        />
                                        नाही
                                    </label>
                                </div>

                                {formik.touched.chequeRequired && formik.errors.chequeRequired && (
                                    <p className="text-red-600 text-sm mt-2">
                                        {formik.errors.chequeRequired}
                                    </p>
                                )}
                            </div>

                            {/* ✅ फक्त 'होय' निवडल्यावर खालील फील्ड्स दिसतील */}
                            {formik.values.chequeRequired === "होय" && (
                                <>
                                    {/* बँकेचे नाव */}
                                    <div>
                                        <label className="font-semibold mb-1 block">* बँकेचे नाव</label>
                                        <input
                                            type="text"
                                            name="bankName"
                                            placeholder="बँकेचे नाव"
                                            className={handleClass("bankName")}
                                            {...formik.getFieldProps("bankName")}
                                        />
                                        {formik.touched.bankName && formik.errors.bankName && (
                                            <p className="text-red-600 text-sm mt-1">{formik.errors.bankName}</p>
                                        )}
                                    </div>

                                    {/* चेक क्रमांक */}
                                    <div>
                                        <label className="font-semibold mb-1 block">* चेक क्रमांक</label>
                                        <input
                                            type="text"
                                            name="chequeNumber"
                                            placeholder="चेक क्रमांक"
                                            className={handleClass("chequeNumber")}
                                            {...formik.getFieldProps("chequeNumber")}
                                        />
                                        {formik.touched.chequeNumber && formik.errors.chequeNumber && (
                                            <p className="text-red-600 text-sm mt-1">
                                                {formik.errors.chequeNumber}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* ✅ नोट्स फील्ड नेहमी दिसेल */}

                        </div>
                        <div className="md:col-span-2 lg:mt-11 md:mt-7  lg:w-[100%] lg:col-span-1">
                            <label className="font-semibold mb-1 block">नोट्स</label>
                            <textarea
                                name="notes"
                                placeholder="तुमचे नोट्स येथे लिहा"
                                className={handleClass("notes")}
                                {...formik.getFieldProps("notes")}
                            />
                        </div>
                    </div>


                    <div className="lg:col-span-3 md:mt-80 lg:mt-0  md:mr-48 flex flex-col  md:flex-row md:justify-items-center justify-between gap-4 pt-6">
                        <button
                            onClick={handleInquiryClick}
                            type="button"
                            className="btn btn-info btn-wide shadow hover:brightness-110 transition"
                        >
                            फक्त चौकशी साठी
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary btn-wide  shadow hover:scale-105 transition"
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
