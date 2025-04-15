import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <AuthContext.Consumer>
      {(authContext) => (
        <NavigationContainer>
          <Stack.Navigator>
            {authContext.userToken == null ? (
              <>
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerTitle: 'Usuários Cadastrados',
                  headerRight: () => (
                    <Button
                      title="Sair"
                      onPress={() => authContext.logout()}
                    />
                  ),
                }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </AuthContext.Consumer>
  );
}