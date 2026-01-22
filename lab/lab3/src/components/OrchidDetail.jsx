import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrchidById } from "../api/orchidApi";

function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);

  // 👉 Gọi API lấy orchid theo id
  useEffect(() => {
    getOrchidById(id)
      .then((res) => {
        setOrchid(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orchid:", err);
        setOrchid(null);
        setLoading(false);
      });
  }, [id]);

  // 👉 Trạng thái đang load
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading...</h4>
      </div>
    );
  }

  // 👉 Không tìm thấy orchid
  if (!orchid) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">Orchid not found</h2>
        <button
          className="btn btn-outline-secondary mt-3"
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </button>
      </div>
    );
  }

  return (
    <div className="container py-3 py-md-5">
      <div
        className="card shadow-lg border-0 mx-auto overflow-hidden"
        style={{ maxWidth: 900 }}
      >
        <div className="row g-0">
          {/* Image Section */}
          <div className="col-12 col-md-5">
            <img
              src={
                orchid.image.startsWith("/")
                  ? orchid.image
                  : "/" + orchid.image
              }
              alt={orchid.orchidName}
              className="img-fluid w-100"
              style={{
                height: "100%",
                minHeight: "300px",
                maxHeight: "500px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Content Section */}
          <div className="col-12 col-md-7 d-flex align-items-center">
            <div className="card-body p-4 p-lg-5">
              <div className="mb-2">
                {orchid.isSpecial && (
                  <span className="badge bg-warning text-dark mb-2 py-2 px-3 rounded-pill shadow-sm">
                    🌟 Special Orchid
                  </span>
                )}
              </div>

              <h2 className="card-title fw-bold mb-1 text-dark">
                {orchid.orchidName}
              </h2>

              <p className="text-muted mb-3 fs-5">
                <span className="fw-bold text-secondary">Category:</span>{" "}
                {orchid.category}
              </p>

              <hr className="my-4 opacity-10" />

              <h3 className="text-success fw-bold mb-4">
                {orchid.price.toLocaleString()}{" "}
                <span className="fs-6">VND</span>
              </h3>

              <div className="mb-4">
                <h6 className="fw-bold text-uppercase small text-muted mb-2">
                  Description
                </h6>
                <p
                  className="card-text text-secondary"
                  style={{ lineHeight: 1.8, textAlign: "justify" }}
                >
                  {orchid.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto d-grid d-md-flex gap-3">
                <button
                  className="btn btn-outline-secondary btn-lg px-4 fs-6"
                  onClick={() => navigate(-1)}
                >
                  ⬅ Back
                </button>
                <button className="btn btn-primary btn-lg px-5 fs-6 shadow">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrchidDetail;
