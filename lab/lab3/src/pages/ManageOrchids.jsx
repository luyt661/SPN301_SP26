import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import axios from "axios";
import OrchidForm from "../components/OrchidForm";

const API_URL = "http://localhost:8080/orchids";

function ManageOrchids() {
  const [orchids, setOrchids] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOrchid, setEditingOrchid] = useState(null);

  const loadOrchids = async () => {
    const res = await axios.get(API_URL);
    setOrchids(res.data);
  };

  useEffect(() => {
    loadOrchids();
  }, []);

  // Add
  const handleAdd = () => {
    setEditingOrchid(null);
    setShowForm(true);
  };

  // Edit
  const handleEdit = (orchid) => {
    setEditingOrchid(orchid);
    setShowForm(true);
  };

  // Delete với confirm
  const handleDelete = async (id) => {
    const ok = window.confirm("Bạn có chắc muốn xoá orchid này không?");
    if (!ok) return;

    await axios.delete(`${API_URL}/${id}`);
    loadOrchids();
  };

  return (
    <Container className="py-4">
      <h2 className="mb-3">Orchid Manager</h2>

      <Button variant="success" className="mb-3" onClick={handleAdd}>
        + Add Orchid
      </Button>

      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Special</th>
            <th>Image</th>
            <th width="160">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orchids.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.orchidName}</td>
              <td>{o.category}</td>
              <td>{o.price}</td>
              <td>{o.isSpecial ? "Yes" : "No"}</td>
              <td>
                {o.image && (
                  <img
                    src={o.image}
                    alt=""
                    style={{ width: 60, height: 60, objectFit: "cover" }}
                  />
                )}
              </td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEdit(o)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(o.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Form Add/Edit */}
      <OrchidForm
        show={showForm}
        onClose={() => setShowForm(false)}
        onSuccess={loadOrchids}
        editingOrchid={editingOrchid}
      />
    </Container>
  );
}

export default ManageOrchids;
