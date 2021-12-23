import axios from 'axios';
import IMockUser from '../types/MockUser';

const mockUsersUrl = '/mockUsers';

const getAllMockUsers = () => axios.get(mockUsersUrl);

const getPagedMockUsers = (page: number, pageSize: number, firstName?: string) => {
    return axios.get(`${mockUsersUrl}?_page=${page}&_limit=${pageSize}` + (firstName ? `&firstName=${firstName}` : ''));
};

const getMockUser = (id: number) => axios.get(`${mockUsersUrl}/${id}`);

const addMockUser = (mockUser: IMockUser) => axios.post(mockUsersUrl, mockUser);

const updateMockUser = (mockUser: IMockUser) => axios.put(`${mockUsersUrl}/${mockUser.id}`, mockUser);

const deleteMockUser = (id: number) => axios.delete(`${mockUsersUrl}/${id}`);

const searchMockUser = (term: string) => axios.get(`${mockUsersUrl}?q=${term}`);

const MockUserService = {
  getMockUsers: getAllMockUsers,
  getPagedMockUsers,
  getMockUser,
  addMockUser,
  updateMockUser,
  deleteMockUser,
  searchMockUser
};

export default MockUserService;