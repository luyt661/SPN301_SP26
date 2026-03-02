import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import SimpleModal from '../components/SimpleModal';
import dayjs from 'dayjs';

const StaffRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");
    const [formData, setFormData] = useState({ roomNumber: '', roomPricePerDay: '', roomStatus: 1, roomDescription: '' });
    const [editingRoom, setEditingRoom] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('create'); // 'create' | 'edit' | 'delete'
    const [roomToDelete, setRoomToDelete] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchRooms = async () => {
        const res = await api.get('/rooms');
        setRooms(res.data);
    };

    useEffect(() => { fetchRooms(); }, []);

    const validate = () => {
        const newErrors = {};
        if (!formData.roomNumber) newErrors.roomNumber = 'Vui lòng nhập số phòng';
        if (!formData.roomPricePerDay) newErrors.roomPricePerDay = 'Vui lòng nhập giá phòng';
        return newErrors;
    };

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);
        try {
            if (modalType === 'edit' && editingRoom) {
                await api.put(`/rooms/staff/${editingRoom.roomID}`, formData);
                setSuccessMsg("Cập nhật phòng thành công!");
            } else {
                await api.post('/rooms/staff', formData);
                setSuccessMsg("Thêm phòng thành công!");
            }
            setFormData({ roomNumber: '', roomPricePerDay: '', roomStatus: 1, roomDescription: '' });
            setEditingRoom(null);
            setModalOpen(false);
            setErrors({});
            fetchRooms();
            setTimeout(() => setSuccessMsg("") , 2500);
        } catch (err) { alert("Lỗi khi lưu phòng!"); }
        setLoading(false);
    };

    const openCreateModal = () => {
        setFormData({ roomNumber: '', roomPricePerDay: '', roomStatus: 1, roomDescription: '' });
        setEditingRoom(null);
        setModalType('create');
        setModalOpen(true);
        setErrors({});
    };

    const openEditModal = room => {
        setFormData({
            roomNumber: room.roomNumber,
            roomPricePerDay: room.roomPricePerDay,
            roomStatus: room.roomStatus,
            roomDescription: room.roomDescription || ''
        });
        setEditingRoom(room);
        setModalType('edit');
        setModalOpen(true);
        setErrors({});
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingRoom(null);
        setFormData({ roomNumber: '', roomPricePerDay: '', roomStatus: 1, roomDescription: '' });
        setErrors({});
    };

    const handleDeleteClick = (id) => {
        setRoomToDelete(id);
        setModalType('delete');
        setModalOpen(true);
    };

    const confirmDeleteRoom = async () => {
        if (roomToDelete) {
            await api.delete(`/rooms/staff/${roomToDelete}`);
            fetchRooms();
            setModalOpen(false);
            setRoomToDelete(null);
        }
    };

    return (
        <div className="container mt-4">
            {successMsg && <div style={{background:'#e8f5e9',color:'#388e3c',padding:'12px 0',borderRadius:8,marginBottom:16,textAlign:'center',fontWeight:500,fontSize:17}}>{successMsg}</div>}
            <h2 className="mb-4">Quản lý phòng</h2>
            <button className="btn btn-success mb-3" style={{ fontWeight: 500, fontSize: 17, borderRadius: 8 }} onClick={openCreateModal}>Thêm phòng</button>
            <table className="table table-hover shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Số phòng</th>
                        <th>Giá</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room.roomID}>
                            <td>{room.roomNumber}</td>
                            <td>{room.roomPricePerDay}$</td>
                            <td>{room.roomStatus === 1 ? "✅ Active" : "❌ Inactive"}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(room)}>Sửa</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(room.roomID)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <SimpleModal isOpen={modalOpen && (modalType === 'create' || modalType === 'edit')} title={modalType === 'edit' ? 'Sửa phòng' : 'Thêm phòng mới'} onClose={closeModal}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Số phòng</label>
                        <input name="roomNumber" className="form-control" value={formData.roomNumber} onChange={handleChange} disabled={loading} />
                        {errors.roomNumber && <div style={{ color: 'red', fontSize: 15, marginTop: 2 }}>{errors.roomNumber}</div>}
                    </div>
                    <div className="mb-3">
                        <label>Giá/Ngày</label>
                        <input type="number" name="roomPricePerDay" className="form-control" value={formData.roomPricePerDay} onChange={handleChange} disabled={loading} />
                        {errors.roomPricePerDay && <div style={{ color: 'red', fontSize: 15, marginTop: 2 }}>{errors.roomPricePerDay}</div>}
                    </div>
                    <div className="mb-3">
                        <label>Trạng thái</label>
                        <select name="roomStatus" className="form-select" value={formData.roomStatus} onChange={handleChange} disabled={loading}>
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label>Mô tả</label>
                        <input name="roomDescription" className="form-control" value={formData.roomDescription} onChange={handleChange} disabled={loading} />
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>{modalType === 'edit' ? 'Cập nhật' : 'Thêm mới'}</button>
                        <button type="button" className="btn btn-secondary w-100" onClick={closeModal} disabled={loading}>Huỷ</button>
                    </div>
                </form>
            </SimpleModal>
            <SimpleModal isOpen={modalOpen && modalType === 'delete'} title="Xác nhận xóa phòng" onClose={closeModal}>
                <div style={{ marginBottom: 18 }}>Bạn có chắc chắn muốn xóa phòng này không?</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                    <button className="btn btn-secondary" onClick={closeModal}>Hủy</button>
                    <button className="btn btn-danger" onClick={confirmDeleteRoom}>Xóa</button>
                </div>
            </SimpleModal>
        </div>
    );
};

export default StaffRooms;