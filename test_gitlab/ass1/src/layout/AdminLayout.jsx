import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function AdminLayout() {
  const isLogin = localStorage.getItem("isLogin");
  const role = localStorage.getItem("role"); // 1 = Admin

  if (!isLogin || role !== "1") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-0">
            <Sidebar />
          </div>
          <div className="col-10 p-4">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
