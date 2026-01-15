import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import orchids from "./data/orchids";

// Import các components
import MainLayout from "./components/MainLayout";
import ListOfOrchid from "./components/ListOfOrchid";
import About from "./components/About";
import Contact from "./components/Contact";
import OrchidDetail from "./components/OrchidDetail";
import Login from "./components/Login";

function App() {
  const [searchText, setSearchText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Routes>
      <Route 
        element={
          <MainLayout 
            searchText={searchText} 
            setSearchText={setSearchText} 
            setIsLoggedIn={setIsLoggedIn} 
          />
        }
      >
        <Route
          path="/"
          element={
            <>
              <h1 className="text-center mb-3 fw-bold">Orchid Gallery</h1>
              <p className="text-center text-muted mb-4">Explore our beautiful collection</p>
              <ListOfOrchid orchids={orchids} searchText={searchText} />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orchid/:id" element={<OrchidDetail />} />
      </Route>
    </Routes>
  );
}

export default App;