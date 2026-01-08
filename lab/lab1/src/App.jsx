import "./App.css";
import Headers from "./components/Header";
import Footer from "./components/Footer";
import ListOfOrchid from "./components/ListOfOrchid";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <>
      <Headers />

      <main className="py-4">
        <Container>
          <h1 className="text-center mb-3">Orchid Gallery</h1>
          <p className="text-center text-muted mb-4">
            lab - lab1 
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
