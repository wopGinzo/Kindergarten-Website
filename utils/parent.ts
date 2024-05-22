import axios from "axios";
import { Child } from "./educator";
import { Session } from "./admin";

export interface parent{
  email: string;
  nom?: null,
  id: number,
  name: string,
  phoneNumber: string
}
export interface AbsenceDto {
    id: number;
    description: string;
    justification: string;
    childId: number;
    startDate: string;
    endDate: string;
}


export const getParent = async (token: string | null, userName?: string | null): Promise<parent | null> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
            username: userName,
          },
      };
      console.log("fetchin parent for user",userName)
      const parentResponse = await axios.get(`http://localhost:8000/api/parent`, config);
      return parentResponse.data
    } catch (error: any) {
      console.error(error.message);
      return error;
    }
  };
  

export const getChild = async (token: string | null, parentUsername?: string | null): Promise<Child | null> => {
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },

          };
      console.log("fetching child for parent ",parentUsername)
      const child = await axios.get(`http://localhost:8000/api/child?parentUsername=${parentUsername}`, config);
      return child.data
    } catch (error: any) {
      console.error(error.message);
      return error;
    }
  };
  

  export const addAbsence = async (token: string | null, absenceDto: AbsenceDto): Promise<AbsenceDto | null> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post<AbsenceDto>("http://localhost:8000/api/absences", absenceDto, config);
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  };
  
  export const getChildAbsences = async (token: string | null, childId?: number): Promise<AbsenceDto[] | null> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get<AbsenceDto[]>(`http://localhost:8000/api/absences/${childId}`, config);
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  };

