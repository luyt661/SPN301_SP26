import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ================= VALIDATE =================
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= LOGIN =================
  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const res = await axios.post("/accounts/login", {
        email,
        password
      });

      // LOGIN SUCCESS
      const acc = res.data;

      localStorage.setItem("isLogin", "true");
      localStorage.setItem("accountId", acc.accountId);
      localStorage.setItem("role", acc.accountRole);

      // Admin → admin layout
      if (acc.accountRole === 1) {
        navigate("/admin");
      } else {
        // Staff → news page (tuỳ bạn đổi route)
        navigate("/admin/news");
      }

    } catch (err) {
      console.error(err);
      setErrors({
        account: "Invalid email or password"
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">

          <div className="card shadow">
            <div className="card-body">

              <h4 className="text-center mb-4">Login</h4>

              {/* Email */}
              <label className="form-label">Email</label>
              <input
                className={`form-control mb-1 ${errors.email ? "is-invalid" : ""}`}
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setErrors(prev => ({ ...prev, email: "", account: "" }));
                }}
              />
              {errors.email && (
                <div className="text-danger mb-2">{errors.email}</div>
              )}

              {/* Password */}
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control mb-1 ${errors.password ? "is-invalid" : ""}`}
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setErrors(prev => ({ ...prev, password: "", account: "" }));
                }}
              />
              {errors.password && (
                <div className="text-danger mb-2">{errors.password}</div>
              )}

              {/* Login error */}
              {errors.account && (
                <div className="text-danger text-center mb-3">
                  {errors.account}
                </div>
              )}

              <button
                className="btn btn-primary w-100"
                onClick={handleLogin}
              >
                Login
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
