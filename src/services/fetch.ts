import crossFetch from 'cross-fetch';
export const fetch = (input: RequestInfo | URL, init?: RequestInit) => crossFetch(input,init);