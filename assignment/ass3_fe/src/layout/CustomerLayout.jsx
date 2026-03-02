import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';

const CustomerLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div>
            <header style={{ background: '#3498db', color: 'white', padding: '15px 50px', display: 'flex', justifyContent: 'space-between' }}>
                <h2>FU Mini Hotel</h2>
                <nav>
                    <Link to="rooms" style={cNavLink}>Xem phòng</Link>
                    <Link to="history" style={cNavLink}>Lịch sử đặt</Link>
                    <button onClick={handleLogout} style={{ marginLeft: '20px' }}>Đăng xuất</button>
                </nav>
            </header>

            <main style={{ padding: '40px 50px' }}>
                <Outlet />
            </main>
        </div>
    );
};

const cNavLink = { color: 'white', textDecoration: 'none', marginLeft: '25px' };

export default CustomerLayout;