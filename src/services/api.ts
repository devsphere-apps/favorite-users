import { User } from '@/types/user';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  async getUserById(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
}; 