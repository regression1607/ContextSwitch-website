import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'https://context-switch-backend.vercel.app/api';
const SITE_URL = 'https://www.context-switch.dev';

const PLATFORM_COLORS = {
  chatgpt: { bg: 'rgba(16, 163, 127, 0.15)', text: '#10a37f', label: 'ChatGPT' },
  claude: { bg: 'rgba(204, 120, 50, 0.15)', text: '#cc7832', label: 'Claude' },
  gemini: { bg: 'rgba(66, 133, 244, 0.15)', text: '#4285f4', label: 'Gemini' },
  midjourney: { bg: 'rgba(153, 102, 255, 0.15)', text: '#9966ff', label: 'Midjourney' },
  dalle: { bg: 'rgba(255, 107, 107, 0.15)', text: '#ff6b6b', label: 'DALL-E' },
  general: { bg: 'rgba(200, 245, 66, 0.15)', text: '#c8f542', label: 'General' },
  other: { bg: 'rgba(255,255,255,0.1)', text: 'rgba(255,255,255,0.6)', label: 'Other' },
};

const CATEGORY_LABELS = {
  'prompt': { label: 'Prompt', color: '#c8f542' },
  'ai-news': { label: 'AI News', color: '#60a5fa' },
  'ai-update': { label: 'AI Update', color: '#f472b6' },
  'discussion': { label: 'Discussion', color: '#facc15' },
  'tutorial': { label: 'Tutorial', color: '#34d399' },
  'showcase': { label: 'Showcase', color: '#a78bfa' },
};

