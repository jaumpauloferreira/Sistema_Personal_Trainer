// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  // Carrega o token do localStorage ao iniciar o app
  useEffect(() => {
    const storedToken = localStorage.getItem('pt_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Salva o token no estado e localStorage
  const signin = (jwt) => {
    localStorage.setItem('pt_token', jwt);
    setToken(jwt);
  };

  // Limpa token do estado e localStorage
  const signout = () => {
    localStorage.removeItem('pt_token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
