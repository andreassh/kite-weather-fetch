export const errorHandler = (props: any, msg?: string) => {
  throw new Error(msg||`Running job from props ${props} failed`);
};

export default errorHandler;
