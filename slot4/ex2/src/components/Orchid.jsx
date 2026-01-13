import React from 'react';
import { Card } from "react-bootstrap";
import "../styles/orchid.css";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { Link } from "react-router-dom";


function Orchid({ orchidName, category, isSpecial, image, price, description, id }) {

    const [showModal, setShowModal] = useState(false);

  return (
    <>
        <Card className="orchid-card h-100">
        
        {/* Image + Special badge */}
        <div className="image-wrapper">
            <Card.Img
            variant="top"
            src={image}
            className="orchid-image"
            />

            {isSpecial && (
            <span className="special-badge-corner">
                🌟 Special Orchid
            </span>
            )}
        </div>

        <Card.Body className="d-flex flex-column">
            <Card.Title className="orchid-title text-center">
            {orchidName}
            </Card.Title>

            <Card.Subtitle className="orchid-category text-center">
            {category}
            </Card.Subtitle>

            <Card.Text className="orchid-price text-center">
            Price: {price.toLocaleString()} VND
            </Card.Text>

            <Button
              as={Link}
              to={`/orchid/${id}`} // nhớ truyền prop id vào Orchid
              variant="outline-success"
              className="detail-btn mt-auto"
            >
              Detail
            </Button>
        </Card.Body>
        </Card>

        {/* ===== MODAL ===== */}
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