import {useContext} from "react";
import Home from "./app/home";
import Login from "./app/login";
import {AuthenticationContext} from "./context/auth-context";

export default function App() {
  const {user} = useContext(AuthenticationContext);
  return user ? <Home /> : <Login />;
}
