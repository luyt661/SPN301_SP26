import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListOfOrchid from "./components/ListOfOrchid";
import orchids from "./data/orchids";
import Container from "react-bootstrap/Container";

function App() {
  // 🔥 THIẾU DÒNG NÀY → gây lỗi
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <Header
        searchText={searchText}
        onSearchChange={setSearchText}
      />

      <main className="py-4">
        <Container>
          <h1 className="text-center mb-3">Orchid Gallery</h1>
          <p className="text-center text-muted mb-4">Lab - Lab 1</p>

          {/* Truyền searchText xuống List */}
          <ListOfOrchid orchids={orchids} searchText={searchText} />
        </Container>
      </main>

      <Footer
        avatar="https://i.pravatar.cc/150"
        name="Luyt Phan"
        email="luytphan@gmail.com"
      />
    </>
  );
}

export default App;
