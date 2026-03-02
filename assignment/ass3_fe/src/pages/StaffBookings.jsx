import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const StaffBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [sortType, setSortType] = useState('desc');
    useEffect(() => {
        api.get('/bookings/staff').then(res => {
            let sorted = [...res.data];
            sorted.sort((a, b) => {
                const dA = new Date(a.bookingDate);
                const dB = new Date(b.bookingDate);
                return sortType === 'desc' ? dB - dA : dA - dB;
            });
            setBookings(sorted);
        }).catch(() => alert("Lỗi tải dữ liệu!"));
    }, [sortType]);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Quản lý Đặt phòng Toàn hệ thống</h2>
            <div style={{ marginBottom: 16 }}>
                <label style={{ marginRight: 12 }}>Sắp xếp theo ngày:</label>
                <select value={sortType} onChange={e => setSortType(e.target.value)} style={{ padding: '6px 16px', borderRadius: 6 }}>
                    <option value="desc">Mới nhất</option>
                    <option value="asc">Cũ nhất</option>
                </select>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-primary">
                        <tr>
                            <th>ID</th>
                            <th>Ngày đặt</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(b => (
                            <tr key={b.bookingReservationID}>
                                <td>#{b.bookingReservationID}</td>
                                <td>{b.bookingDate}</td>
                                <td>{b.customer?.customerFullName}</td>
                                <td>{b.totalPrice}$</td>
                                <td>{b.bookingStatus === 1 ? "Thành công" : "Hủy"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaffBookings;