import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";

const CarPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    api.get("/cars/list")
      .then((res) => {
        const updatedCars = res.data.map(car => ({
          ...car,
          image: localStorage.getItem(`car_img_${car.carID}`) || null
        }));
        
        // RÀNG BUỘC: Hiển thị xe mới nhất lên đầu (Sort ID giảm dần)
        const sorted = updatedCars.sort((a, b) => b.carID - a.carID);
        setCars(sorted);
      })
      .catch((err) => console.error("Lỗi lấy dữ liệu:", err));
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5 fw-bold text-uppercase" style={{ letterSpacing: '2px' }}>
        Showroom Ô Tô
      </h2>
      <Row>
        {cars.map((car) => (
          <Col key={car.carID} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm border-0 car-card" style={{ transition: '0.3s' }}>
              <div style={{ height: "180px", backgroundColor: "#f8f9fa", overflow: 'hidden' }}>
                {car.image ? (
                  <Card.Img
                    variant="top"
                    src={car.image}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                    No Image
                  </div>
                )}
              </div>

              <Card.Body className="d-flex flex-column p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Badge bg="dark">{car.countryName}</Badge>
                  <small className="text-muted">Stock: {car.unitsInStock}</small>
                </div>

                <Card.Title className="fw-bold mb-1 text-truncate" title={car.carName}>
                  {car.carName}
                </Card.Title>

                <Card.Text className="text-danger fw-bold fs-5 mb-3">
                  ${car.unitPrice?.toLocaleString()}
                </Card.Text>

                <Button variant="dark" className="mt-auto w-100 rounded-0 py-2 fw-semibold">
                  CAR DETAIL
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CarPage;