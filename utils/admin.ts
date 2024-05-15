import axios from 'axios';

export interface PreRegistration {
  id?: number;
  name: string;
  childName: string;
  age: number;
  email: string;
  password: string;
  plan: string;
  schedule: string;
  phone: string;
}

export const fetchPreRegistrations = async (token: string | null): Promise<PreRegistration[] | null> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get<PreRegistration[]>('http://localhost:8000/api/preinscrits', config);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};

export const createPreRegistration = async (token: string | null, preRegistration: PreRegistration): Promise<PreRegistration | null> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post<PreRegistration>('http://localhost:8000/api/preinscrits/add', preRegistration, config);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};