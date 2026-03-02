import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roleRequired }) => {

    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (roleRequired && role !== roleRequired) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;