import crossFetch from 'cross-fetch';
export const fetch = (url: string, params: any) => crossFetch(url,params);