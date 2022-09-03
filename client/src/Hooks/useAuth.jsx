import { createContext, useState, useContext, useEffect } from "react";
// import jwt from 'jsonwebtoken'

const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    
    const [u, setU] = useState(JSON.parse(localStorage.getItem('user')) || null)
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null)
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null)
    useEffect(() => {
        console.log('called');
    }, [accessToken])

    const setUser = (user, accessToken, refreshToken) => {
        setU(user)
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

    }
    const removeUser = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setU(null)
        setAccessToken(null)
        setRefreshToken(null)
    }

    return (

        <AuthContext.Provider value={{ user: u,accessToken, refreshToken, setUserLogin:setUser, setUserLogout:removeUser }}>
            {children}
        </AuthContext.Provider >
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}