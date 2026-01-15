import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import ConfirmModal from "./ConfirmModal";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [touched, setTouched] = useState({});

  // Validate 1 field
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (!/^[A-Za-zÀ-ỹ\s]+$/.test(value))
          return "First name must contain only letters";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required";
        if (!/^[A-Za-zÀ-ỹ\s]+$/.test(value))
          return "Last name must contain only letters";
        return "";
      case "phone":
        if (!/^[0-9]{10}$/.test(value)) return "Phone must be exactly 10 digits";
        return "";
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email";
        return "";
      case "agree":
        if (!value) return "You must agree before submitting";
        return "";
      default:
        return "";
    }
  };

  // Validate all fields
  const validateAll = (data = formData) => {
    let newErrors = {};
    Object.keys(data).forEach((key) => {
      const err = validateField(key, data[key]);
      if (err) newErrors[key] = err;
    });
    return newErrors;
  };

  // ===== HANDLE CHANGE =====
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    // Validate field immediately
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, val),
    }));
  };

  // ===== SUBMIT =====
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTouched = {};
    Object.keys(formData).forEach((key) => (newTouched[key] = true));
    setTouched(newTouched);

    const newErrors = validateAll();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowModal(true);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: 500 }}>
      <h2 className="mb-4 text-center">Contact Us</h2>

      <Form onSubmit={handleSubmit}>
        {/* First Name */}
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleChange}
            isInvalid={!!errors.firstName && touched.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Last Name */}
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleChange}
            isInvalid={!!errors.lastName && touched.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Phone */}
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleChange}
            isInvalid={!!errors.phone && touched.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleChange}
            isInvalid={!!errors.email && touched.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Agree Checkbox */}
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="agree"
            label="I agree to the terms and conditions"
            checked={formData.agree}
            onChange={handleChange}
            onBlur={handleChange}
            isInvalid={!!errors.agree && touched.agree}
            feedback={errors.agree}
            feedbackType="invalid"
          />
        </Form.Group>

        <Button type="submit" variant="success" className="w-100">
          Submit
        </Button>
      </Form>

      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        image="https://i.pravatar.cc/150"
        name={formData.firstName + " " + formData.lastName}
        description={
          <>
            <div><b>Phone:</b> {formData.phone}</div>
            <div><b>Email:</b> {formData.email}</div>
            <div><b>Agree:</b> {formData.agree ? "Yes" : "No"}</div>
          </>
        }
        title="Confirm Information"
      />
    </Container>
  );
}

export default Contact;
