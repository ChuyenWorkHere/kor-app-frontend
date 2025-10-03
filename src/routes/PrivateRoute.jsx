import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { checkAuth } from '../utils/authUtils';

const PrivateRoute = () => {
    const isAuthenticated = checkAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace/>;
}

export default PrivateRoute