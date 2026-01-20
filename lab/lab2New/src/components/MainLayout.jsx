import React from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./Header";
import Footer from "./Footer";

function MainLayout({ searchText, setSearchText, setIsLoggedIn }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        searchText={searchText}
        onSearchChange={setSearchText}
        onLogout={() => setIsLoggedIn(false)}
      />

      <main className="flex-grow-1 py-4">
        <Container>
          {/* Nơi hiển thị nội dung các trang con */}
          <Outlet />
        </Container>
      </main>

      <Footer
        avatar="https://i.pravatar.cc/150"
        name="Luyt Phan"
        email="luytphan@gmail.com"
      />
    </div>
  );
}

export default MainLayout;