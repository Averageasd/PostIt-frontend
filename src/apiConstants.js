import env from "react-dotenv";
import dotenv from "dotenv";
dotenv.config().parsed;
const baseUrl = import.meta.env.VITE_BASE_URL;

export {baseUrl};