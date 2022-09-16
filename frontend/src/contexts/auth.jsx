import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import {api } from "../services/api";




export const AuthContext = createContext();


export const AuthProvicer = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const coduser = localStorage.getItem('coduser');

        if(token) {
            api.defaults.headers.Authorization = `token ${token}`
            api.get(`/auth/${coduser}/`)
            .then((res) => {
                setUser(res)
            })
            
        }
        setLoading(false);
    }, []);


    const login = async (username, password) => {
            api.post('/auth/', { username, password})
            .then(( res ) => {
                const token = res.data.token
                const coduser = res.data.coduser
                localStorage.setItem("token", token);
                localStorage.setItem("coduser", JSON.stringify(coduser));
                api.defaults.headers.Authorization = `token ${token}`
                api.get(`/auth/${coduser}/`)
                .then((res) => {
                    setUser(res)
                    navigate("/")
                })
                
            })
            .catch((err) => {
                setError(err)
            })

    };
    
    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("coduser")
        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/login")
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, error }}>{children}</AuthContext.Provider>
    )
}