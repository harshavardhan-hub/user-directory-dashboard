import { ApiResponse, User } from '@/types/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://reqres.in/api';
const API_KEY = import.meta.env.VITE_REQRES_API_KEY || 'reqres-free-v1';

export const fetchUserApi = {
  getUsers: async (page: number = 1): Promise<ApiResponse> => {
    try {
      console.log(`🔐 Authenticated ReqRes API call (page ${page})`);
      
      const response = await fetch(`${API_BASE_URL}/users?page=${page}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'X-API-Key': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - Please check your API key`);
      }

      const data = await response.json();
      console.log('✅ Authenticated ReqRes Success:', data);
      
      // Validate response structure
      if (!data || !data.data || !Array.isArray(data.data)) {
        throw new Error('Invalid ReqRes API response structure');
      }
      
      return data;
    } catch (error: any) {
      console.error('❌ Authenticated ReqRes Error:', error);
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },

  getUserById: async (id: number): Promise<{ data: User }> => {
    try {
      console.log(`🔐 Authenticated ReqRes User API (ID: ${id})`);
      
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'X-API-Key': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - Please check your API key`);
      }

      const data = await response.json();
      console.log('✅ Authenticated ReqRes User Success:', data);
      
      if (!data || !data.data) {
        throw new Error('Invalid user response structure');
      }
      
      return data;
    } catch (error: any) {
      console.error('❌ Authenticated ReqRes User Error:', error);
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  },
};

export default fetchUserApi;
