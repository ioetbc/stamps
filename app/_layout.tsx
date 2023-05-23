import {useRouter, Stack} from "expo-router";
import {AuthProvider} from "../providers/auth-provider";
import {Plus} from "../components/logo";
import {Title} from "../components/title";

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
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "",
          headerBackButtonMenuEnabled: false,
          headerStyle: {
            backgroundColor: "white",
          },
          headerLeft() {
            return <Title text="Wallet" />;
          },
          headerRight() {
            return <Plus handlePress={handleRouteChange} />;
          },
        }}
      />
    </AuthProvider>
  );
}
