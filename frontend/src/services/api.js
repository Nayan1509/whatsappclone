import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

export const fetchConversations = () => API.get("/conversations");
export const fetchMessagesByUser = (wa_id) => API.get(`/messages/${wa_id}`);
export const sendMessage = (payload) => API.post("/message", payload);
