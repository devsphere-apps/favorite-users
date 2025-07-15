export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserStore {
  users: User[];
  favorites: Set<number>;
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  toggleFavorite: (userId: number) => void;
  removeFavorite: (userId: number) => void;
  searchUsers: (query: string) => User[];
  sortUsers: (by: 'name' | 'email') => void;
} 