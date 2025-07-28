// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('pt_token'));

  const signin = (jwt) => {
    localStorage.setItem('pt_token', jwt);
    setToken(jwt);
  };
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
