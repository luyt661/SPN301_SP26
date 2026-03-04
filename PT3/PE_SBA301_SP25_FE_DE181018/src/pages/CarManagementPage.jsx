import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import api from "../api/axios";

const CarManagementPage = () => {
  const [cars, setCars] = useState([]);
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  
  // Quản lý thông báo lỗi cho từng ô input
  const [validationErrors, setValidationErrors] = useState({});

  const initialForm = {
    carID: 0,
    carName: "",
    image: "", 
    unitsInStock: 5,
    unitPrice: 0,
    country: { countryID: "" }
  };
  
  const [formData, setFormData] = useState(initialForm);
  const role = localStorage.getItem("role");

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [carRes, countryRes] = await Promise.all([
        api.get("/cars/list"),
        api.get("/countries")
      ]);
      const carsWithImages = carRes.data.map(car => ({
        ...car,
        image: localStorage.getItem(`car_img_${car.carID}`) || ""
      }));

      // RÀNG BUỘC: Item mới lên đầu danh sách
      const sortedCars = carsWithImages.sort((a, b) => b.carID - a.carID);
      setCars(sortedCars);
      setCountries(countryRes.data);
    } catch (err) { console.error("Error load data", err); }
  };

  // Hàm kiểm tra các ràng buộc FE trước khi gửi đi
  const validateForm = () => {
    let errors = {};
    // 1. All fields are required
    if (!formData.carName.trim()) errors.carName = "Car Name is required.";
    // 2. CarName > 10 characters
    else if (formData.carName.length <= 10) errors.carName = "Car Name must be greater than 10 characters.";

    // 3. UnitsInStock between 5 and 20
    if (!formData.unitsInStock) errors.unitsInStock = "Units In Stock is required.";
    else if (formData.unitsInStock < 5 || formData.unitsInStock > 20) {
      errors.unitsInStock = "Units In Stock must be between 5 and 20.";
    }

    if (!formData.unitPrice || formData.unitPrice <= 0) errors.unitPrice = "Price must be greater than 0.";
    if (!formData.country.countryID) errors.country = "Please select a country.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClose = () => {
    setShow(false);
    setIsEdit(false);
    setFormData(initialForm);
    setValidationErrors({});
    setError("");
  };

  const handleEdit = (car) => {
    const foundCountry = countries.find(c => c.countryName === car.countryName);
    setFormData({
      ...car,
      image: localStorage.getItem(`car_img_${car.carID}`) || "",
      country: { countryID: foundCountry ? foundCountry.countryID.toString() : "" }
    });
    setIsEdit(true);
    setShow(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Dừng nếu có lỗi chữ đỏ

    const payload = {
      carName: formData.carName,
      unitsInStock: Number(formData.unitsInStock),
      unitPrice: Number(formData.unitPrice),
      country: { countryID: Number(formData.country.countryID) }
    };

    try {
      let currentCarID = formData.carID;

      if (isEdit) {
        await api.put(`/cars/admin/update/${formData.carID}`, payload);
      } else {
        const response = await api.post("/cars/admin/add", payload);
        currentCarID = response.data.carID;
      }

      // Lưu ảnh vào FE dựa trên carID
      if (formData.image) {
        localStorage.setItem(`car_img_${currentCarID}`, formData.image);
      }

      handleClose();
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed. Check Backend constraints.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/cars/admin/delete/${id}`);
        localStorage.removeItem(`car_img_${id}`);
        loadData();
      } catch (err) { alert("Delete failed!"); }
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2><span className="text-primary">Admin</span> Inventory</h2>
        <Button variant="success" onClick={() => { setIsEdit(false); setShow(true); }}>+ Add New Car</Button>
      </div>

      <Table striped bordered hover responsive className="shadow-sm align-middle text-center">
        <thead className="table-dark">
          <tr><th>ID</th><th>Image</th><th>Car Name</th><th>Stock</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {cars.map((c) => (
            <tr key={c.carID}>
              <td>{c.carID}</td>
              <td><img src={c.image || "https://via.placeholder.com/60x40"} alt="car" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
              <td className="fw-bold">{c.carName}</td>
              <td>{c.unitsInStock}</td>
              <td>${c.unitPrice.toLocaleString()}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(c)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(c.carID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton><Modal.Title>{isEdit ? "Update Car" : "Add New Car"}</Modal.Title></Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-2">
              <Form.Label>Car Name</Form.Label>
              <Form.Control 
                isInvalid={!!validationErrors.carName}
                type="text" 
                value={formData.carName} 
                onChange={(e) => setFormData({ ...formData, carName: e.target.value })} 
              />
              <Form.Control.Feedback type="invalid">{validationErrors.carName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image URL (Save to Frontend)</Form.Label>
              <Form.Control type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
            </Form.Group>

            <div className="row">
              <div className="col-md-6 mb-2">
                <Form.Label>Stock (5 - 20)</Form.Label>
                <Form.Control 
                  isInvalid={!!validationErrors.unitsInStock}
                  type="number" 
                  value={formData.unitsInStock} 
                  onChange={(e) => setFormData({ ...formData, unitsInStock: e.target.value })} 
                />
                <Form.Control.Feedback type="invalid">{validationErrors.unitsInStock}</Form.Control.Feedback>
              </div>
              <div className="col-md-6 mb-2">
                <Form.Label>Price ($)</Form.Label>
                <Form.Control 
                  isInvalid={!!validationErrors.unitPrice}
                  type="number" 
                  value={formData.unitPrice} 
                  onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })} 
                />
                <Form.Control.Feedback type="invalid">{validationErrors.unitPrice}</Form.Control.Feedback>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Country Origin</Form.Label>
              <Form.Select 
                isInvalid={!!validationErrors.country}
                value={formData.country.countryID} 
                onChange={(e) => setFormData({ ...formData, country: { countryID: e.target.value } })}
              >
                <option value="">-- Select Country --</option>
                {countries.map((ct) => <option key={ct.countryID} value={ct.countryID}>{ct.countryName}</option>)}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{validationErrors.country}</Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button variant="primary" type="submit">Save Changes</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CarManagementPage;