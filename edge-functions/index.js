// 从必应获取今日壁纸并返回图片流 (Serverless ver.)
// 适用于 EdgeOne Pages / Aliyun ESA Pages / Netlify 等 serverless 环境

export async function handleRequest(request) {
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

export const config = {
  path: "/",
}