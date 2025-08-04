// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('pt_token');
    if (storedToken) {
      setToken(storedToken);
      const decoded = jwtDecode(storedToken);
      setUsuario(decoded);
    }
  }, []);

  const signin = (jwt) => {
    localStorage.setItem('pt_token', jwt);
    setToken(jwt);
    const decoded = jwtDecode(jwt);
    setUsuario(decoded);
  };

  const signout = () => {
    localStorage.removeItem('pt_token');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ token, usuario, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
