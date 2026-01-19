import { Stack } from "expo-router";

export default function Layout(): React.ReactElement {
  return <Stack screenOptions={{ headerShown: false }} >
  <Stack.Screen name="index" />
  <Stack.Screen name="addTreatment" />
    </Stack>;
}