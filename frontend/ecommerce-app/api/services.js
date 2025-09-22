
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
// addFavorite.ts
export const addFavorite = async (productId, token) => {
  return await axios.post(
    `${API_BASE}${endpoints.favorite}`,             
    { productId },                      
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const removeFavorite = async (Id, token) => {
  axios.delete(`${API_BASE}${endpoints.favorite}/${Id} `,                     
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const filterProducts = async (sortType, token) => {
  return await axios.get(
    `${API_BASE}${endpoints.filter}?sort=${sortType}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getUsersFavorite = async (token) => {
  return await axios.get(`${API_BASE}${endpoints.favorite}`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
};
export const addToCart = async (productId, quantity, token) => {
  return await axios.post(
    `${API_BASE}${endpoints.addToCart}`,
    { productId, quantity },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log("checking the res from the service file ===", res)
};

export const getCartItems = async (token) => {
  return await axios.get(
    `${API_BASE}${endpoints.addToCart}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const removeFromCart = async (itemId, token) => {
  return await axios.delete(
    `${API_BASE}${endpoints.addToCart}/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
// services.ts
export const updateCartQuantity = (cartItemId, quantity, token) => {
  return axios.put(`${API_BASE}/products/cart/${cartItemId}/quantity`, 
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
