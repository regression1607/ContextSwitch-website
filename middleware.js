const BOT_AGENTS = /bot|crawl|spider|slurp|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Discordbot|Googlebot|bingbot|Bytespider|PetalBot|Applebot|TelegramBot|Embedly|Quora|outbrain|pinterest|vkShare|W3C_Validator/i;

export const config = {
  matcher: ['/posts/:path*'],
};

export default async function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';

  // Only intercept for bots/crawlers
  if (!BOT_AGENTS.test(userAgent)) {
    return undefined; // Continue to normal SPA
  }

  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);

  // Only handle /posts/{id} — skip /posts, /posts/create
  if (pathParts.length !== 2 || pathParts[0] !== 'posts' || pathParts[1] === 'create') {
    return undefined;
  }

  const id = pathParts[1];

  try {
    const res = await fetch(`https://context-switch-backend.vercel.app/api/posts/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) return undefined;

    const data = await res.json();
    if (!data.success || !data.data?.post) return undefined;

    const post = data.data.post;
    const siteUrl = 'https://www.context-switch.dev';
    const postUrl = `${siteUrl}/posts/${id}`;
    const escape = (str) => str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const title = escape(post.title);
    const description = escape((post.content || '').substring(0, 200).replace(/\n/g, ' '));
    const authorName = escape(post.author?.name || 'Anonymous');
    const publishedDate = post.createdAt || new Date().toISOString();

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | ContextSwitch AI Hub</title>
<meta name="description" content="${description}">
<meta name="author" content="${authorName}">
<link rel="canonical" href="${postUrl}">
<meta property="og:type" content="article">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${postUrl}">
<meta property="og:site_name" content="ContextSwitch AI Hub">
<meta property="og:image" content="${siteUrl}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="article:published_time" content="${publishedDate}">
<meta property="article:author" content="${authorName}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${siteUrl}/og-image.png">
<meta name="robots" content="index, follow">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"${title}","description":"${description}","url":"${postUrl}","datePublished":"${publishedDate}","author":{"@type":"Person","name":"${authorName}"},"publisher":{"@type":"Organization","name":"ContextSwitch","url":"${siteUrl}","logo":{"@type":"ImageObject","url":"${siteUrl}/favicon.svg"}},"mainEntityOfPage":{"@type":"WebPage","@id":"${postUrl}"}}
</script>
</head>
<body>
<h1>${title}</h1>
<p>By ${authorName}</p>
<article>${description}</article>
<p><a href="${postUrl}">Read full post on ContextSwitch AI Hub</a></p>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch (e) {
    return undefined; // Fall through to normal SPA
  }
}
