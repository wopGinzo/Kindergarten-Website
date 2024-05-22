import axios from 'axios';
import { AbsenceDto, parent } from './parent';

export interface admin{
  id: number,
  nom: string,
  name?: string,
  phoneNumber?: string
}
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
export interface Session {
  id: number;
  moduleName: string;
  time: string;
  day: string;
  group?: group;
  groupId: number;
  educatorId: number;
}

export interface staffForm {
  id?: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  subject: string;
}


export interface group{
  id?: number;
  plan: string;
  schedule: string
}


export const getAdmin = async (token: string | null, userName?: string | null): Promise<admin | null> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
          username: userName,
        },
    };
    console.log("fetchin admin for user",userName)
    const adminResponse = await axios.get(`http://localhost:8000/api/admin`, config);
    return adminResponse.data
  } catch (error: any) {
    console.error(error.message);
    return error;
  }
};

export const getAllParents = async (token: string | null): Promise<parent[] | null> => {
  try {
    const response = await axios.get<parent[]>('http://localhost:8000/api/parents', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};

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
    console.error("error : ",error.message);
    return null;
  }
};
export const validatePreRegistration = async (preRegistration: PreRegistration, token: string | null): Promise<number | null> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const registerResponse = await axios.post('http://localhost:8000/api/auth/register', {
      username: preRegistration.email,
      password: preRegistration.password,
      roles: ['PARENT'],
    }, config);

    const userId = registerResponse.data.split(' ')[1];
    console.log("created user with id ",userId)
    const parentData = {
      name: preRegistration.name, 
      phoneNumber: preRegistration.phone, 
    };

    
    const updateResponse = await axios.put(`http://localhost:8000/api/parents/${userId}`, parentData, config);
    const parentId = updateResponse.data.split(' ')[1];

    const childData = {
      name: preRegistration.childName,
      age: preRegistration.age,
      plan: preRegistration.plan,
      schedule: preRegistration.schedule,
      parentId: parentId
  
    }

    const childResponse = await axios.post('http://localhost:8000/api/child', childData, config);
    console.log(childResponse)
    console.log("created child with id ",childResponse.data.split(' ')[1])
    return childResponse.data.split(' ')[1];
  } catch (error: any) {
    console.error(error.message);
    return error;
  }
};





export const deletePreRegistration = async (preRegistrationId: number, token: string | null) => {
  
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const deleteResponse = await axios.delete(`http://localhost:8000/api/preinscrit/${preRegistrationId}`, config)
  
    return deleteResponse
  } catch (error: any) {
    console.error(error.message)
    return error
  
  }
  
}


export const getAllAbsences = async (token: string | null): Promise<AbsenceDto[] | null> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get<AbsenceDto[]>("http://localhost:8000/api/absences", config);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};


export const fetchStaff = async (token: string | null): Promise<staffForm[] | null> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get<staffForm[]>('http://localhost:8000/api/educators', config);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};


export const addStaffMember = async (staffForm: staffForm, token: string | null) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("registering", staffForm)
    const registerResponse = await axios.post('http://localhost:8000/api/auth/register', {
      username: staffForm.email,
      password: staffForm.password,
      roles: ['EDUCATOR'],
    }, config);

    const userId = registerResponse.data.split(' ')[1];
    const memberData = {
      name: staffForm.name, 
      email: staffForm.email,
      phoneNumber: staffForm.phoneNumber, 
      subject: staffForm.subject
    };

    
    const updateResponse = await axios.put(`http://localhost:8000/api/educator/${userId}`, memberData, config);
    return updateResponse.status;

  } catch (error: any) {
    console.error(error.message);
    return error;
  }
};

export const fetchAllGroups = async (token: string | null): Promise<group[] | null> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get<group[]>(`http://localhost:8000/api/groups`, config);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
};

export const fetchAvailableGroups = async (token: string | null, plan: string, schedule: string): Promise<group[] | null> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get<group[]>(`http://localhost:8000/api/groups/${plan}/${schedule}`, config);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
};

export const assignChildToGroup = async (token: string | null, childId: number | null , groupId?: number | null): Promise<boolean> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("assigning child ",childId,"to group ",groupId)
    const response = await axios.put(`http://localhost:8000/api/child/${childId}/${groupId}`, null, config);

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error(error.message);
    return false;
  }
};

export const fetchGroupSessions = async (token: string | null, groupId?: number): Promise<Session[] | null> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get<Session[]>(`http://localhost:8000/api/sessions/group/${groupId}`, config);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
};

export const assignSessionToGroup = async (token: string | null, sessionData: Session): Promise<boolean> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('http://localhost:8000/api/sessions', sessionData, config);

    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error(error.message);
    return false;
  }
};

