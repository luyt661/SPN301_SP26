import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StaffRooms from './pages/StaffRooms';
import StaffBookings from './pages/StaffBookings';
import CustomerBooking from './pages/CustomerBooking';
import StaffLayout from './layout/StaffLayout';
import CustomerLayout from './layout/CustomerLayout';
import CustomerHistory from './pages/CustomerHistory';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/staff" element={
        <PrivateRoute roleRequired="STAFF">
          <StaffLayout />
        </PrivateRoute>
      }>
        <Route path="rooms" element={<StaffRooms />} />
        <Route path="bookings" element={<StaffBookings />} />
        <Route path="customers" element={<div>Danh sách khách hàng</div>} />
      </Route>

      <Route path="/customer" element={
        <PrivateRoute roleRequired="CUSTOMER">
          <CustomerLayout />
        </PrivateRoute>
      }>
        <Route path="rooms" element={<CustomerBooking />} />
        <Route path="history" element={<CustomerHistory />} />
      </Route>

      <Route path="*" element={<div style={{textAlign:'center',marginTop:40,fontSize:24}}>404 - Không tìm thấy trang</div>} />
    </Routes>
  );
}

export default App;