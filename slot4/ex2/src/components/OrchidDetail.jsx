import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import orchids from "../data/orchids";

function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tìm orchid theo id (id có thể là string, cần ép kiểu nếu dữ liệu là số)
  const orchid = orchids.find((o) => String(o.id) === String(id));

  if (!orchid) {
    return (
      <div className="container py-5">
        <h2>Orchid not found</h2>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">{orchid.orchidName}</h2>
      <img
        src={orchid.image.startsWith('/') ? orchid.image : '/' + orchid.image}
        alt={orchid.orchidName}
        className="img-fluid rounded mb-3"
      />
      <p><b>Category:</b> {orchid.category}</p>
      <p><b>Price:</b> {orchid.price.toLocaleString()} VND</p>
      <p><b>Description:</b> {orchid.description}</p>
      {orchid.isSpecial && (
        <div className="mb-2 text-warning"><b>🌟 Special Orchid</b></div>
      )}
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default OrchidDetail;