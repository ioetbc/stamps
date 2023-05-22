import {createContext} from "react";
import {User} from "firebase/auth";

export const AuthenticationContext = createContext({
  user: null as User | null,
  setUser: (value: User | null) => {},
});
