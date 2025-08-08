import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserState, User } from '@/types/user';
import { fetchUserApi } from '../services/userApi';

// Existing async thunks (keep as they are)
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      console.log(`🔄 Redux: Fetching users for page ${page}`);
      const response = await fetchUserApi.getUsers(page);
      
      if (!response || !response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid ReqRes API response structure');
      }
      
      console.log('✅ Redux: Users fetched successfully', response);
      return response;
    } catch (error: any) {
      console.error('❌ Redux: Failed to fetch users:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id: number, { rejectWithValue }) => {
    try {
      console.log(`🔄 Redux: Fetching user with ID ${id}`);
      const response = await fetchUserApi.getUserById(id);
      
      if (!response || !response.data) {
        throw new Error('Invalid user response structure');
      }
      
      console.log('✅ Redux: User fetched successfully', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Redux: Failed to fetch user:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Helper functions for localStorage
const loadFavorites = (): number[] => {
  try {
    const favorites = localStorage.getItem('userFavorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.warn('Failed to load favorites from localStorage:', error);
    return [];
  }
};

const saveFavorites = (favorites: number[]): void => {
  try {
    localStorage.setItem('userFavorites', JSON.stringify(favorites));
  } catch (error) {
    console.warn('Failed to save favorites to localStorage:', error);
  }
};

// Initial state with new showFavoritesOnly
const initialState: UserState = {
  users: [],
  selectedUser: null,
  favorites: loadFavorites(),
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchTerm: '',
  showFavoritesOnly: false, // New state for favorites filter
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
      if (action.payload) {
        console.log(`👤 Selected user: ${action.payload.first_name} ${action.payload.last_name}`);
      }
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      console.log(`🔍 Search term updated: "${action.payload}"`);
    },

    toggleFavorite: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      const index = state.favorites.indexOf(userId);
      
      if (index > -1) {
        state.favorites.splice(index, 1);
        console.log(`💔 Removed user ${userId} from favorites`);
      } else {
        state.favorites.push(userId);
        console.log(`❤️ Added user ${userId} to favorites`);
      }
      
      saveFavorites(state.favorites);
    },

    clearError: (state) => {
      state.error = null;
      console.log('🧹 Error cleared');
    },

    resetUsers: (state) => {
      state.users = [];
      state.selectedUser = null;
      state.currentPage = 1;
      state.totalPages = 1;
      state.searchTerm = '';
      state.error = null;
      console.log('🔄 Users data reset');
    },

    // New action to toggle favorites-only view
    setShowFavoritesOnly: (state, action: PayloadAction<boolean>) => {
      state.showFavoritesOnly = action.payload;
      console.log(`⭐ Show favorites only: ${action.payload}`);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('⏳ Loading users...');
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        
        const payload = action.payload;
        if (payload && payload.data && Array.isArray(payload.data)) {
          state.users = payload.data;
          state.currentPage = payload.page || 1;
          state.totalPages = payload.total_pages || 1;
          state.error = null;
          console.log(`✅ Loaded ${payload.data.length} users for page ${payload.page}`);
        } else {
          state.error = 'Invalid ReqRes API response structure';
          state.users = [];
          console.error('❌ Invalid response structure:', payload);
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch users from ReqRes API';
        state.users = [];
        console.error('❌ Failed to load users:', state.error);
      })

      // Handle fetchUserById
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('⏳ Loading user details...');
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        
        if (action.payload) {
          state.selectedUser = action.payload;
          state.error = null;
          console.log(`✅ Loaded user details: ${action.payload.first_name} ${action.payload.last_name}`);
        } else {
          state.error = 'Invalid user data received';
          console.error('❌ Invalid user data:', action.payload);
        }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch user details from ReqRes API';
        state.selectedUser = null;
        console.error('❌ Failed to load user details:', state.error);
      });
  },
});

export const { 
  setSelectedUser, 
  setSearchTerm, 
  toggleFavorite, 
  clearError, 
  resetUsers,
  setShowFavoritesOnly  // Export new action
} = userSlice.actions;

export default userSlice.reducer;
