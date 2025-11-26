import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="teste" 
        options={{ title: "Teste" }}
      />
{/*       <Stack.Screen 
        name="index" 
        options={{ title: "Auth Home" }}
      />
      <Stack.Screen 
        name="register" 
        options={{ title: "Register" }}
      /> */}
    </Stack>
  );
}
