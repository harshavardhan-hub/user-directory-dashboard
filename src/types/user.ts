export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

export interface UserState {
  users: User[];
  selectedUser: User | null;
  favorites: number[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  showFavoritesOnly: boolean; // Add this new state
}

export interface ThemeState {
  isDark: boolean;
}
