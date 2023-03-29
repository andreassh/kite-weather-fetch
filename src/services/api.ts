export const getApiUrl = () => {
  return `${process.env.API_URL||'http://localhost:1337'}/graphql`
}

export const getDefaultApiHeaders = () => {
  return {
    'content-type': 'application/json',
    'Authorization': `Bearer ${process.env.API_TOKEN}`
  }
}

export default {getApiUrl, getDefaultApiHeaders}