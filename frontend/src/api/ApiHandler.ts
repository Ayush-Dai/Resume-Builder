import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

// Axios interceptor for refresh token logic
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {               
                await api.post('/v1/auth/refresh');
                return api(originalRequest);
            } catch (refreshError) {
                // window.location.href = '/builder';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

const signUpApi = (userData: object) => api.post('/v1/auth/register', userData);
const signInApi = (userData: object) => api.post('/v1/auth/login', userData);
const googleSignInApi = (access_token: string) => api.post(`/v1/auth/google-login`, { access_token });
const logOutApi = () => api.post('/v1/auth/logout');
// const authCheckApi = () => api.get('/v1/auth/check');
const generatePdfApi=(formData: object,template : string)=> api.post('/v1/resume/generate-pdf', { formData, template }, {
    responseType: 'blob',
})
const checkAuthApi =() => api.get('v1/auth/check-auth');
const checkAdminApi =() => api.get('v1/auth/check-admin');

const getUserApi = () => api.get('/v1/admin-dashboard/users');
const deleteUserApi = (userId: string) => api.delete(`/v1/admin-dashboard/users/${userId}`);


export { signUpApi, signInApi, googleSignInApi, logOutApi, generatePdfApi, checkAuthApi, checkAdminApi, getUserApi, deleteUserApi };