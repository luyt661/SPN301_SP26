import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Kiểm tra nếu các trường bị bỏ trống (Logic báo lỗi đỏ phía dưới)
    if (!username.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
      return;
    }

    // 2. Kiểm tra đúng/sai tài khoản
    if (username === "Admin" && password === "123456") {
      setError("");
      onLogin && onLogin();
      navigate("/");
    } else {
      setError("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
      <Card className="shadow-sm p-4" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-4 text-center">Login</h2>
        
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError(""); // Hết báo lỗi khi gõ chữ vào
              }}
              isInvalid={!!error} // Hiện viền đỏ khi có lỗi
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(""); // Hết báo lỗi khi gõ chữ vào
              }}
              isInvalid={!!error} // Hiện viền đỏ khi có lỗi
            />
            
            {/* PHẦN BÁO CHỮ ĐỎ Ở PHÍA DƯỚI */}
            {error && (
              <Form.Control.Feedback type="invalid" className="d-block mt-2">
                {error}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <div className="d-flex gap-2 mt-4">
            <Button type="submit" variant="success" className="w-100">
              Login
            </Button>
            <Button type="button" variant="secondary" className="w-100" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;