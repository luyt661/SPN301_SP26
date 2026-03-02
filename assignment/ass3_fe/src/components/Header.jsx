import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.clear(); // Xóa Token và Role
        navigate('/');
    };

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', background: '#2c3e50', color: 'white' }}>
            <h3>FU Mini Hotel Management</h3>
            <div>
                <span style={{ marginRight: '15px' }}>Role: <b>{role}</b></span>
                <button onClick={handleLogout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;