const TEMPLATE_STYLES = {
  minimal: {
    pageBg: '#0a0a0a',
    cardBg: 'transparent',
    border: 'rgba(255,255,255,0.08)',
    accent: '#c8f542',
    titleColor: '#ffffff',
    textColor: 'rgba(255,255,255,0.8)',
    promptBg: 'rgba(200, 245, 66, 0.04)',
    promptBorder: 'rgba(200, 245, 66, 0.2)',
  },
  card: {
    pageBg: '#0f0f23',
    cardBg: '#1a1a2e',
    border: 'rgba(99,102,241,0.2)',
    accent: '#818cf8',
    titleColor: '#e0e7ff',
    textColor: 'rgba(224, 231, 255, 0.7)',
    promptBg: 'rgba(99,102,241,0.08)',
    promptBorder: 'rgba(99,102,241,0.25)',
  },
  magazine: {
    pageBg: '#0a0a0a',
    cardBg: 'transparent',
    border: 'rgba(244,114,182,0.15)',
    accent: '#f472b6',
    titleColor: '#fce7f3',
    textColor: 'rgba(252, 231, 243, 0.7)',
    promptBg: 'rgba(244,114,182,0.06)',
    promptBorder: 'rgba(244,114,182,0.2)',
  },
  terminal: {
    pageBg: '#0d1117',
    cardBg: '#161b22',
    border: 'rgba(52,211,153,0.2)',
    accent: '#34d399',
    titleColor: '#34d399',
    textColor: 'rgba(52, 211, 153, 0.7)',
    promptBg: 'rgba(52,211,153,0.06)',
    promptBorder: 'rgba(52,211,153,0.25)',
  },
  neon: {
    pageBg: '#0a0a0a',
    cardBg: 'transparent',
    border: 'rgba(167,139,250,0.2)',
    accent: '#a78bfa',
    titleColor: '#ddd6fe',
    textColor: 'rgba(221, 214, 254, 0.7)',
    promptBg: 'rgba(167,139,250,0.06)',
    promptBorder: 'rgba(167,139,250,0.25)',
  },
};

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const token = localStorage.getItem('contextswitch_token');
  const currentUser = JSON.parse(localStorage.getItem('contextswitch_user') || 'null');
  const shareUrl = `${SITE_URL}/posts/${id}`;

  useEffect(() => {
    fetchPost();
  }, [id]);

  // Dynamic SEO meta tags
  useEffect(() => {
    if (!post) return;
    const title = `${post.title} | ContextSwitch AI Hub`;
    const desc = post.content.substring(0, 160).replace(/\n/g, ' ');
    const url = shareUrl;
    const authorName = post.author?.name || 'Anonymous';

    document.title = title;

    const setMeta = (attr, key, value) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };

    setMeta('name', 'description', desc);
    setMeta('name', 'author', authorName);
    setMeta('property', 'og:type', 'article');
    setMeta('property', 'og:title', post.title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:site_name', 'ContextSwitch AI Hub');
    setMeta('property', 'og:image', 'https://www.context-switch.dev/og-image.png');
    setMeta('property', 'article:published_time', post.createdAt);
    setMeta('property', 'article:author', authorName);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', post.title);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', 'https://www.context-switch.dev/og-image.png');

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', url);

    // JSON-LD structured data
    let script = document.getElementById('post-jsonld');
    if (!script) { script = document.createElement('script'); script.id = 'post-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': post.title,
      'description': desc,
      'url': url,
      'datePublished': post.createdAt,
      'author': { '@type': 'Person', 'name': authorName },
      'publisher': { '@type': 'Organization', 'name': 'ContextSwitch', 'url': 'https://www.context-switch.dev', 'logo': { '@type': 'ImageObject', 'url': 'https://www.context-switch.dev/favicon.svg' } },
      'mainEntityOfPage': { '@type': 'WebPage', '@id': url },
      'keywords': post.tags?.join(', ') || '',
    });

    return () => {
      document.title = 'ContextSwitch - Save ChatGPT, Gemini 2.0, Claude 3.5 Conversations | AI Context Manager';
      const jsonld = document.getElementById('post-jsonld');
      if (jsonld) jsonld.remove();
    };
  }, [post]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${API_URL}/posts/${id}`, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Post not found');
      setPost(data.data.post);
      setLiked(data.data.post.isLiked || false);
      setLikesCount(data.data.post.likesCount || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!token) { alert('Please login to like posts'); return; }
    try {
      const res = await fetch(`${API_URL}/posts/${id}/like`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) { setLiked(data.data.isLiked); setLikesCount(data.data.likesCount); }
    } catch (err) { console.error('Like error:', err); }
  };

  const handleCopyPrompt = () => {
    if (post?.prompt) {
      navigator.clipboard.writeText(post.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const text = `Check out "${post.title}" on ContextSwitch AI Hub`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleShareReddit = () => {
    window.open(`https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`, '_blank');
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`${API_URL}/posts/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) navigate('/posts');
    } catch (err) { console.error('Delete error:', err); }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid #c8f542', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{error || 'Post not found'}</p>
          <button onClick={() => navigate('/posts')} style={{ padding: '0.75rem 1.5rem', background: '#c8f542', color: '#0a0a0a', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>Back to Posts</button>
        </div>
      </div>
    );
  }

  const tpl = TEMPLATE_STYLES[post.template] || TEMPLATE_STYLES.minimal;
  const platform = PLATFORM_COLORS[post.platform] || PLATFORM_COLORS.general;
  const cat = CATEGORY_LABELS[post.category] || CATEGORY_LABELS.prompt;
  const isOwner = currentUser && post.author && currentUser.id === post.author._id;
  const isTerminal = post.template === 'terminal';
  const isMagazine = post.template === 'magazine';

  return (
    <div style={{ minHeight: '100vh', background: tpl.pageBg, paddingTop: '5rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Breadcrumb navigation (SEO + UX) */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <ol style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.82rem' }}>
            <li><a href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</a></li>
            <li style={{ color: 'rgba(255,255,255,0.25)' }}>/</li>
            <li><a href="/posts" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>AI Hub</a></li>
            <li style={{ color: 'rgba(255,255,255,0.25)' }}>/</li>
            <li style={{ color: '#c8f542', fontWeight: 500, maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post?.title || 'Post'}</li>
          </ol>
        </nav>

        {/* Template card wrapper */}
        <div style={{
          background: tpl.cardBg,
          border: tpl.cardBg !== 'transparent' ? `1px solid ${tpl.border}` : 'none',
          borderRadius: tpl.cardBg !== 'transparent' ? '1rem' : 0,
          padding: tpl.cardBg !== 'transparent' ? '2rem' : 0,
        }}>
          {/* Terminal header bar */}
          {isTerminal && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: `1px solid ${tpl.border}` }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
              <span style={{ marginLeft: '0.5rem', color: tpl.textColor, fontSize: '0.75rem', fontFamily: 'monospace' }}>~/ai-hub/{post.category}</span>
            </div>
          )}

          {/* Category + Author row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${tpl.accent}, ${tpl.accent}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, color: '#0a0a0a', flexShrink: 0 }}>
                {(post.author?.name || 'A').charAt(0).toUpperCase()}
              </div>
              <div>
                <span style={{ color: tpl.titleColor, fontWeight: 500, fontSize: '0.95rem' }}>{post.author?.name || 'Anonymous'}</span>
                <div style={{ color: tpl.textColor, fontSize: '0.75rem', opacity: 0.6 }}>
                  {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {post.views} views
                </div>
              </div>
            </div>
            <span style={{ padding: '0.25rem 0.7rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600, background: `${cat.color}18`, color: cat.color, border: `1px solid ${cat.color}30` }}>
              {cat.label}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: isMagazine ? '2.25rem' : '1.75rem',
            fontWeight: 700,
            color: tpl.titleColor,
            lineHeight: 1.3,
            marginBottom: '1rem',
            fontFamily: isTerminal ? 'monospace' : 'inherit',
          }}>
            {isTerminal && <span style={{ color: tpl.accent, marginRight: '0.5rem' }}>$</span>}
            {post.title}
          </h1>

          {/* Tags + Platform */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span style={{ padding: '0.3rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 500, background: platform.bg, color: platform.text }}>{platform.label}</span>
            {post.tags?.map((tag, i) => (
              <span key={i} style={{ padding: '0.3rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.06)', color: tpl.textColor }}>#{tag}</span>
            ))}
          </div>

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: post.images.length === 1 ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.75rem' }}>
                {post.images.map((img, i) => (
                  <div key={i} onClick={() => setSelectedImage(img)} style={{ borderRadius: '0.75rem', overflow: 'hidden', border: `1px solid ${tpl.border}`, cursor: 'pointer', maxHeight: post.images.length === 1 ? '500px' : '300px' }}>
                    <img src={`data:${img.contentType};base64,${img.data}`} alt={`${post.title} image ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div style={{
            color: tpl.textColor,
            fontSize: isTerminal ? '0.9rem' : '1rem',
            lineHeight: 1.8,
            marginBottom: '1.5rem',
            whiteSpace: 'pre-wrap',
            fontFamily: isTerminal ? 'monospace' : 'inherit',
          }}>
            {post.content}
          </div>

          {/* Prompt box */}
          {post.prompt && (
            <div style={{ background: tpl.promptBg, border: `1px solid ${tpl.promptBorder}`, borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: tpl.accent, fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Prompt
                </span>
                <button onClick={handleCopyPrompt} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', background: copied ? 'rgba(52, 211, 153, 0.15)' : `${tpl.accent}15`, border: `1px solid ${copied ? 'rgba(52, 211, 153, 0.3)' : `${tpl.accent}30`}`, borderRadius: '0.4rem', color: copied ? '#34d399' : tpl.accent, fontSize: '0.8rem', cursor: 'pointer', fontWeight: 500 }}>
                  <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {copied ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />}
                  </svg>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre style={{ color: tpl.textColor, fontSize: '0.85rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace', margin: 0, background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.5rem' }}>
                {post.prompt}
              </pre>
            </div>
          )}
        </div>

        {/* Share bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '1.25rem 0', borderTop: `1px solid ${tpl.border}`, flexWrap: 'wrap' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 500, marginRight: '0.25rem' }}>Share:</span>
          {/* Copy Link */}
          <button onClick={handleCopyLink} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.75rem', background: linkCopied ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${linkCopied ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '0.4rem', color: linkCopied ? '#34d399' : 'rgba(255,255,255,0.6)', fontSize: '0.78rem', cursor: 'pointer' }}>
            <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            {linkCopied ? 'Link Copied!' : 'Copy Link'}
          </button>
          {/* Twitter/X */}
          <button onClick={handleShareTwitter} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.4rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', cursor: 'pointer' }}>
            <svg style={{ width: '14px', height: '14px' }} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            Twitter
          </button>
          {/* LinkedIn */}
          <button onClick={handleShareLinkedIn} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.4rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', cursor: 'pointer' }}>
            <svg style={{ width: '14px', height: '14px' }} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            LinkedIn
          </button>
          {/* Reddit */}
          <button onClick={handleShareReddit} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.4rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', cursor: 'pointer' }}>
            <svg style={{ width: '14px', height: '14px' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /></svg>
            Reddit
          </button>
        </div>

        {/* Action bar: Like + Delete */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderTop: `1px solid ${tpl.border}` }}>
          <button onClick={handleLike} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: liked ? '#ef4444' : 'rgba(255,255,255,0.5)', fontSize: '0.9rem', padding: 0 }}>
            <svg style={{ width: '20px', height: '20px' }} fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
          </button>
          {isOwner && (
            <button onClick={handleDelete} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '0.4rem', padding: '0.4rem 0.8rem', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer' }}>Delete Post</button>
          )}
        </div>
      </div>

      {/* Image lightbox */}
      {selectedImage && (
        <div onClick={() => setSelectedImage(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <img src={`data:${selectedImage.contentType};base64,${selectedImage.data}`} alt="Full size" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '0.5rem' }} />
          <button style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
