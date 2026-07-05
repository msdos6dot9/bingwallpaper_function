import {handleRequest} from '../edge-functions/index.js'

// for Vercel
export default async function handler(request) {
  const response = await handleRequest(request);
  console.log('response', response);
  return response;
}