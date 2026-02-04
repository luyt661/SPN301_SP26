import { useEffect, useState } from "react";
import axios from "../api/axios";
import SimpleModal from "../components/SimpleModal";
import ConfirmModal from "../components/ConfirmModal";

export default function News() {

  // ================= DATA =================
  const [newsList, setNewsList] = useState([]);
  const [categories, setCategories] = useState([]);

  // ================= MODAL =================
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(null);

  // confirm delete
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  // ================= FORM =================
  const [title, setTitle] = useState("");
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState(true);
  const [errors, setErrors] = useState({});

  // ================= LOAD =================
  useEffect(() => {
    fetchNews();
    fetchCategories();
  }, []);

  // ================= FETCH NEWS =================
  const fetchNews = async () => {
    try {
      const res = await axios.get("/news");

      let data = [];
      if (Array.isArray(res.data)) data = res.data;
      else if (Array.isArray(res.data?.content)) data = res.data.content;
      else if (Array.isArray(res.data?.data)) data = res.data.data;

      setNewsList(data);
    } catch (err) {
      console.error(err);
      setNewsList([]);
    }
  };

  // ================= FETCH CATEGORY =================
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch {
      setCategories([]);
    }
  };

  // ================= ADD =================
  const openAdd = () => {
    setCurrent(null);
    setTitle("");
    setHeadline("");
    setContent("");
    setSource("");
    setCategoryId("");
    setStatus(true);
    setErrors({});
    setShow(true);
  };

  // ================= EDIT =================
  const openEdit = (n) => {
    setCurrent(n);
    setTitle(n.newsTitle || "");
    setHeadline(n.headline || "");
    setContent(n.newsContent || "");
    setSource(n.newsSource || "");
    setCategoryId(n.category?.categoryId?.toString() || "");
    setStatus(Boolean(n.newsStatus));
    setErrors({});
    setShow(true);
  };

  // ================= VALIDATE =================
  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!headline.trim()) e.headline = "Headline is required";
    if (!content.trim()) e.content = "Content is required";
    if (!source.trim()) e.source = "Source is required";
    if (!categoryId) e.categoryId = "Category is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ================= SAVE =================
  const saveNews = async () => {
    if (!validate()) return;

    try {
      await axios.post("/news", {
        newsArticleId: current?.newsArticleId || null,
        newsTitle: title,
        headline,
        newsContent: content,
        newsSource: source,
        newsStatus: status,
        category: { categoryId: Number(categoryId) },
        createdBy: { accountId: Number(localStorage.getItem("accountId")) }
      });

      setShow(false);
      fetchNews();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // ================= DELETE (INACTIVE) =================
  const openDelete = (n) => {
    setDeleteItem(n);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.post("/news", {
        ...deleteItem,
        newsStatus: false
      });
      setShowConfirm(false);
      fetchNews();
    } catch {
      alert("Delete failed");
    }
  };

  // ================= RENDER =================
  return (
    <>
      <h2>News Management</h2>

      <button className="btn btn-success mb-3" onClick={openAdd}>
        Add News
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Headline</th>
            <th>Source</th>
            <th>Category</th>
            <th>Status</th>
            <th width="180">Action</th>
          </tr>
        </thead>
        <tbody>
          {newsList.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center">No data</td>
            </tr>
          )}

          {newsList.map(n => (
            <tr key={n.newsArticleId}>
              <td>{n.newsArticleId}</td>
              <td>{n.newsTitle}</td>
              <td>{n.headline}</td>
              <td>{n.newsSource}</td>
              <td>{n.category?.categoryName}</td>
              <td>{n.newsStatus ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openEdit(n)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => openDelete(n)}
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
        title={current ? "Edit News" : "Add News"}
        show={show}
        onClose={() => setShow(false)}
        onSave={saveNews}
      >
        <input
          className={`form-control mb-1 ${errors.title ? "is-invalid" : ""}`}
          placeholder="Title *"
          value={title}
          onChange={e => { setTitle(e.target.value); setErrors({ ...errors, title: "" }); }}
        />
        <div className="text-danger mb-2">{errors.title}</div>

        <input
          className={`form-control mb-1 ${errors.headline ? "is-invalid" : ""}`}
          placeholder="Headline *"
          value={headline}
          onChange={e => { setHeadline(e.target.value); setErrors({ ...errors, headline: "" }); }}
        />
        <div className="text-danger mb-2">{errors.headline}</div>

        <input
          className={`form-control mb-1 ${errors.source ? "is-invalid" : ""}`}
          placeholder="Source *"
          value={source}
          onChange={e => { setSource(e.target.value); setErrors({ ...errors, source: "" }); }}
        />
        <div className="text-danger mb-2">{errors.source}</div>

        <select
          className={`form-control mb-1 ${errors.categoryId ? "is-invalid" : ""}`}
          value={categoryId}
          onChange={e => { setCategoryId(e.target.value); setErrors({ ...errors, categoryId: "" }); }}
        >
          <option value="">-- Select category --</option>
          {categories.map(c => (
            <option key={c.categoryId} value={c.categoryId}>
              {c.categoryName}
            </option>
          ))}
        </select>
        <div className="text-danger mb-2">{errors.categoryId}</div>

        <textarea
          className={`form-control mb-1 ${errors.content ? "is-invalid" : ""}`}
          rows={5}
          placeholder="Content *"
          value={content}
          onChange={e => { setContent(e.target.value); setErrors({ ...errors, content: "" }); }}
        />
        <div className="text-danger mb-2">{errors.content}</div>

        <select
          className="form-control"
          value={status ? "1" : "0"}
          onChange={e => setStatus(e.target.value === "1")}
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </SimpleModal>

      {/* CONFIRM DELETE */}
      <ConfirmModal
        show={showConfirm}
        title="Confirm delete"
        message="This news will be set to Inactive. Continue?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
