import React from 'react';

const SimpleModal = ({ isOpen, title, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', minWidth: '400px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', marginBottom: '15px' }}>
                    <h2>{title}</h2>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>&times;</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default SimpleModal;