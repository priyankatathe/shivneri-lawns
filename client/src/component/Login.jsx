import React, { useEffect } from "react";
import backgroundImg from "../assets/3.jpg";
import { useNavigate } from "react-router-dom";
import { useLoginAdminMutation } from "../redux/api/authApi";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import clsx from "clsx";

const Login = () => {
    const navigate = useNavigate();
    const [adminLogin, { isSuccess, isError, isLoading, error }] =
        useLoginAdminMutation();

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email").required("Enter email"),
            password: yup.string().required("Enter password"),
        }),
        onSubmit: async (values, { setErrors }) => {
            const res = await adminLogin(values);
            // अगर server-side error आए तो Formik errors में set करें
            if (res.error) {
                const msg = res.error.data?.message || "Login failed!";
                if (msg.toLowerCase().includes("email")) {
                    setErrors({ email: msg });
                } else if (msg.toLowerCase().includes("password")) {
                    setErrors({ password: msg });
                } else {
                    toast.error(msg);
                }
            }
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin Login Successfully ✅");
            navigate("/");
        }
    }, [isSuccess, navigate]);

    const handleClass = (key) =>
        clsx(
            "w-full bg-slate-100 placeholder-slate-400 rounded py-3 px-5 focus:outline-none focus:ring-2 focus:ring-green-300 transition",
            formik.touched[key] && formik.errors[key] && "border border-red-500",
            formik.touched[key] && !formik.errors[key] && "border border-green-500"
        );

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <img
                src={backgroundImg}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover filter blur-xs"
            />

            <div className="relative bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6"> लॉगिन</h2>
                <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
                    <div>
                        <label className="block mb-1 font-semibold">ईमेल</label>
                        <input
                            type="email"
                            {...formik.getFieldProps("email")}
                            className={handleClass("email")}
                            placeholder="आपला ईमेल टाका"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">पासवर्ड</label>
                        <input
                            type="password"
                            placeholder="पासवर्ड"
                            {...formik.getFieldProps("password")}
                            className={handleClass("password")}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "लॉगिन होत आहे..." : "लॉगिन"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    पासवर्ड विसरलात?{" "}
                    <a href="#" className="text-orange-500">
                        रिसेट करा
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
