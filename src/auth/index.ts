import dotenv from "dotenv";
dotenv.config();

export const getToken = () => {
  return process.env.API_TOKEN||"";
}

export default {getToken}