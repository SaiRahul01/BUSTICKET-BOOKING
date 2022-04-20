import { Navigate, Outlet } from "react-router-dom";



 const ProtectedRoute = ({isLogged}) => {
   
   return isLogged ==="true" ? <Outlet /> : <Navigate to="/login " />;
 };

 export default ProtectedRoute;