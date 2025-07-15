import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
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
  lastFetchTimestamp: number | null;
  
  // Actions
  fetchUsers: () => Promise<void>;
  loadMoreUsers: () => Promise<void>;
  toggleFavorite: (user: User) => void;
  filterUsers: (filters: Partial<UserFilters>) => void;
  getFavoriteById: (id: number) => User | undefined;
  clearError: () => void;
  loadCachedUsers: () => Promise<void>;
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
      lastFetchTimestamp: null,

      fetchUsers: async () => {
        try {
          // Check network connectivity first
          const networkState = await NetInfo.fetch();
          if (!networkState.isConnected) {
            // If offline, try to load cached users
            await get().loadCachedUsers();
            return;
          }

          set({ loading: true, error: null, currentPage: 1 });
          const response = await fetchUsers(1);
          
          // Cache the fetched users
          await AsyncStorage.setItem('cached_users', JSON.stringify(response.data));
          await AsyncStorage.setItem('last_fetch_timestamp', Date.now().toString());
          
          set({
            users: response.data,
            hasMore: response.hasMore,
            loading: false,
            error: null,
            lastFetchTimestamp: Date.now(),
          });
        } catch (error) {
          // On error, try to load cached users
          await get().loadCachedUsers();
          set({ 
            error: 'Failed to fetch users',
            loading: false 
          });
        }
      },

      loadMoreUsers: async () => {
        const { currentPage, loading, hasMore } = get();
        if (loading || !hasMore) return;

        try {
          // Check network connectivity first
          const networkState = await NetInfo.fetch();
          if (!networkState.isConnected) {
            return; // Silently fail when offline
          }

          set({ loading: true });
          const nextPage = currentPage + 1;
          const response = await fetchUsers(nextPage);
          
          const allUsers = [...get().users, ...response.data];
          
          // Update cached users
          await AsyncStorage.setItem('cached_users', JSON.stringify(allUsers));
          await AsyncStorage.setItem('last_fetch_timestamp', Date.now().toString());
          
          set({
            users: allUsers,
            currentPage: nextPage,
            hasMore: response.hasMore,
            loading: false,
            lastFetchTimestamp: Date.now(),
          });
        } catch (error) {
          set({ loading: false });
          // Silently fail load more
        }
      },

      loadCachedUsers: async () => {
        try {
          const [cachedUsers, timestamp] = await Promise.all([
            AsyncStorage.getItem('cached_users'),
            AsyncStorage.getItem('last_fetch_timestamp')
          ]);

          if (cachedUsers) {
            const users = JSON.parse(cachedUsers);
            const lastFetch = timestamp ? parseInt(timestamp, 10) : null;
            
            set({ 
              users,
              loading: false,
              error: null,
              lastFetchTimestamp: lastFetch,
              hasMore: false // Disable infinite scroll when using cached data
            });
          }
        } catch (error) {
          set({ 
            error: 'Failed to load cached users',
            loading: false 
          });
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