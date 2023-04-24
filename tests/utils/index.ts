export const toFetchRes = (data:any, status = 200):Response => {
  return {status, json: () => Promise.resolve(data||{})} as Response;
}

export default {toFetchRes}