import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';

const StaffLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <div style={{ width: '250px', background: '#2c3e50', color: 'white', padding: '20px' }}>
                <h2>ADMIN PANEL</h2>
                <hr />
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                    <Link to="rooms" style={navLink}>🏨 Quản lý phòng</Link>
                    <Link to="bookings" style={navLink}>📅 Quản lý đặt phòng</Link>
                    <Link to="customers" style={navLink}>👥 Khách hàng</Link>
                    <button onClick={handleLogout} style={{ ...navLink, background: 'none', border: 'none', textAlign: 'left', color: '#e74c3c' }}>
                        🚪 Đăng xuất
                    </button>
                </nav>
            </div>

            <div style={{ flex: 1, padding: '30px', background: '#f4f7f6' }}>
                <Outlet />
            </div>
        </div>
    );
};

const navLink = { color: 'white', textDecoration: 'none', fontSize: '18px' };

export default StaffLayout;