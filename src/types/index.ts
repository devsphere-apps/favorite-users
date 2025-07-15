export type Badge = 'gold' | 'silver' | 'bronze' | 'new';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  badge?: Badge;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface UserFilters {
  badge?: Badge;
  searchQuery?: string;
  sortBy?: 'name' | 'email';
  sortOrder?: 'asc' | 'desc';
} 