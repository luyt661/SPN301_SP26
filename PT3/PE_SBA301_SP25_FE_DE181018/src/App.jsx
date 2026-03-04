import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import CarPage from "./pages/CarPage";
import CarManagementPage from "./pages/CarManagementPage";

function App() {
  const role = localStorage.getItem("role");

  return (
    <Routes>
      {/* Trang Login không dùng Layout */}
      <Route path="/login" element={<LoginPage />} />

      {/* Trang chủ: Mở web lên hiện Car List luôn */}
      <Route path="/" element={<MainLayout><CarPage /></MainLayout>} />

      {/* Trang Admin: Chỉ role 1 mới vào được */}
      <Route path="/admin/cars" element={
        role === "1" ? <MainLayout><CarManagementPage /></MainLayout> : <Navigate to="/" />
      } />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;