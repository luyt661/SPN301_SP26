import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const role = localStorage.getItem('role');
    // Nếu không phải Admin (role 1), đá về trang chủ
    return role === "1" ? children : <Navigate to="/" />;
};

export default PrivateRoute;