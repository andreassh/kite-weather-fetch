import dotenv from "dotenv";
dotenv.config();

export const isDev = ():boolean => process.env.NODE_ENV !== "production";
export const isProd = ():boolean => process.env.NODE_ENV === "production";

export default {isDev, isProd};
