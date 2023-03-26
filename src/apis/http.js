import axios from 'axios';

const BaseUrlV1 = 'https://jsonplaceholder.typicode.com/';

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

Axios.defaults.baseURL = BaseUrlV1;

export function setAuthToken(token) {
  if (token) {
    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete Axios.defaults.headers.common.Authorization;
  }
}

// Wrapper function for Axios requests
export default async function http({ method, url, data, params }) {
  try {
    const response = await Axios.request({
      method,
      url,
      data,
      params,
    });

    if (response.status !== 200) {
      throw new Error({
        success: false,
        message: response.data?.error?.message,
        status: response.status,
        dataBody: {},
      });
    }

    return {
      success: true,
      message: response.data.message,
      status: response.status,
      dataBody: response.data,
    };
  } catch (error) {
    const status = error.response?.status;

    if (status === 401) {
      // Todo: Handel 401 case
      //* signOut()
      //* Clear token
      //   navigateTo('/login')
    }

    if (status === 500) {
      console.error('500: Server error');
    }

    throw error.response.data;
  }
}
