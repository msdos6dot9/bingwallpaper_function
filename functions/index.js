import { handleRequest } from '../edge-functions/index.js';

// for Cloudflare Pages Functions
export async function onRequest(context) {
  return await handleRequest(context.request);
}