// utils/auth.ts
"use server";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers'



interface User {
  id: number;
  sub: string;
  email: string;
  roles: string[];
}

export const getAuthState = (): { token: string | null; user: User | null } => {
    const token = cookies().get('token')?.value;
  if (token) {
      const decodedToken = jwtDecode<User>(token);
    return { token, user: decodedToken };
  }
  return { token: null, user: null };
};

export const setAuthState = (token: string | null, user: User | null) => {
  if (token) {
    cookies().set('token', token);
    if (user) {
      cookies().set('user', JSON.stringify(user));
    }
  } else {
    cookies().delete('token');
    cookies().delete('user');
  }
};

export const login = async (username: string, password: string) => {
  try {
    console.log("received login call for",username)
    const response = await axios.post('http://localhost:8000/api/auth/login', {
      username,
      password,
    });
    const token = response.data.accessToken;
    const decodedToken = jwtDecode<User>(token);
    setAuthState(token, decodedToken);
    return decodedToken
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};

export const logout = () => {
  setAuthState(null, null);
};