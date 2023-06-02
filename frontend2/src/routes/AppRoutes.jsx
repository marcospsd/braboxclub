import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/Login'
import { AuthContext, AuthProvicer } from '../contexts/auth'

const AppRoutes = () => {
    const Private = ({children}) =>{
        const { authenticated, loading } = useContext(AuthContext);
        
        if (loading) {
            return <div className="loading">Carregando...</div>
        }
        
        if(!authenticated) {
            return <Navigate to="/login" />
        }


        return children;
    }
    return (
        <BrowserRouter>
            <AuthProvicer>
                <Routes>
                    <Route exact path="/login" element={<LoginPage/>} />
                    <Route exact path="/" element={<Private><HomePage/></Private>} />
                </Routes>
            </AuthProvicer>
        </BrowserRouter>
    );
};

export default AppRoutes;