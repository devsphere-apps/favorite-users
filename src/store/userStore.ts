import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchUsers } from '../services/api';
import { User, UserFilters } from '../types';

interface UserState {
  users: User[];
  favorites: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
  filters: UserFilters;
  
  // Actions
  fetchUsers: () => Promise<void>;
  loadMoreUsers: () => Promise<void>;
  toggleFavorite: (user: User) => void;
  filterUsers: (filters: Partial<UserFilters>) => void;
  getFavoriteById: (id: number) => User | undefined;
  clearError: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],
      favorites: [],
      loading: false,
      error: null,
      currentPage: 1,
      hasMore: true,
      filters: {},

      fetchUsers: async () => {
        try {
          set({ loading: true, error: null, currentPage: 1 });
          const response = await fetchUsers(1);
          set({
            users: response.data,
            hasMore: response.hasMore,
            loading: false,
          });
        } catch (error) {
          set({ error: 'Failed to fetch users', loading: false });
        }
      },

      loadMoreUsers: async () => {
        const { currentPage, loading, hasMore } = get();
        if (loading || !hasMore) return;

        try {
          set({ loading: true });
          const nextPage = currentPage + 1;
          const response = await fetchUsers(nextPage);
          
          set((state) => ({
            users: [...state.users, ...response.data],
            currentPage: nextPage,
            hasMore: response.hasMore,
            loading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to load more users', loading: false });
        }
      },

      toggleFavorite: (user: User) => {
        set((state) => {
          const isFavorite = state.favorites.some((f) => f.id === user.id);
          if (isFavorite) {
            return {
              favorites: state.favorites.filter((f) => f.id !== user.id),
            };
          }
          return {
            favorites: [...state.favorites, user],
          };
        });
      },

      filterUsers: (newFilters: Partial<UserFilters>) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      getFavoriteById: (id: number) => {
        return get().favorites.find((f) => f.id === id);
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'user-storage',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
); 