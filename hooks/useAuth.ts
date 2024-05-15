"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { login, logout, getAuthState} from '@/utils/auth';
import router from 'next/router';

const loginAction = (username:string ,password:string) =>{

    login(username,password);
} 

const logoutAction = () =>{
    logout()
}
interface User {
  id: number;
  sub: string;
  email: string;
  roles: string[];
}

interface AuthState {
    
  token: string | null;
  user: User | null;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuth = (): AuthState => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthState = async () => {
      try {
        const { token, user } = await getAuthState(); // await here inside the async function
        setToken(token);
        setUser(user);
        console.log("Fetched token:", token);
      } catch (error) {
        console.error("Error fetching auth state:", error);
      }
  };
  useEffect(() => {
    fetchAuthState(); 
  }, []);

  const login = async (username: string, password: string) => {
   console.log("Calling login action for util for", username)
   const token = await loginAction(username,password)
   if (user) {
    await fetchAuthState(); // Fetch the updated auth state
    router.push('/dashboard');
  } else {
    // Handle login error
  }

  };

  const logout = () => {

    logoutAction()
    window.location.reload()


  };

  return { token, user, error, login, logout };
};

export default useAuth;