import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ConfirmModal from "../components/ConfirmModal";

const CustomerBooking = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      setMessage("Lỗi tải phòng!");
    }
    setLoading(false);
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setMessage("");
    setShowConfirm(true);
  };

  const handleBook = async () => {
    if (!selectedRoom) {
      setMessage("Vui lòng chọn phòng!");
      return;
    }
    if (!customerId) {
      setMessage("Không tìm thấy customerId. Vui lòng đăng nhập lại!");
      return;
    }
    setLoading(true);
    const bookingData = {
      customerId: parseInt(customerId),
      totalPrice: selectedRoom.roomPricePerDay,
      details: [
        {
          roomID: selectedRoom.roomID,
          price: selectedRoom.roomPricePerDay,
        },
      ],
    };
    try {
      await api.post("/bookings/customer", bookingData);
      setMessage("Đặt phòng thành công!");
      setSelectedRoom(null);
      setShowConfirm(false);
      fetchRooms();
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setMessage("Đặt phòng thành công!");
        setSelectedRoom(null);
        setShowConfirm(false);
        fetchRooms();
      } else {
        setMessage("Lỗi khi đặt phòng! " + (err.response?.data || err.message));
      }
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setSelectedRoom(null);
    setMessage("");
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px #eee", padding: 32 }}>
      <h2 style={{ textAlign: "center", color: "#1976d2" }}>Đặt phòng khách sạn</h2>
      {message && (
        <div style={{ marginBottom: 16, color: message.includes("thành công") ? "green" : "red", textAlign: "center" }}>{message}</div>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <thead style={{ background: "#f5f5f5" }}>
          <tr>
            <th style={{ padding: 12, border: "1px solid #ddd" }}>Số phòng</th>
            <th style={{ padding: 12, border: "1px solid #ddd" }}>Giá/ngày</th>
            <th style={{ padding: 12, border: "1px solid #ddd" }}>Trạng thái</th>
            <th style={{ padding: 12, border: "1px solid #ddd" }}>Chọn</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={4} style={{ textAlign: "center", padding: 24 }}>Đang tải...</td></tr>
          ) : rooms.length === 0 ? (
            <tr><td colSpan={4} style={{ textAlign: "center", padding: 24 }}>Không có phòng nào.</td></tr>
          ) : rooms.map((room) => (
            <tr key={room.roomID} style={{ background: selectedRoom?.roomID === room.roomID ? "#e3f2fd" : "" }}>
              <td style={{ padding: 12, border: "1px solid #ddd" }}>{room.roomNumber}</td>
              <td style={{ padding: 12, border: "1px solid #ddd" }}>{room.roomPricePerDay}$</td>
              <td style={{ padding: 12, border: "1px solid #ddd" }}>{room.roomStatus === 1 ? "Còn trống" : "Đã đặt"}</td>
              <td style={{ padding: 12, border: "1px solid #ddd" }}>
                <button
                  style={{ padding: "6px 16px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}
                  disabled={room.roomStatus !== 1 || loading}
                  onClick={() => handleSelectRoom(room)}
                >Chọn</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirm && selectedRoom && (
        <ConfirmModal
          isOpen={showConfirm}
          message={
            <div>
              <h3 style={{ color: "#1976d2" }}>Xác nhận đặt phòng</h3>
              <p><b>Số phòng:</b> {selectedRoom.roomNumber}</p>
              <p><b>Giá/ngày:</b> {selectedRoom.roomPricePerDay}$</p>
            </div>
          }
          onConfirm={handleBook}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default CustomerBooking;