import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div style={{ width: '200px', height: '100vh', background: '#f4f4f4', padding: '20px', borderRight: '1px solid #ddd' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '15px' }}>
                    <Link to="/staff/rooms" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>🏨 Quản lý phòng</Link>
                </li>
                <li style={{ marginBottom: '15px' }}>
                    <Link to="/staff/bookings" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>📅 Quản lý đặt phòng</Link>
                </li>
                <li style={{ marginBottom: '15px' }}>
                    <Link to="/staff/customers" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>👥 Khách hàng</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;