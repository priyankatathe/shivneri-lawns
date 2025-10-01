import React from "react";
import { useSelector } from "react-redux";
import Login from "../component/Login";

const AdminProtector = ({ compo }) => {
    const { admin } = useSelector((state) => state.auth);

    return (
        <div>
            {admin ? (
                <>{compo}</>
            ) : (
                // ✅ Directly login form dikhao, dusri screen pe navigate nahi karega
                <Login />
            )}
        </div>
    );
};

export default AdminProtector;
