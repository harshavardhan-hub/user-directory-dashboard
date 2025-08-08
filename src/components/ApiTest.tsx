import { ApiResponse, User } from '@/types/user';

// Native Fetch API with proper CORS handling
export const fetchUserApi = {
  getUsers: async (page: number = 1): Promise<ApiResponse> => {
    try {
      console.log(`🚀 Fetching users for page ${page}`);
      
      const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API Success:', data);
      return data;
    } catch (error: any) {
      console.error('❌ API Error:', error);
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },

  getUserById: async (id: number): Promise<{ data: User }> => {
    try {
      console.log(`🚀 Fetching user with ID ${id}`);
      
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ User API Success:', data);
      return data;
    } catch (error: any) {
      console.error('❌ User API Error:', error);
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  },
};

// Default export for backward compatibility
export default fetchUserApi;

// Alternative axios-based API (if you prefer axios)
import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const userApi = {
  getUsers: async (page: number = 1): Promise<ApiResponse> => {
    try {
      const response = await axiosApi.get<ApiResponse>(`/users?page=${page}`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },

  getUserById: async (id: number): Promise<{ data: User }> => {
    try {
      const response = await axiosApi.get<{ data: User }>(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  },
};
