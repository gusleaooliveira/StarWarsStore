import CreateUserScreen from "@/app/create-user";
import LoginScreen from "@/app/login";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator()

export default function AuthNavigator() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateUser" component={CreateUserScreen} />
      </Stack.Navigator>
    );
  }