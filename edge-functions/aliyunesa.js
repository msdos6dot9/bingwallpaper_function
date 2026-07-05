import {handleRequest} from './index.js'

// for Aliyun ESA
export async function fetch(request, env, context) {
  return await handleRequest(request);
}