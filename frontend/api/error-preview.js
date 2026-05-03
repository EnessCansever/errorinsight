import errorGuides from '../src/data/errorGuides'

export const config = {
  runtime: 'edge',
}
function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
function normalizeText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
}

async function fetchBaseHtml(request) {
  const indexUrl = new URL('/index.html', request.url)
  const response = await fetch(indexUrl.toString(), {
    headers: {
      Accept: 'text/html',
    },
  })

  return response.text()
}

function replaceTag(html, pattern, replacement) {
  return html.replace(pattern, replacement)
}

function injectRobots(html, content) {
  const robotsTag = `<meta name="robots" content="${content}" />`

  if (html.includes('<meta name="robots"')) {
    return replaceTag(html, /<meta\s+name="robots"\s+content="[^"]*"\s*\/?\>/i, robotsTag)
  }

  return html.replace('<meta name="theme-color" content="#8B5CF6" />', `${robotsTag}\n    <meta name="theme-color" content="#8B5CF6" />`)
}

function injectMetadata(html, metadata) {
  let output = html
  output = replaceTag(output, /<title>.*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`)
  output = replaceTag(output, /<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${escapeHtml(metadata.canonicalUrl)}" />`)
  output = replaceTag(output, /<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${escapeHtml(metadata.description)}" />`)
  output = replaceTag(output, /<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${escapeHtml(metadata.canonicalUrl)}" />`)
  output = replaceTag(output, /<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`)
  output = replaceTag(output, /<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`)
  output = replaceTag(output, /<meta name="twitter:url" content="[^"]*"\s*\/>/i, `<meta name="twitter:url" content="${escapeHtml(metadata.canonicalUrl)}" />`)
  output = replaceTag(output, /<meta name="twitter:title" content="[^"]*"\s*\/>/i, `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`)
  output = replaceTag(output, /<meta name="twitter:description" content="[^"]*"\s*\/>/i, `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`)

  return output
}

export default async function handler(request) {
  const url = new URL(request.url)
  const slug = normalizeText(url.searchParams.get('slug'))

  if (!slug) {
    const baseHtml = await fetchBaseHtml(request)
    const html = injectRobots(baseHtml, 'noindex, nofollow')

    return new Response(html, {
      status: 404,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  }

  const guide = errorGuides.find((g) => g.slug === slug)

  const baseHtml = await fetchBaseHtml(request)

  if (!guide) {
    const html = injectRobots(baseHtml, 'noindex, nofollow')

    return new Response(html, {
      status: 404,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  }

  const canonical = `https://getfixora.dev/errors/${guide.slug}`

  const metadata = {
    title: guide.seoTitle || guide.title,
    description: guide.seoDescription || guide.shortSummary,
    canonicalUrl: canonical,
  }

  let html = injectMetadata(baseHtml, metadata)
  html = injectRobots(html, 'index, follow')

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
    },
  })
}
import errorGuides from '../src/data/errorGuides'

export const config = {
  runtime: 'edge',
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function normalizeText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
}

export default async function handler(request) {
  const url = new URL(request.url)
  const slug = normalizeText(url.searchParams.get('slug'))

  if (!slug) {
    return new Response('<h1>Not found</h1>', { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  }

  const guide = errorGuides.find((g) => g.slug === slug)

  if (!guide) {
    return new Response('<h1>Not found</h1>', { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  }

  const canonical = `https://getfixora.dev/errors/${guide.slug}`

  const html = `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(guide.seoTitle || guide.title)}</title>
  <meta name="description" content="${escapeHtml(guide.seoDescription || guide.shortSummary)}" />
  <meta property="og:title" content="${escapeHtml(guide.seoTitle || guide.title)}" />
  <meta property="og:description" content="${escapeHtml(guide.seoDescription || guide.shortSummary)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="canonical" href="${canonical}" />
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: guide.title,
    description: guide.shortSummary,
    mainEntityOfPage: canonical,
  })}</script>
</head>
<body>
  <h1>${escapeHtml(guide.title)}</h1>
  <p>${escapeHtml(guide.shortSummary)}</p>
</body>
</html>`

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
    },
  })
}
