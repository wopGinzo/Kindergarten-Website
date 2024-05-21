import axios, { AxiosResponse } from "axios";
import { Session, group } from "./admin";
export interface Evaluation {
    id?: number;
    child: Child;
    educator: educator;
    mark: number;
    comment: string;
}
export interface Child {
    id: number;
    name: string;
    age: number;
    plan: string;
    schedule: string;
    evaluations: Evaluation[]
    groupId: number
}
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
  

export const getChildrenByGroupId = async (token: string | null, groupId: number): Promise<Child[] | null> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response: AxiosResponse<Child[]> = await axios.get(`http://localhost:8000/api/children/${groupId}`, config);
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  };

export const createEvaluation = async (token: string | null, evaluation: Evaluation): Promise<Evaluation | null> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response: AxiosResponse<Evaluation> = await axios.post('http://localhost:8000/api/evaluations/child/post', evaluation, config);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};

export const getEvaluationsByChildId = async (token: string | null, childId: number): Promise<Evaluation[] | null> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response: AxiosResponse<Evaluation[]> = await axios.get(`http://localhost:8000/api/evaluations/child/${childId}`, config);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};

export const getEducatorEvalutationsPerChild = async (token: string | null, childId: number, educatorId?: number): Promise<Evaluation[] | null> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response: AxiosResponse<Evaluation[]> = await axios.get(`http://localhost:8000/api/evaluations/educator/${educatorId}/child/${childId}`, config);
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  };
  

export const getEvaluationsByEducatorId = async (token: string | null, educatorId: number): Promise<Evaluation[] | null> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response: AxiosResponse<Evaluation[]> = await axios.get(`http://localhost:8000/api/evaluations/educator/${educatorId}`, config);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};

export const deleteEvaluation = async (token: string | null, evaluationId?: number): Promise<void> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response: AxiosResponse = await axios.delete(`http://localhost:8000/api/evaluations/evaluation/${evaluationId}`, config);
  
      if (response.status === 204) {
        console.log('Evaluation deleted successfully');
      } else {
        console.error('Failed to delete evaluation');
      }
    } catch (error: any) {
      console.error('Error deleting evaluation:', error.message);
    }
  };