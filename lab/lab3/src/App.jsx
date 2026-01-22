import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import MainLayout from "./components/MainLayout";
import ListOfOrchid from "./components/ListOfOrchid";
import About from "./components/About";
import Contact from "./components/Contact";
import OrchidDetail from "./components/OrchidDetail";

import Login from "./pages/login";
import ManageOrchids from "./pages/ManageOrchids";   // 👈 CHỈ GIỮ MANAGE
import { useLogin } from "./context/LoginContext";

import { getAllOrchids } from "./api/orchidApi";

function App() {
  const [searchText, setSearchText] = useState("");
  const [orchids, setOrchids] = useState([]);

  const { isLoggedIn } = useLogin();

  useEffect(() => {
    getAllOrchids()
      .then((res) => setOrchids(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <Routes>
      <Route
        element={
          <MainLayout
            searchText={searchText}
            setSearchText={setSearchText}
          />
        }
      >
        {/* ===== HOME (CHỈ HIỂN THỊ) ===== */}
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
                isManage={false}
              />
            </>
          }
        />

        {/* ===== TRANG QUẢN LÝ CRUD ===== */}
        <Route path="/manage" element={<ManageOrchids />} />

        {/* DETAIL */}
        <Route path="/orchid/:id" element={<OrchidDetail />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
