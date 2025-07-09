import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuthApi } from '../api/ApiHandler'; 

interface PrivateRouteProps {
  element: React.ComponentType<any>;
  requiredRole?: string | string[]; 
}

const PrivateRoute = ({ element: Element, requiredRole }: PrivateRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication via API...");
        const response = await checkAuthApi();
        console.log(response.data);
        if (
          response &&
          response.data &&
          response.data.success === true &&
          response.data.user &&
          typeof response.data.user._id === "string"
        ) {      
         if (
    requiredRole &&
    !requiredRole.includes(response.data.user.role)
  )  {
            setAuthError("You do not have permission to access this page.");
            setIsAuthenticated(false);
          } else if (response.data.user.isActive === false) {
            setAuthError("Your account is inactive. Please contact support.");
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
            setUserData(response.data);
            setAuthError(null);
          }
        } else {
          setAuthError("Authentication failed. Please log in again.");
          setIsAuthenticated(false);
        }
      } catch (err: any) {
        console.error("Auth check error:", err);
        setAuthError(err?.response?.data?.message || "Authentication error. Please try again.");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [requiredRole]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (authError) {
   
  return (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">
        Please login to Access this page
      </h2>
     
      <a
        href="/login"
        className="text-blue-500 underline"
      >
        Click here to login
      </a>
    </div>
  </div>
);

  }

  return isAuthenticated ? <Element userData={userData} /> : <Navigate to="/login" />;
};

export default PrivateRoute;