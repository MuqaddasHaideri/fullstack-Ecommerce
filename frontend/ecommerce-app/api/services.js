
import axios from 'axios';
import { API_BASE, endpoints } from './urls';

//auth
export const loginUser = async (email, password) => {
  return await axios.post(`${API_BASE}${endpoints.login}`, {
    email,
    password,
  });

};
export const signupUser = async (name,email, password) => {
    return await axios.post(`${API_BASE}${endpoints.signup}`, {
      name,
      email,
      password,
    });
  };
  export const getProfile = async (token) => {
    return await axios.get(`${API_BASE}${endpoints.profile}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    });
  };
//tab>home
  export const getProduct = async (token) => {
    return await axios.get(`${API_BASE}${endpoints.getProducts}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  };
//unused
  export const getProductByID = async (id,token) => {
    return await axios.get(`${API_BASE}${endpoints.getProducts}/${id} `, {
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  };

  export const getCatagory = async ( token) => {
    return await axios.get(`${API_BASE}${endpoints.category}`, {
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  };
  export const getCatagoryById = async (categoryName,token) => {
    return await axios.get(`${API_BASE}${endpoints.category}/${categoryName} `, {
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  };
// correct search function
export const searchProduct = async (searchText, token) => {
  return await axios.get(
    `${API_BASE}/products/search?query=${encodeURIComponent(searchText)}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};