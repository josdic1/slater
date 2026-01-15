import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect } from "react";


export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);

  const loggedIn = true





  const value = {
    loading,
    loggedIn
  };

//   if (loading) {
//     return <div>LOADING...</div>;
//   }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
