import React, { useState, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Orchid from "./Orchid";
import FilterSort from "./FilterSort";

function ListOfOrchid({ 
  orchids = [], 
  searchText = "", 
  isManage = false        // 👈 THÊM PROP
}) {
  // ===== STATE =====
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortType, setSortType] = useState("");

  // 1. Lấy danh sách category (tối ưu bằng useMemo)
  const categories = useMemo(() => {
    return [...new Set(orchids.map((o) => o.category))];
  }, [orchids]);

  // 2. Lọc + Sắp xếp danh sách orchid
  const displayedOrchids = useMemo(() => {
    let filtered = orchids.filter((o) => {
      const matchCategory =
        selectedCategory === "" || o.category === selectedCategory;

      const matchSearch =
        o.orchidName
          .toLowerCase()
          .includes(searchText.toLowerCase());

      return matchCategory && matchSearch;
    });

    // Sort
    switch (sortType) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) =>
          a.orchidName.localeCompare(b.orchidName)
        );
        break;
      case "name-desc":
        filtered.sort((a, b) =>
          b.orchidName.localeCompare(a.orchidName)
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [orchids, searchText, selectedCategory, sortType]);

  return (
    <Container className="py-2">
      {/* ===== KHU VỰC BỘ LỌC & SORT ===== */}
      <div className="bg-light p-3 rounded mb-4 shadow-sm border">
        <FilterSort
          categories={categories}
          onFilterChange={setSelectedCategory}
          onSortChange={setSortType}
        />
      </div>

      {/* ===== DANH SÁCH ORCHID ===== */}
      <Row className="g-3 g-md-4 justify-content-center">
        {displayedOrchids.map((orchid) => (
          <Col 
            key={orchid.id} 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            className="d-flex justify-content-center"
          >
            {/* 👇 TRUYỀN isManage XUỐNG ORCHID */}
            <Orchid 
              {...orchid} 
              isManage={isManage} 
            />
          </Col>
        ))}
      </Row>

      {/* ===== TRƯỜNG HỢP KHÔNG CÓ KẾT QUẢ ===== */}
      {displayedOrchids.length === 0 && (
        <div className="text-center py-5">
          <h4 className="text-muted">No orchids found.</h4>
        </div>
      )}
    </Container>
  );
}

export default ListOfOrchid;
