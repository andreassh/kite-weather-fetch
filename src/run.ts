import dotenv from "dotenv";

dotenv.config();

export interface RunProps {
  body: any;
  headers: any;
}

export const run = async (req?:RunProps):Promise<boolean> => {
  console.log("Running job from req.body", req?.body);

  // returning dummy promise for now
  return await new Promise((res) => res(true));
};

export default {run};
