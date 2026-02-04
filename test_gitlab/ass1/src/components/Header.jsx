import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-dark text-white">
      <h5 className="mb-0">FUNews Management System</h5>
      <button className="btn btn-outline-light btn-sm" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
