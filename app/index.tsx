import * as WebBrowser from "expo-web-browser";
import {AuthProvider} from "../providers/auth-provider";
import App from "../App";

WebBrowser.maybeCompleteAuthSession();

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
