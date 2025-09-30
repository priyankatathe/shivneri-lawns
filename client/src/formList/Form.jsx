import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { toast } from 'react-toastify';
import clsx from "clsx";
import GetPackege from './GetPackege';
import Catering from './Catering';

const Form = () => {
    const [totalPrice, setTotalPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [finalPrice, setFinalPrice] = useState(0);
    const [advancePayment, setAdvancePayment] = useState('');
    const [balance, setBalance] = useState(0);
    // const [cateringOption, setCateringOption] = useState('');
    // const [cateringItems, setCateringItems] = useState(['पुलाव', 'भाजी', 'चपाती']);
    const [getPackege, setGetPackege] = useState('');
    const [getPackegeItems, setgetPackegeItems] = useState(['तुतारी,भालदार,चोपदार / द्वाऱ,छत्री']);


    const formik = useFormik({
        initialValues: {
            name: "",
            location: "",
            eventType: "",
            phone1: "",
            phone2: "",
            address: "",
            startDate: "",
            endDate: "",
            package: "",
            totalRs: "",
            gatePackage: "",
            notes: "",
            chequeRequired: "",
        },

        validationSchema: yup.object({
            name: yup.string().required("ग्राहकाचे नाव आवश्यक आहे"),
            location: yup.string().required("ठिकाण निवडा"),
            phone1: yup.string().required("फोन नंबर आवश्यक आहे").matches(/^\d{10}$/, "10 अंकी नंबर टाका"),
            address: yup.string().required("पत्ता आवश्यक आहे"),
            startDate: yup.date().required("प्रारंभ तारीख आवश्यक आहे"),
            endDate: yup.date().required("समाप्त तारीख आवश्यक आहे"),
            totalRs: yup.date().required("totalRs"),
            package: yup.string().required("पॅकेज निवडा"),
            eventType: yup.string().required("इव्हेंट प्रकार आवश्यक आहे"),
        }),

        onSubmit: (values, { resetForm }) => {
            toast.success("फॉर्म सबमिट झाला!");
            console.log("Submitted values:", values);
            resetForm();
        }
    });

    const handleClass = (arg) => clsx(
        "input input-bordered w-full bg-blue-50", {
        "border-red-500": formik.touched[arg] && formik.errors[arg],
        "border-green-500": formik.touched[arg] && !formik.errors[arg],
    })
    useEffect(() => {
        const total = parseFloat(totalPrice) || 0;
        const disc = parseFloat(discount) || 0;
        const final = total - disc;
        setFinalPrice(final >= 0 ? final : 0);
    }, [totalPrice, discount]);

    // Update balance whenever finalPrice or advancePayment changes
    useEffect(() => {
        const advance = parseFloat(advancePayment) || 0;
        const bal = finalPrice - advance;
        setBalance(bal >= 0 ? bal : 0);
    }, [finalPrice, advancePayment]);





    return <>

        <pre>{JSON.stringify(formik.touched, null, 2)}</pre>
        <pre>{JSON.stringify(formik.errors, null, 2)}</pre>

        <div className="min-h-screen bg-gray-50  flex items-center justify-center p-4">
            <div className="relative max-w-6xl w-full mx-auto p-6 sm:p-8 bg-white/90 rounded-2xl shadow-2xl border border-blue-200">

                <div className="relative z-10">
                    <div className="mb-14 flex items-center ml-96  gap-3">
                        <img src="https://cdn-icons-png.freepik.com/512/2037/2037690.png" alt="Event icon" className="w-10 h-10 rounded-lg mt-3" />
                        <h2 className="text-2xl font-extrabold text-black tracking-tight">इव्हेंट मॅनेजमेंट फॉर्म !!</h2>

                    </div>
                    <form onSubmit={formik.handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
                        <div >
                            <label className="font-semibold">* ठिकाण निवडा</label>
                            <select className={handleClass("location")}
                                {...formik.getFieldProps("location")}
                            >
                                <option value="">निवडा</option>
                                <option>Lawn</option>
                                <option>Banquet</option>
                                <option>Both</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm  font-medium text-gray-700">इव्हेंट प्रकार</label>
                            <input
                                className={handleClass("eventType")}
                                {...formik.getFieldProps("eventType")}
                                type="text"
                                // className="input input-bordered w-full"
                                placeholder="eventType "
                                required
                            />
                        </div>
                        {/* 2 */}
                        {/* <div className="form-group">
                            <label className="font-semibold">इव्हेंट प्रकार</label>
                            <input type="text" placeholder="उदा. लग्न, वाढदिवस"
                                className={handleClass("eventType")}
                                {...formik.getFieldProps("eventType")}

                            />
                        </div> */}

                        {/* 3 */}
                        <div className="form-group">
                            <label className="font-semibold">ग्राहकाचे नाव</label>
                            <input
                                className={handleClass("name")}
                                {...formik.getFieldProps("name")}
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                // className={`input input-bordered w-full bg-blue-50 ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
                                placeholder="ग्राहकाचे नाव"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-sm">{formik.errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="font-semibold">* ग्राहकाचा फोन नंबर 1</label>
                            <input
                                className={handleClass("phone1")}
                                {...formik.getFieldProps("phone1")}
                                type="tel" placeholder="ग्राहकाचा फोन नंबर 1"
                            // className="input input-bordered w-full bg-blue-50" 
                            />
                        </div>

                        {/* 5 */}
                        <div className="form-group">
                            <label className="font-semibold">ग्राहकाचा फोन नंबर 2</label>
                            <input
                                className={handleClass("phone2")}
                                {...formik.getFieldProps("phone2")}
                                type="tel" placeholder="ग्राहकाचा फोन नंबर 2"
                            // className="input input-bordered w-full bg-blue-50" 
                            />
                        </div>

                        {/* 6 */}
                        <div className="form-group">
                            <label className="font-semibold">* ग्राहकाचा पत्ता</label>
                            <textarea
                                {...formik.getFieldProps("address")}
                                rows="2" placeholder="ग्राहकाचा पत्ता" className="textarea textarea-bordered w-full bg-blue-50" />
                        </div>

                        {/* 7 */}
                        <div className="form-group">
                            <label className="font-semibold">* प्रारंभ तारीख</label>
                            <input
                                className={handleClass("startDate")}
                                {...formik.getFieldProps("startDate")}
                                type="date" placeholder="प्रारंभ तारीख"
                            // className="input input-bordered w-full bg-blue-50" 

                            />
                            {/* <input type="date" className="input input-bordered w-full bg-blue-50" /> */}
                        </div>

                        {/* 8 */}
                        <div className="form-group">
                            <label className="font-semibold">* समाप्त तारीख</label>
                            <input
                                className={handleClass("endDate")}
                                {...formik.getFieldProps("endDate")}

                                type="date" placeholder="समाप्त तारीख"
                            // className="input input-bordered w-full bg-blue-50" 
                            />
                        </div>

                        {/* 9 */}
                        <div className="form-group">
                            <label className="font-semibold">* पॅकेज निवडा</label>
                            <select
                                className={handleClass("package")}
                                {...formik.getFieldProps("package")}
                            // className="select select-bordered w-full bg-blue-50"
                            >
                                <option>Basic</option>
                                <option>Standard</option>
                                <option>Premium</option>
                            </select>
                        </div>

                        {/* 10 */}
                        {/* <div className="form-group">
                            <label className="font-semibold">कॅटरिंग पर्याय</label>
                            <input type="text" className="input input-bordered w-full bg-blue-50" />
                        </div> */}



                        <Catering />
                        <GetPackege />

                        <div className="form-group">
                            <label className="font-semibold">एकूण किंमत</label>
                            <input
                                className={handleClass("package")}
                                // {...formik.getFieldProps("package")}
                                type="number"
                                placeholder="एकूण किंमत"
                                value={totalPrice}
                                onChange={(e) => setTotalPrice(e.target.value)}
                            />
                        </div>

                        {/* सवलत */}
                        <div className="form-group">
                            <label className="font-semibold">सवलत</label>
                            <input
                                className={handleClass("package")}
                                // {...formik.getFieldProps("package")}
                                type="number"
                                placeholder="सवलत"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            // className="input input-bordered w-full bg-blue-50"
                            />
                        </div>

                        {/* अंतिम किंमत (calculated, readonly) */}
                        <div className="form-group">
                            <label className="font-semibold">अंतिम किंमत</label>
                            <input
                                className={handleClass("package")}
                                // {...formik.getFieldProps("package")}
                                type="number"
                                placeholder="अंतिम किंमत"
                                value={finalPrice}
                                readOnly
                            // className="input input-bordered w-full bg-blue-100 cursor-not-allowed"
                            />
                        </div>

                        {/* आगाऊ रक्कम */}
                        <div className="form-group">
                            <label className="font-semibold">आगाऊ रक्कम</label>
                            <input
                                className={handleClass("package")}
                                // {...formik.getFieldProps("package")}
                                type="number"
                                placeholder="आगाऊ रक्कम"
                                value={advancePayment}
                                onChange={(e) => setAdvancePayment(e.target.value)}
                            // className="input input-bordered w-full bg-blue-50"
                            />
                        </div>

                        {/* 16 */}
                        <div className="form-group">
                            <label className="font-semibold">शिल्लक रक्कम</label>
                            <input
                                className={handleClass("package")}
                                {...formik.getFieldProps("package")}
                                type="number"
                                placeholder="शिल्लक रक्कम"
                                value={balance}
                                readOnly
                            // className="input input-bordered w-full bg-blue-100 cursor-not-allowed"
                            />
                        </div>
                        {/* Radio */}
                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="font-semibold">चेक तपशील आवश्यक आहे का?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="cheque" className="radio radio-primary" />
                                    <span>होय</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="cheque" className="radio radio-primary" />
                                    <span>नाही</span>
                                </label>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="font-semibold">नोट्स</label>
                            <textarea className="textarea textarea-bordered w-full bg-blue-50" rows="3" />
                        </div>

                        {/* Action Buttons */}
                        <div className="md:col-span-2 lg:col-span-3 flex flex-col md:flex-row justify-end gap-4 pt-4">
                            <button type="button" className="btn btn-info btn-wide shadow-md hover:brightness-110 transition">
                                फक्त चौकशी साठी
                            </button>
                            <button type="submit" className="btn btn-primary btn-wide shadow-md hover:scale-105 transition">
                                सबमिट करा
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
};

export default Form;
