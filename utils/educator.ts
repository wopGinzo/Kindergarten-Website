import axios from "axios";
import { Session } from "./admin";

export interface educator{
    id: number,
    name: string,
    subject: string,
    email: string,
    phoneNumber: string
}


export const getEducator = async (token: string | null, userName?: string | null): Promise<educator | null> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
            username: userName,
          },
      };
      console.log("fetchin educator for user",userName)
      const educatorResponse = await axios.get(`http://localhost:8000/api/educator`, config);
      return educatorResponse.data
    } catch (error: any) {
      console.error(error.message);
      return error;
    }
  };
  

export const fetchEducatorSessions = async (token: string | null, educatorId?: number): Promise<Session[] | null> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get<Session[]>(`http://localhost:8000/api/sessions/educator/${educatorId}`, config);
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      return [];
    }
  };
  