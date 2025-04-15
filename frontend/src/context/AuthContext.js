import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, registerUser } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      setUserToken(response.token);
      setUserInfo(response.user);
      await AsyncStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(response.user));
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await registerUser(name, email, password);
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const user = await AsyncStorage.getItem('userInfo');
      setUserToken(token);
      setUserInfo(JSON.parse(user));
      setIsLoading(false);
    } catch (error) {
      console.log('isLoggedIn error', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        login,
        logout,
        register,
      }}>
      {children}
    </AuthContext.Provider>
  );
};