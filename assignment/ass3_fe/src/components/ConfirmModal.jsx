import React from 'react';

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', padding: '32px 28px 24px 28px', borderRadius: '16px', minWidth: '360px', boxShadow: '0 4px 24px #bbb', textAlign: 'center', position: 'relative' }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#1976d2', marginBottom: 18 }}>Xác nhận</div>
                <div style={{ marginBottom: 24 }}>{message}</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 18 }}>
                    <button
                        onClick={onConfirm}
                        style={{ padding: '10px 32px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: 16, boxShadow: '0 2px 8px #e3e3e3', cursor: 'pointer' }}
                    >Đặt</button>
                    <button
                        onClick={onCancel}
                        style={{ padding: '10px 32px', background: '#eee', color: '#333', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: 16, cursor: 'pointer' }}
                    >Huỷ</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;