import axios from "axios";

const BASE_URL = "http://localhost:5001/api/articles";


export const getArticles = (config = {}) => axios.get(BASE_URL, config);
export const getArticle = (id) => axios.get(`${BASE_URL}/${id}`);
export const searchArticles = (q) => axios.get(`${BASE_URL}/search?q=${q}`);
export const createArticle = (formData) => axios.post(BASE_URL, formData);
export const updateArticle = (id, formData) => axios.put(`${BASE_URL}/${id}`, formData);
export const deleteArticle = (id) => axios.delete(`${BASE_URL}/${id}`);
