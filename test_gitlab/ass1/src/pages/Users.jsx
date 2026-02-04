import { useState } from "react";
import SimpleModal from "../components/SimpleModal";

export default function Users() {

  // ================= DATA =================
  const [users, setUsers] = useState([
    { id: 1, name: "Admin", email: "admin@gmail.com", role: 1 },
    { id: 2, name: "Staff", email: "staff@gmail.com", role: 2 }
  ]);

  // ================= MODAL =================
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(null);

  // ================= FORM =================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(2);
  const [errors, setErrors] = useState({});

  // ================= ADD =================
  const openAdd = () => {
    setCurrent(null);
    setName("");
    setEmail("");
    setRole(2);
    setErrors({});
    setShow(true);
  };

  // ================= EDIT =================
  const openEdit = (u) => {
    setCurrent(u);
    setName(u.name);
    setEmail(u.email);
    setRole(u.role);
    setErrors({});
    setShow(true);
  };

  // ================= VALIDATE =================
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Username is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SAVE =================
  const saveUser = () => {
    if (!validate()) return;

    if (current) {
      setUsers(
        users.map(u =>
          u.id === current.id
            ? { ...u, name, email, role }
            : u
        )
      );
    } else {
      setUsers([
        ...users,
        {
          id: Date.now(),
          name,
          email,
          role
        }
      ]);
    }

    setShow(false);
  };

  // ================= DELETE =================
  const deleteUser = (id) => {
    if (window.confirm("Delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // ================= RENDER =================
  return (
    <>
      <h2>User Management</h2>

      <button className="btn btn-success mb-3" onClick={openAdd}>
        Add User
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th width="180">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role === 1 ? "Admin" : "Staff"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openEdit(u)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= ADD / EDIT MODAL ================= */}
      <SimpleModal
        title={current ? "Edit User" : "Add User"}
        show={show}
        onClose={() => setShow(false)}
        onSave={saveUser}
      >
        {/* Username */}
        <input
          className={`form-control mb-1 ${errors.name ? "is-invalid" : ""}`}
          placeholder="Username *"
          value={name}
          onChange={e => {
            setName(e.target.value);
            setErrors(prev => ({ ...prev, name: "" }));
          }}
        />
        {errors.name && <div className="text-danger mb-2">{errors.name}</div>}

        {/* Email */}
        <input
          className={`form-control mb-1 ${errors.email ? "is-invalid" : ""}`}
          placeholder="Email *"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setErrors(prev => ({ ...prev, email: "" }));
          }}
        />
        {errors.email && <div className="text-danger mb-2">{errors.email}</div>}

        {/* Role */}
        <select
          className="form-control"
          value={role}
          onChange={e => setRole(Number(e.target.value))}
        >
          <option value={1}>Admin</option>
          <option value={2}>Staff</option>
        </select>
      </SimpleModal>
    </>
  );
}
