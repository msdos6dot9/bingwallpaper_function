import {handleRequest} from '../edge-functions/index.js'

// for Vercel
export default async function handler(request, env, context) {
  return await handleRequest(request);
}