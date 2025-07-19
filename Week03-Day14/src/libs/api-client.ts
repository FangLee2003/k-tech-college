/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { type InternalAxiosRequestConfig } from 'axios';

// Định nghĩa base URL của API server
const API_URL = 'https://server.aptech.io';

// Khởi tạo instance của Axios với các config mặc định
const apiClient = Axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor cho request - Xử lý trước khi gửi request
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Lấy token từ localStorage
        const authStorage = localStorage.getItem('auth-storage');
        const token = authStorage ? JSON.parse(authStorage)?.state?.access_token : null;

        // Khởi tạo headers nếu chưa có
        if (!config.headers) {
            config.headers = new Axios.AxiosHeaders();
        }

        // Thêm token vào header nếu có
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Đảm bảo API luôn nhận JSON
        config.headers.Accept = 'application/json';

        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor cho response - Xử lý sau khi nhận response
apiClient.interceptors.response.use(
    // Trả về data trực tiếp, bỏ qua các thông tin khác của response
    (response) => response.data,
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra nếu là request login thì không tự động redirect
        if (originalRequest.url === '/auth/login') {
            return Promise.reject(error);
        }

        // Nếu token hết hạn (401) hoặc không có quyền (403)
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Xóa thông tin đăng nhập
            localStorage.removeItem('auth-storage');
            // Chuyển hướng về trang login
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export { apiClient };
