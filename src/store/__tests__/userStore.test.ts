import * as api from '../../services/api';
import { User } from '../../types';
import { useUserStore } from '../userStore';

// Mock the API module
jest.mock('../../services/api');
const mockedApi = api as jest.Mocked<typeof api>;

const createMockUser = (id: number, name: string): User => ({
  id,
  name,
  email: `${name.toLowerCase().replace(' ', '')}@test.com`,
  phone: '1-770-736-8031 x56442',
  website: 'test.com',
  badge: 'gold',
  company: {
    name: 'Test Company',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
  address: {
    street: 'Test Street',
    suite: 'Apt. 556',
    city: 'Test City',
    zipcode: '92998-3874',
  },
});

describe('useUserStore', () => {
  beforeEach(() => {
    // Clear the store before each test
    useUserStore.setState({
      users: [],
      favorites: [],
      loading: false,
      error: null,
      currentPage: 1,
      hasMore: true,
      filters: {},
    });
  });

  it('should initialize with default values', () => {
    const state = useUserStore.getState();
    expect(state.users).toEqual([]);
    expect(state.favorites).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.currentPage).toBe(1);
    expect(state.hasMore).toBe(true);
    expect(state.filters).toEqual({});
  });

  it('should fetch users successfully', async () => {
    const mockUsers = [
      createMockUser(1, 'User One'),
      createMockUser(2, 'User Two'),
    ];

    mockedApi.fetchUsers.mockResolvedValueOnce({
      data: mockUsers,
      total: 2,
      page: 1,
      limit: 5,
      hasMore: false,
    });

    await useUserStore.getState().fetchUsers();
    const state = useUserStore.getState();

    expect(state.users).toEqual(mockUsers);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle fetch users error', async () => {
    mockedApi.fetchUsers.mockRejectedValueOnce(new Error('API Error'));

    await useUserStore.getState().fetchUsers();
    const state = useUserStore.getState();

    expect(state.users).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to fetch users');
  });

  it('should toggle favorite status', () => {
    const mockUser = createMockUser(1, 'User One');
    const { toggleFavorite } = useUserStore.getState();

    // Add to favorites
    toggleFavorite(mockUser);
    expect(useUserStore.getState().favorites).toContainEqual(mockUser);

    // Remove from favorites
    toggleFavorite(mockUser);
    expect(useUserStore.getState().favorites).not.toContainEqual(mockUser);
  });

  it('should update filters', () => {
    const { filterUsers } = useUserStore.getState();
    const newFilters = {
      badge: 'gold' as const,
      searchQuery: 'test',
      sortBy: 'name' as const,
    };

    filterUsers(newFilters);
    expect(useUserStore.getState().filters).toEqual(newFilters);
  });
}); 