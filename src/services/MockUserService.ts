import http from '../utils/http-common';
import IMockUser from '../types/MockUser';

const mockUsersUrl = '/mockUsers';

const getMockUsers = () => http.get(mockUsersUrl);

const getMockUser = (id: number) => http.get(`${mockUsersUrl}/${id}`);

const addMockUser = (mockUser: IMockUser) => http.post(mockUsersUrl, mockUser);

const updateMockUser = (mockUser: IMockUser) => http.put(`${mockUsersUrl}/${mockUser.id}`, mockUser);

const deleteMockUser = (id: number) => http.delete(`${mockUsersUrl}/${id}`);

const searchMockUser = (term: string) => http.get(`${mockUsersUrl}?q=${term}`);

const MockUserService = {
  getMockUsers,
  getMockUser,
  addMockUser,
  updateMockUser,
  deleteMockUser,
  searchMockUser
};

export default MockUserService;