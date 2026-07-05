// JS 版本的 API：从必应获取今日壁纸并返回图片流
// 适用于 Tencent EdgeOne Maker Functions / Netlify 等 serverless 环境

async function handleRequest(request) {
  try {
    const xmlRes = await fetch('https://cn.bing.com/HPImageArchive.aspx?idx=0&n=1');
    const str = await xmlRes.text();
    const match = str.match(/<url>([\s\S]*?)<\/url>/i);

    let imageUrl;
    if (match && match[1]) {
      const imagePath = match[1].replace('1920x1080', 'UHD');
      imageUrl = imagePath.startsWith('http') ? imagePath : `https://cn.bing.com${imagePath}`;
    } else {
      imageUrl = 'https://cn.bing.com/th?id=OHR.SnowySunset_EN-US1974987682_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp';
    }

    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) {
      return new Response('Failed to fetch image', {
        status: 502,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Cache-Control', 'no-store');
    headers.set('Access-Control-Allow-Origin', '*');
    const cl = imgRes.headers.get('content-length');
    if (cl) headers.set('Content-Length', cl);

    return new Response(imgRes.body, { status: imgRes.status, headers });
  } catch (err) {
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

// for EdgeOne Pages
export async function onRequest(context) {
  return handleRequest(context.request);
}

// for Netlify Functions
export default async function handler(request, env, context) {
  return await handleRequest(request);
}

// for Aliyun ESA
export async function fetch(request, env, context) {
  return await handleRequest(request);
}

// 额外：兼容 Node 风格的 handler（适用于某些 Maker 平台的 adapter）
// signature: (req, res)
export async function nodeHandler(req, res) {
  try {
    const url = req.url || '/';
    const method = req.method || 'GET';
    const headers = req.headers || {};
    const request = new Request(url, { method, headers });
    const response = await handleRequest(request);

    res.statusCode = response.status;
    response.headers.forEach((v, k) => res.setHeader(k, v));
    const buf = Buffer.from(await response.arrayBuffer());
    res.end(buf);
  } catch (err) {
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}

export const config = {
  path: "/",
}