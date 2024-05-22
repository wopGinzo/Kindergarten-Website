import axios from 'axios';
import { admin } from './admin';

export interface Message {
  id: number;
  avatar: string;
  name: string;
  message: string;
  parentId: number,
  adminId: number,
  admin?: admin,
}

export interface MessageDto {
    id: number;
    parentId: number;
    adminId: number;
    content: string;
    timestamp: string;
    sender: 'PARENT' | 'ADMIN';
  }
  
  export const fetchConversation = async (token: string | null, adminId: number, parentId: number): Promise<MessageDto[] | null> => {
    try {
      const response = await axios.get<MessageDto[]>(`http://localhost:8000/api/chat/conversation/${adminId}/${parentId}`);
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  };

export const fetchMessagesByParentId = async (token: string | null, parentId?: number): Promise<Message[] | null> => {
  try {
    const response = await axios.get<Message[]>(`http://localhost:8000/api/chat/parent/${parentId}`);
    return response.data
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};

export const fetchMessagesByAdminId = async (token: string | null, adminId?: number): Promise<Message[] | null> => {
  try {
    const response = await axios.get<Message[]>(`http://localhost:8000/api/chat/admin/${adminId}`);
    return response.data
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};

export const sendMessage = async (token: string | null, messageDto: MessageDto): Promise<MessageDto | null> => {
  try {
    const response = await axios.post<MessageDto>('http://localhost:8000/api/chat/send', messageDto);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};