import type { Task } from '@/types';
import { apiClient } from '@/libs/api-client';

export const login = async (username: string, password: string) => {
  const response = apiClient.post('/auth/login', { username, password }) as any;

  return response;
};