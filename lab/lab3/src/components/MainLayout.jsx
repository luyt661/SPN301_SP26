import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./Header";
import Footer from "./Footer";
import { useLogin } from "../context/LoginContext"; // 👈 thêm dòng này

function MainLayout({ searchText, setSearchText }) {
  const { logout } = useLogin(); // 👈 lấy logout từ context

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        searchText={searchText}
        onSearchChange={setSearchText}
        onLogout={logout}   // 👈 đổi chỗ này
      />

      <main className="flex-grow-1 py-4">
        <Container>
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
