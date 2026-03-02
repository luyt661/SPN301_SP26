import React, { useEffect, useState } from "react";
import api from "../api/axios";

const CustomerHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/bookings/customer/history/${customerId}`);
      setBookings(res.data);
    } catch (err) {
      setError("Lỗi tải lịch sử!");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px #eee", padding: 32 }}>
      <h2 style={{ textAlign: "center", color: "#1976d2" }}>Lịch sử đặt phòng</h2>
      {error && <div style={{ color: "red", marginBottom: 16, textAlign: "center" }}>{error}</div>}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <thead style={{ background: "#f5f5f5" }}>
          <tr>
            <th style={{ padding: 12, border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: 12, border: "1px solid #ddd" }}>Ngày đặt</th>
            <th style={{ padding: 12, border: "1px solid #ddd" }}>Tổng tiền</th>
            <th style={{ padding: 12, border: "1px solid #ddd" }}>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={4} style={{ textAlign: "center", padding: 24 }}>Đang tải...</td></tr>
          ) : bookings.length === 0 ? (
            <tr><td colSpan={4} style={{ textAlign: "center", padding: 24 }}>Không có lịch sử đặt phòng.</td></tr>
          ) : bookings.map(b => (
            <tr key={b.bookingReservationID}>
              <td style={{ padding: 12, border: "1px solid #ddd" }}>#{b.bookingReservationID}</td>
              <td style={{ padding: 12, border: "1px solid #ddd" }}>{b.bookingDate}</td>
              <td style={{ padding: 12, border: "1px solid #ddd" }}>{b.totalPrice}$</td>
              <td style={{ padding: 12, border: "1px solid #ddd" }}>{b.bookingStatus === 1 ? "Thành công" : "Hủy"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerHistory;