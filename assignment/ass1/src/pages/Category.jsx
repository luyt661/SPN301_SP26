import { useEffect, useState } from "react";
import axios from "../api/axios";
import SimpleModal from "../components/SimpleModal";
import ConfirmModal from "../components/ConfirmModal";

export default function Category() {

  // ================= DATA =================
  const [categories, setCategories] = useState([]);

  // ================= MODAL =================
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(null);

  // ================= DELETE =================
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  // ================= FORM =================
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState({});

  // ================= LOAD =================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      alert("Cannot load categories");
    }
  };

  // ================= ADD =================
  const openAdd = () => {
    setCurrent(null);
    setName("");
    setDescription("");
    setParentId("");
    setIsActive(true);
    setErrors({});
    setShow(true);
  };

  // ================= EDIT =================
  const openEdit = (c) => {
    setCurrent(c);
    setName(c.categoryName);
    setDescription(c.categoryDescription || "");
    setParentId(c.parentCategory?.categoryId || "");
    setIsActive(Boolean(c.isActive));
    setErrors({});
    setShow(true);
  };

  // ================= DELETE =================
  const openDelete = (c) => {
    setDeleteItem(c);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.post("/categories", {
        categoryId: deleteItem.categoryId,
        categoryName: deleteItem.categoryName,
        categoryDescription: deleteItem.categoryDescription,
        parentCategory: deleteItem.parentCategory
          ? { categoryId: deleteItem.parentCategory.categoryId }
          : null,
        isActive: false
      });

      setShowConfirm(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ================= VALIDATE =================
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (parentId && Number(parentId) === current?.categoryId) {
      newErrors.parentId = "Parent category cannot be itself";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SAVE =================
  const saveCategory = async () => {
    if (!validate()) return;

    try {
      await axios.post("/categories", {
        categoryId: current?.categoryId,
        categoryName: name,
        categoryDescription: description,
        parentCategory: parentId ? { categoryId: Number(parentId) } : null,
        isActive
      });

      setShow(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // ================= RENDER =================
  return (
    <>
      <h2>Category Management</h2>

      <button className="btn btn-success mb-3" onClick={openAdd}>
        Add Category
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Parent ID</th>
            <th>Status</th>
            <th width="180">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => (
            <tr key={c.categoryId}>
              <td>{c.categoryId}</td>
              <td>{c.categoryName}</td>
              <td>{c.categoryDescription}</td>
              <td>{c.parentCategory?.categoryId || "-"}</td>
              <td>{c.isActive ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openEdit(c)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  disabled={!c.isActive}
                  onClick={() => openDelete(c)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD / EDIT MODAL */}
      <SimpleModal
        title={current ? "Edit Category" : "Add Category"}
        show={show}
        onClose={() => setShow(false)}
        onSave={saveCategory}
      >
        {/* NAME */}
        <div className="mb-2">
          <input
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Category name *"
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (errors.name) {
                setErrors(prev => ({ ...prev, name: null }));
              }
            }}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* DESCRIPTION */}
        <div className="mb-2">
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            placeholder="Description *"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
              if (errors.description) {
                setErrors(prev => ({ ...prev, description: null }));
              }
            }}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        {/* PARENT */}
        <div className="mb-2">
          <select
            className={`form-control ${errors.parentId ? "is-invalid" : ""}`}
            value={parentId}
            onChange={e => {
              setParentId(e.target.value);
              if (errors.parentId) {
                setErrors(prev => ({ ...prev, parentId: null }));
              }
            }}
          >
            <option value="">-- No parent --</option>
            {categories.map(c => (
              <option key={c.categoryId} value={c.categoryId}>
                {c.categoryName}
              </option>
            ))}
          </select>
          {errors.parentId && (
            <div className="invalid-feedback">{errors.parentId}</div>
          )}
        </div>

        {/* STATUS */}
        <select
          className="form-control"
          value={isActive ? "1" : "0"}
          onChange={e => setIsActive(e.target.value === "1")}
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </SimpleModal>

      {/* CONFIRM DELETE */}
      <ConfirmModal
        show={showConfirm}
        title="Confirm delete"
        message="Are you sure you want to deactivate this category?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
