import {useState} from "react";
import {AuthenticationContext} from "../context/auth-context";

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);

  return (
    <AuthenticationContext.Provider value={{user, setUser}}>
      {children}
    </AuthenticationContext.Provider>
  );
}
