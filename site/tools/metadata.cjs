const escape = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
function metadata(html, route, config) {
  const base = config.publicUrl.replace(/\/?$/, '/');
  const url = new URL(route + '/', base).href;
  const image = new URL('assets/wedding-share.jpg', base).href;
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)[1].replace(/&amp;/g, '&');
  const description = config.descriptions[route];
  if (!description) throw new Error('Missing description for ' + route);
  html = html.replace(/\s*<!-- sharing:start -->[\s\S]*?<!-- sharing:end -->\s*/g, '\n')
    .replace(/<meta\b[^>]*name=["']description["'][^>]*>/gi, '')
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, '');
  const tags = [
    `<meta name="description" content="${escape(description)}">`,
    `<link rel="canonical" href="${escape(url)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${escape(config.siteName)}">`,
    `<meta property="og:title" content="${escape(title)}">`,
    `<meta property="og:description" content="${escape(description)}">`,
    `<meta property="og:url" content="${escape(url)}">`,
    `<meta property="og:image" content="${escape(image)}">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="Alexandra and Dalton’s monogram on a white background">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escape(title)}">`,
    `<meta name="twitter:description" content="${escape(description)}">`,
    `<meta name="twitter:image" content="${escape(image)}">`,
    `<meta name="twitter:image:alt" content="Alexandra and Dalton’s monogram on a white background">`,
    `<link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">`
  ];
  return html.replace('</head>', '\n<!-- sharing:start -->\n' + tags.join('\n') + '\n<!-- sharing:end -->\n</head>');
}
module.exports = { metadata };
