export interface Login {
  email: string;
  password: string;
}

export interface Register extends Login {
  firstName: string;
  lastName: string;
}

export interface User extends Register {
  message: string;
  _id: string;
  role: string;
}

export interface AuthStructure {
  error: string | null;
  loading: boolean;
  Register: (data: Register) => Promise<void>;
  Login: (data: Login) => Promise<void>;
  Logout: () => void;
  getMe: () => Promise<void>;
  submitting: boolean;
  user: User | null;
}
