/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { login } from '@/services/auth';

// Interface cho thông tin user đã đăng nhập
export interface LoggedInUser {
  id: string | number;
  username: string;
  isActive: boolean;
  roles: Array<{
    id: string | number;
    name: string;
  }>;
}

// Interface cho state của auth store
export interface AuthState {
  // Tokens
  access_token?: string;
  refresh_token?: string;

  // User info
  loggedInUser?: LoggedInUser;

  // UI states
  loading: boolean;
  error: any;

  // Computed state
  isAuthenticated: boolean;

  // Actions
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        access_token: undefined,
        refresh_token: undefined,
        loggedInUser: undefined,
        loading: false,
        error: null,
        isAuthenticated: false,

        // Login action
        login: async ({ username, password }) => {
          try {
            // Set loading state
            set({
              loading: true,
              error: null
            }, false, { type: '@AUTH/LOGIN/LOADING' });

            // Call login API
            const response = await login(username, password);

            // Update state with response
            set({
              access_token: response.access_token,
              refresh_token: response.refresh_token,
              loggedInUser: response.user,
              loading: false,
              error: null,
              isAuthenticated: true
            }, false, { type: '@AUTH/LOGIN/SUCCESS' });

          } catch (error: any) {
            // Handle error
            set({
              error: error?.response?.data?.message || 'Login failed',
              access_token: undefined,
              refresh_token: undefined,
              loggedInUser: undefined,
              loading: false,
              isAuthenticated: false
            }, false, { type: '@AUTH/LOGIN/ERROR' });
          }
        },

        // Logout action
        logout: async () => {
          // try {
          //   // Call logout API if needed
          //   await apiClient.logout();
          // } 
          // finally {
          // Clear state regardless of API call result
          set(
            {
              access_token: undefined,
              refresh_token: undefined,
              loggedInUser: undefined,
              error: null,
              isAuthenticated: false
            },
            false,
            { type: '@AUTH/LOGOUT' });
          // }
        },

        // Refresh token action
        refreshToken: async () => {
          try {
            // const refresh_token = get().refresh_token;
            // if (!refresh_token) throw new Error('No refresh token available');

            // const response = await apiClient.getCurrentUser();

            set(
              {
                refresh_token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUyNjYzMjIzLCJleHAiOjE3NTMyNjgwMjN9.ATl3GcFXhrr3WUb8BEPU3PdrCbDfutdUoY1P4l7w_Zd',
              },
              false,
              { type: '@AUTH/CHANGE_REFRESH_TOKEN' }
            );
          } 
          catch (error) {
            // If refresh fails, logout
            get().logout();
          }
        }
      }),
      {
        name: 'auth-storage', // localStorage key
        partialize: (state) => ({
          // Only persist these fields
          access_token: state.access_token,
          refresh_token: state.refresh_token,
          loggedInUser: state.loggedInUser,
        })
      }
    )
  )
);
