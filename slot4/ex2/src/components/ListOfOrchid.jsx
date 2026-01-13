import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Orchid from "./Orchid";
import FilterSort from "./FilterSort";

function ListOfOrchid({ orchids = [], searchText = "" }) {
  // ===== STATE =====
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortType, setSortType] = useState("");

  // ===== GET UNIQUE CATEGORIES =====
  const categories = [...new Set(orchids.map(o => o.category))];

  // ===== FILTER (CATEGORY + SEARCH) =====
  let filteredOrchids = orchids.filter(o => {
    const matchCategory =
      selectedCategory === "" || o.category === selectedCategory;

    const matchSearch =
      o.orchidName.toLowerCase().includes(searchText.toLowerCase());

    return matchCategory && matchSearch;
  });

  // ===== SORT =====
  let displayedOrchids = [...filteredOrchids];

  switch (sortType) {
    case "price-asc":
      displayedOrchids.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      displayedOrchids.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      displayedOrchids.sort((a, b) =>
        a.orchidName.localeCompare(b.orchidName)
      );
      break;
    case "name-desc":
      displayedOrchids.sort((a, b) =>
        b.orchidName.localeCompare(a.orchidName)
      );
      break;
    default:
      break;
  }

  // ===== RENDER =====
  return (
    <Container className="py-5">
      {/* FILTER + SORT */}
      <FilterSort
        categories={categories}
        onFilterChange={setSelectedCategory}
        onSortChange={setSortType}
      />

      {/* ORCHID LIST */}
      <Row className="g-4">
        {displayedOrchids.map(orchid => (
          <Col
            key={orchid.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="d-flex"
          >
            <Orchid {...orchid} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ListOfOrchid;
