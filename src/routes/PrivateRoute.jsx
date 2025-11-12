import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/shared/LoadingSpinner"; 


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    
    if (loading) {
        // Loading Spinner component
        return <LoadingSpinner />; 
    }

    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login" replace />;
};

export default PrivateRoute;