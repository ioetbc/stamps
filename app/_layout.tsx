import {useRouter, Stack} from "expo-router";
import {AuthProvider} from "../providers/auth-provider";
import {Plus} from "../components/logo";

export default function Layout() {
  const router = useRouter();

  const handleRouteChange = () => {
    router.push("scan");
  };

  return (
    <AuthProvider>
      <Stack
        initialRouteName="home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "white",
          },
          headerRight(props) {
            return <Plus handlePress={handleRouteChange} />;
          },
        }}
      />
    </AuthProvider>
  );
}
