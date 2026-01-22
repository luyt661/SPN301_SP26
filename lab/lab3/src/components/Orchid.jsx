import React, { useState } from 'react';
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConfirmModal from './ConfirmModal';
import "../styles/orchid.css";

function Orchid({ orchidName, category, isSpecial, image, price, description, id }) {
    const [showModal, setShowModal] = useState(false);

  return (
    <>
        {/* Card được khống chế maxWidth và mx-auto để luôn nằm giữa */}
        <Card 
          className="orchid-card h-100 mx-auto shadow-sm border-0" 
          style={{ width: '100%', maxWidth: '320px', overflow: 'hidden' }}
        >
        
            {/* Phần hình ảnh */}
            <div className="image-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
                <Card.Img
                    variant="top"
                    src={image}
                    className="orchid-image"
                    style={{ 
                        height: '220px', 
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease' 
                    }}
                />

                {isSpecial && (
                    <span 
                        className="special-badge-corner"
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: 'rgba(255, 193, 7, 0.9)',
                            color: '#000',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            zIndex: 1
                        }}
                    >
                        🌟 Special
                    </span>
                )}
            </div>

            {/* Nội dung Card */}
            <Card.Body className="d-flex flex-column p-3 bg-white text-center">
                <Card.Title className="fw-bold mb-1 text-truncate" style={{ fontSize: '1.1rem' }}>
                    {orchidName}
                </Card.Title>

                <Card.Subtitle className="text-muted mb-2 small italic">
                    {category}
                </Card.Subtitle>

                <Card.Text className="text-success fw-bold fs-5 mb-3">
                    {price.toLocaleString()} VND
                </Card.Text>

                <Button
                    as={Link}
                    to={`/orchid/${id}`}
                    variant="outline-success"
                    className="mt-auto fw-bold py-2 shadow-sm rounded-pill"
                    style={{ transition: 'all 0.2s' }}
                >
                    View Detail
                </Button>
            </Card.Body>
        </Card>

        {/* Modal chi tiết */}
        <ConfirmModal
            show={showModal}
            onClose={() => setShowModal(false)}
            image={image}
            name={orchidName}
            description={description}
            title="Orchid Detail"
        />
    </>
  );
}

export default Orchid;