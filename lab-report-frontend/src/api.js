import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

// User login function

export const login = async (username, password) => {
  const res = await axios.post(`${API_BASE}/login/`, {
    username,
    password,
  });
  return res.data.token;
};

// Fetch trends data function

export const uploadReport = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API_BASE}/upload/`, formData, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

