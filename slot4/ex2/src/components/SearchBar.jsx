import React from "react";
import { Form } from "react-bootstrap";

function SearchBar({ onSearch }) {
  return (
    <Form className="mb-4">
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search orchid by name..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
}

export default SearchBar;
