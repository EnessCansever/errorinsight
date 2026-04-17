import { createContext, useState, useEffect, useCallback, useContext } from 'react'
import { registerUser, loginUser, getCurrentUser } from '../services/authApi'

const AuthContext = createContext(null)

const AUTH_TOKEN_KEY = 'fixora_auth_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem(AUTH_TOKEN_KEY)

      if (storedToken) {
        try {
          const userData = await getCurrentUser(storedToken)
          setToken(storedToken)
          setUser(userData.user)
        } catch {
          // Token geçersiz veya süresi dolmuş
          localStorage.removeItem(AUTH_TOKEN_KEY)
          setToken(null)
          setUser(null)
        }
      }

      setIsAuthLoading(false)
    }

    initializeAuth()
  }, [])

  const register = useCallback(async (name, email, password) => {
    setIsAuthLoading(true)
    try {
      const data = await registerUser(name, email, password)
      localStorage.setItem(AUTH_TOKEN_KEY, data.token)
      setToken(data.token)
      setUser(data.user)
    } finally {
      setIsAuthLoading(false)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setIsAuthLoading(true)
    try {
      const data = await loginUser(email, password)
      localStorage.setItem(AUTH_TOKEN_KEY, data.token)
      setToken(data.token)
      setUser(data.user)
    } finally {
      setIsAuthLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const isAuthenticated = !!token && !!user

  const value = {
    user,
    token,
    isAuthenticated,
    isAuthLoading,
    register,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
