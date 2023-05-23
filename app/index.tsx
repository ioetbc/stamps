import * as WebBrowser from "expo-web-browser";
import App from "../App";

WebBrowser.maybeCompleteAuthSession();

export default function Root() {
  return <App />;
}
