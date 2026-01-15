import React from "react";
import { Form, Row, Col } from "react-bootstrap";

function FilterSort({ categories, onFilterChange, onSortChange }) {
  return (
    <Form className="mb-4">
      <Row>
        {/* FILTER BY CATEGORY */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>Filter by Category</Form.Label>
            <Form.Select onChange={(e) => onFilterChange(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        {/* SORT */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>Sort by</Form.Label>
            <Form.Select onChange={(e) => onSortChange(e.target.value)}>
              <option value="">No sorting</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name-asc">Name: A → Z</option>
              <option value="name-desc">Name: Z → A</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

export default FilterSort;
