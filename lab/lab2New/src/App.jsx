import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import MainLayout from "./components/MainLayout";
import ListOfOrchid from "./components/ListOfOrchid";
import About from "./components/About";
import Contact from "./components/Contact";
import OrchidDetail from "./components/OrchidDetail";
import orchids from "./data/orchids";

import Login from "./pages/login"; 

function App() {
  const [searchText, setSearchText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  return (
    <Routes>
      <Route
        element={
          <MainLayout
            searchText={searchText}
            setSearchText={setSearchText}
            onLogout={handleLogout}
          />
        }
      >
        <Route
          path="/"
          element={
            <>
              <h1 className="text-center mb-3 fw-bold">
                Orchid Gallery
              </h1>
              <p className="text-center text-muted mb-4">
                Explore our beautiful collection
              </p>
              <ListOfOrchid
                orchids={orchids}
                searchText={searchText}
              />
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
