import axios from 'axios';
import { Badge, PaginatedResponse, User } from '../types';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const ITEMS_PER_PAGE = 5;

const assignRandomBadge = (user: User): Badge => {
  const badges: Badge[] = ['gold', 'silver', 'bronze', 'new'];
  const randomIndex = Math.floor(Math.random() * badges.length);
  return badges[randomIndex];
};

export const fetchUsers = async (page: number = 1): Promise<PaginatedResponse<User>> => {
  try {
    const response = await api.get<User[]>('/users');
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const total = response.data.length;
    
    // Assign random badges to users
    const usersWithBadges = response.data.map(user => ({
      ...user,
      badge: assignRandomBadge(user),
    }));

    return {
      data: usersWithBadges.slice(start, end),
      total,
      page,
      limit: ITEMS_PER_PAGE,
      hasMore: end < total,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${id}`);
    return {
      ...response.data,
      badge: assignRandomBadge(response.data),
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}; 