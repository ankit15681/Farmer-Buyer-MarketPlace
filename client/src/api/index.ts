import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        const profile = localStorage.getItem('profile') || '';
        req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
    }

    return req;
});


API.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response.status === 401) {
        window.location.assign('/unauthorized');
   }
   else if(error.response.status === 500) {
       alert("Server error");
   }
   return error;
   
 });
 

export const fetchFarmers = (page) => API.get(`/farmers?page=${page}`);
export const fetchFarmer = (id) => API.get(`/farmers/${id}`);
export const fetchFarmersBySearch = (searchQuery) => API.get(`/farmers/search?searchQuery=${searchQuery.search || 'none'}&genres=${searchQuery.genres}`);
export const createFarmer = (farmer) => API.post('/farmers', farmer);
export const updateFarmer = (id, updatedFarmer) => API.patch(`/farmers/${id}`, updatedFarmer);
export const deleteFarmer = (id) => API.delete(`/farmers/${id}`);
export const fetchComments = (farmerId) => API.get(`/comments/${farmerId}`);

export const signIn = (formData: any) => API.post('/user/signin', formData);
export const signUp = (formData: any) => API.post('/user/signup', formData);
