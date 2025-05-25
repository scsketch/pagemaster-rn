import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    'http://localhost:3000/api/v1/auth/login',
    credentials,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const signUp = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    'http://localhost:3000/api/v1/auth/signup',
    credentials,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
