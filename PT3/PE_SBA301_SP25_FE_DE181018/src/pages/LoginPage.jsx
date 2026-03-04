import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role.toString());
      localStorage.setItem("memberID", res.data.memberID);

      // Nếu là Admin (Role 1) nhảy sang trang Admin, ngược lại về Home
      if (res.data.role.toString() === "1") {
        navigate("/admin/cars");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "400px" }} className="shadow">
        <Card.Body>
          <Card.Title className="text-center mb-4">Login to Cars Management System</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-2">Login</Button>
            <Button variant="secondary" className="w-100" onClick={() => navigate("/")}>Close</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage; // Sửa lỗi Uncaught SyntaxError