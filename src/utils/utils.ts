import dotenv from "dotenv";
dotenv.config();

export const isDev = ():boolean => process.env.NODE_ENV !== "production";
export const isProd = ():boolean => process.env.NODE_ENV === "production";
export const delay = (t:number) => new Promise((res) => {
  setTimeout(res,t);
});

export default {isDev, isProd};
