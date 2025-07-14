export interface User {
  id: number;
  username: string;
  email: string;
  roles: { id: number; name: string }[];
}

export interface LoginResponse {
  token: string;
  user: User;
}
