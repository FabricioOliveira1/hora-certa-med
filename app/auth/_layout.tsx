import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
 
       <Stack.Screen 
        name="index" 
        options={{ title: "Auth Home" }}
      />
    
       <Stack.Screen
        name="register" 
        options={{ 
          title: "", 
          headerShown: true, 
          headerBackButtonDisplayMode: 'minimal',
          headerStyle: { backgroundColor: '#009183' }}}
      />
    
    </Stack>
  );
}
