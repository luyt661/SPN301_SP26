import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListOfOrchid from "./components/ListOfOrchid";
import About from "./components/About";
import Contact from "./components/Contact";
import OrchidDetail from "./components/OrchidDetail";
import orchids from "./data/orchids";
import { useState } from "react";
import Container from "react-bootstrap/Container";

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <Header
        searchText={searchText}
        onSearchChange={setSearchText}
      />

      <main className="py-4">
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1 className="text-center mb-3">Orchid Gallery</h1>
                  <p className="text-center text-muted mb-4">Lab - Lab 1</p>
                  <ListOfOrchid orchids={orchids} searchText={searchText} />
                </>
              }
            />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/orchid/:id" element={<OrchidDetail />} />
          </Routes>
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
