# bingwallpaper-function
适用于 EdgeOne Makers / Aliyun ESA Pages / Netlify / Vercel / Cloudflare Pages 的 bing 每日壁纸 (Pages Function ver.) 

## How to use (for EdgeOne, Netlify, Vercel & Cloudflare Pages)

1. fork 这个仓库.
2. 在 EdgeOne Makers、Netlify、Vercel 或 Cloudflare Pages 的创建项目中导入刚刚 fork 的这个仓库，**直接部署**即可. 无需其他额外操作，开箱即用.

## How to use (for Aliyun ESA)

1. fork 这个仓库.
2. 在 ESA 的 [创建函数](https://esa.console.alibabacloud.com/edge/pages/creation) 页面导入刚刚 fork 的这个仓库，点击 "下一步".
3. 在配置页将红框处的内容留空，即 安装命令 和 构建命令 **留空**.

![image-20260705163544592](https://imagecdn.msdos6dot9.top/github/image-20260705163544592.png)

4. 开始部署即可.



**适用平台：** EdgeOne, Netlify, Aliyun ESA, Vercel, Cloudflare Pages

**文件结构：**

```
bingwallpaper-function
├─ api
│  └─ index.js              -- Vercel 入口文件
├─ edge-functions
│  ├─ aliyunesa.js          -- 阿里云 ESA 入口文件
│  └─ index.js              -- EdgeOne/Netlify 入口文件, 主要执行文件
├─ functions
│  └─ index.js              -- Cloudflare Pages 入口文件
├─ esa.jsonc                -- 阿里云 ESA 配置文件
├─ netlify.toml             -- Netlify 配置文件
├─ package.json             -- 包配置文件，用于解决 Vercel 在部署时错误把 js 文件转换为 CommonJS 的问题 
├─ README.md                -- 项目说明
└─ vercel.json              -- Vercel 配置文件

```



