import { userService } from '@/services/api';
import { UserStore } from '@/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      favorites: new Set(),
      isLoading: false,
      error: null,

      fetchUsers: async () => {
        try {
          set({ isLoading: true, error: null });
          const users = await userService.getUsers();
          set({ users, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      toggleFavorite: (userId: number) => {
        set((state) => {
          const newFavorites = new Set(state.favorites);
          if (newFavorites.has(userId)) {
            newFavorites.delete(userId);
          } else {
            newFavorites.add(userId);
          }
          return { favorites: newFavorites };
        });
      },

      removeFavorite: (userId: number) => {
        set((state) => {
          const newFavorites = new Set(state.favorites);
          newFavorites.delete(userId);
          return { favorites: newFavorites };
        });
      },

      searchUsers: (query: string) => {
        const { users } = get();
        const searchTerm = query.toLowerCase();
        return users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
      },

      sortUsers: (by: 'name' | 'email') => {
        set((state) => ({
          users: [...state.users].sort((a, b) => a[by].localeCompare(b[by])),
        }));
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favorites: Array.from(state.favorites) }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert favorites array back to Set
          state.favorites = new Set(state.favorites);
        }
      },
    }
  )
); 