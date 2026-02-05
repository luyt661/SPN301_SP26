import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `nav-link px-3 py-2 rounded mb-2 fw-medium
     ${isActive ? "bg-primary text-white" : "text-dark"}`;

  return (
    <div
      className="vh-100 p-3"
      style={{
        backgroundColor: "#f5f6fa",
        borderRight: "1px solid #ddd"
      }}
    >
      <h5 className="text-center mb-4 fw-bold">
        Menu
      </h5>

      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/admin/category" className={linkClass}>
            Category
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/admin/news" className={linkClass}>
            News
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/admin/users" className={linkClass}>
            Users
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/admin/settings" className={linkClass}>
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
