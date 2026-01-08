import "./App.css";
import Headers from "./components/Header";
import Footer from "./components/Footer";
import Orchid from "./components/Orchid";

import orchids from "./data/orchids";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListOfOrchid from "./components/ListOfOrchid";

function App() {
  return (
    <>
      <Headers />

      <main className="py-4">
        <Container>
          <h1 className="text-center mb-3">Orchid Gallery</h1>
          <p className="text-center text-muted mb-4">
            Slot 3 – Exercise 2 (map + props)
          </p>

          <ListOfOrchid />
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
