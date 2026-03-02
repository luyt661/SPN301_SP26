import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setEmailError("");
        setPasswordError("");
        let hasError = false;
        if (!email) {
            setEmailError("Vui lòng nhập email");
            hasError = true;
        }
        if (!password) {
            setPasswordError("Vui lòng nhập mật khẩu");
            hasError = true;
        }
        if (hasError) return;
        setLoading(true);
        try {
            const { data } = await api.post("/auth/login", { email, password });
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("role", data.role);
            if (data.role === "STAFF") {
                localStorage.setItem("staffId", data.staffId || "");
                navigate("/staff/rooms");
            } else {
                localStorage.setItem("customerId", data.customerId || "");
                navigate("/customer/rooms");
            }
        } catch (err) {
            setError("Sai tài khoản hoặc mật khẩu!");
        }
        setLoading(false);
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
            <div style={{ width: 380, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #eee', padding: 32 }}>
                <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>Đăng nhập hệ thống</h2>
                <form onSubmit={handleLogin}>
                    <input
                        className="form-control mb-1"
                        style={{ height: 44, fontSize: 16, borderRadius: 8 }}
                        placeholder="Email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                            if (emailError && e.target.value) setEmailError("");
                        }}
                        required
                        disabled={loading}
                    />
                    {emailError && <div style={{ color: 'red', marginBottom: 8, marginLeft: 2, fontSize: 15 }}>{emailError}</div>}
                    <input
                        type="password"
                        className="form-control mb-1"
                        style={{ height: 44, fontSize: 16, borderRadius: 8 }}
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            if (passwordError && e.target.value) setPasswordError("");
                        }}
                        required
                        disabled={loading}
                    />
                    {passwordError && <div style={{ color: 'red', marginBottom: 8, marginLeft: 2, fontSize: 15 }}>{passwordError}</div>}
                    {error && <div style={{ color: 'red', marginBottom: 12, textAlign: 'left', fontSize: 15 }}>{error}</div>}
                    <button
                        className="btn btn-primary w-100"
                        style={{ height: 44, fontSize: 18, borderRadius: 8, marginBottom: 12 }}
                        disabled={loading}
                    >{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
                </form>
                <button
                    className="btn btn-outline-success w-100"
                    style={{ height: 44, fontSize: 18, borderRadius: 8 }}
                    onClick={handleRegister}
                    disabled={loading}
                >Đăng ký tài khoản</button>
            </div>
        </div>
    );
};

export default Login;