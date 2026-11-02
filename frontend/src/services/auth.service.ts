import api from "../libs/api";
import {
  adminCheckResponse,
  Authresponse,
  Login,
  Register,
  User,
} from "../types/auth.types";

const authService = {
  register: async (data: Register): Promise<User> => {
    const response = await api.post<Authresponse>("/auth/register", data);
    return response.data.user;
  },
  login: async (data: Login): Promise<User> => {
    const response = await api.post<Authresponse>("/auth/login", data);
    return response.data.user;
  },
  logout: async (): Promise<string> => {
    const response = await api.post(`/auth/logout`);
    return response.data;
  },
  getMe: async (): Promise<User> => {
    const response = await api.get<Authresponse>("/auth/me");
    return response.data.user;
  },
  adminCheck: async (data: string): Promise<boolean> => {
    const response = await api.post<adminCheckResponse>("/auth/admin-check", {
      securityKey: data,
    });
    return response.data.success  ;
  },
};

export default authService;
