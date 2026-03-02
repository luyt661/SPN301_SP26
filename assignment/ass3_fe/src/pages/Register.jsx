import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        customerFullName: '',
        emailAddress: '',
        telephone: '',
        customerBirthDay: '',
        password: ''
    });
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [inputError, setInputError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === "customerFullName" && nameError && e.target.value) setNameError("");
        if (e.target.name === "emailAddress" && emailError && e.target.value) setEmailError("");
        if (e.target.name === "password" && passwordError && e.target.value) setPasswordError("");
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setNameError("");
        setEmailError("");
        setPasswordError("");
        setInputError("");
        const { customerFullName, emailAddress, password } = formData;
        let hasError = false;
        if (!customerFullName) {
            setNameError("Vui lòng nhập họ tên");
            hasError = true;
        }
        if (!emailAddress) {
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
            await api.post('/auth/register', formData);
            setInputError("");
            setTimeout(() => {
                setInputError("");
                navigate('/');
            }, 1200);
            setInputError('Đăng ký thành công! Mời bạn đăng nhập.');
        } catch (error) {
            setInputError('Lỗi đăng ký! Vui lòng kiểm tra lại thông tin hoặc Email đã tồn tại.');
        }
        setLoading(false);
    };

    const inputStyle = { width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' };
    const btnStyle = { width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
            <form onSubmit={handleRegister} style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '380px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Tạo tài khoản</h2>
                <label style={{ fontSize: '12px', color: '#666' }}>Họ và tên</label>
                <input name="customerFullName" placeholder="Nguyễn Văn A" style={inputStyle} onChange={handleChange} required disabled={loading} />
                {nameError && <div style={{ color: 'red', marginBottom: 8, marginLeft: 2, fontSize: 15 }}>{nameError}</div>}
                <label style={{ fontSize: '12px', color: '#666' }}>Email</label>
                <input name="emailAddress" type="email" placeholder="example@gmail.com" style={inputStyle} onChange={handleChange} required disabled={loading} />
                {emailError && <div style={{ color: 'red', marginBottom: 8, marginLeft: 2, fontSize: 15 }}>{emailError}</div>}
                <label style={{ fontSize: '12px', color: '#666' }}>Số điện thoại</label>
                <input name="telephone" placeholder="090xxxxxxx" style={inputStyle} onChange={handleChange} disabled={loading} />
                <label style={{ fontSize: '12px', color: '#666' }}>Ngày sinh</label>
                <input name="customerBirthDay" type="date" style={inputStyle} onChange={handleChange} disabled={loading} />
                <label style={{ fontSize: '12px', color: '#666' }}>Mật khẩu</label>
                <input name="password" type="password" placeholder="********" style={inputStyle} onChange={handleChange} required disabled={loading} />
                {passwordError && <div style={{ color: 'red', marginBottom: 8, marginLeft: 2, fontSize: 15 }}>{passwordError}</div>}
                {inputError && (
                    <div style={{
                        color: inputError.includes('thành công') ? '#28a745' : 'red',
                        background: inputError.includes('thành công') ? '#eafaf1' : '#fff0f0',
                        border: inputError.includes('thành công') ? '1px solid #28a745' : '1px solid #ffcccc',
                        marginBottom: 12,
                        textAlign: 'center',
                        fontSize: 15,
                        borderRadius: 4,
                        padding: '8px 0'
                    }}>{inputError}</div>
                )}
                <button type="submit" style={btnStyle} disabled={loading}>
                    {loading ? (
                        <span>
                            <span className="spinner-border spinner-border-sm" style={{marginRight: 8, verticalAlign: 'middle'}}></span>
                            Đang đăng ký...
                        </span>
                    ) : 'Đăng ký ngay'}
                </button>
                <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
                    Đã có tài khoản? <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>Quay lại Đăng nhập</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;