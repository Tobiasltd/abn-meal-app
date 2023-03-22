import axios from "axios";

/**
 * Axios instance for making HTTP requests to the backend server.
 * It uses the base URL `http://localhost:5555` and sets `Accept` and `Content-Type` headers to `application/json`.
 **/

const apiClient = axios.create({
  baseURL: "http://localhost:5555",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiClient;
