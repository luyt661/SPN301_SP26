import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const API_URL = "http://localhost:8080/orchids";

function OrchidForm({ show, onClose, onSuccess, editingOrchid }) {
  const [orchidName, setOrchidName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isSpecial, setIsSpecial] = useState(false);

  const [imageFile, setImageFile] = useState(null);   // file chọn từ máy
  const [preview, setPreview] = useState("");         // ảnh preview
  const [image, setImage] = useState("");              // URL lưu DB

  // Đổ dữ liệu khi Edit
  useEffect(() => {
    if (editingOrchid) {
      setOrchidName(editingOrchid.orchidName);
      setCategory(editingOrchid.category);
      setPrice(editingOrchid.price);
      setDescription(editingOrchid.description || "");
      setIsSpecial(editingOrchid.isSpecial || false);
      setImage(editingOrchid.image || "");
      setPreview(editingOrchid.image || "");
      setImageFile(null);
    } else {
      // Reset khi Add
      setOrchidName("");
      setCategory("");
      setPrice("");
      setDescription("");
      setIsSpecial(false);
      setImage("");
      setPreview("");
      setImageFile(null);
    }
  }, [editingOrchid]);

  // Khi chọn file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = image;

    // Nếu có chọn file mới -> convert sang base64 (demo đơn giản)
    if (imageFile) {
      const base64 = await toBase64(imageFile);
      imageUrl = base64; // lưu base64 vào DB (demo)
    }

    const data = {
      orchidName,
      category,
      price,
      description,
      isSpecial,
      image: imageUrl,
    };

    if (editingOrchid) {
      await axios.put(`${API_URL}/${editingOrchid.id}`, data);
    } else {
      await axios.post(API_URL, data);
    }

    onSuccess();
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {editingOrchid ? "Edit Orchid" : "Add Orchid"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={orchidName}
              onChange={(e) => setOrchidName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          {/* Chọn file ảnh */}
          <Form.Group className="mb-2">
            <Form.Label>Image File</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>

          {/* Preview ảnh */}
          {preview && (
            <div className="mb-2 text-center">
              <img
                src={preview}
                alt="preview"
                style={{ width: 120, height: 120, objectFit: "cover" }}
              />
            </div>
          )}

          <Form.Check
            type="checkbox"
            label="Special Orchid"
            checked={isSpecial}
            onChange={(e) => setIsSpecial(e.target.checked)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="success">
            {editingOrchid ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

// Hàm convert file -> base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

export default OrchidForm;
