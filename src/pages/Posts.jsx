import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

const API_URL = 'https://context-switch-backend.vercel.app/api';

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'prompt', label: 'Prompts' },
  { value: 'ai-news', label: 'AI News' },
  { value: 'ai-update', label: 'Updates' },
  { value: 'discussion', label: 'Discussion' },
  { value: 'tutorial', label: 'Tutorials' },
  { value: 'showcase', label: 'Showcase' },
];

const PLATFORMS = [
  { value: 'all', label: 'All Platforms' },
  { value: 'chatgpt', label: 'ChatGPT' },
  { value: 'claude', label: 'Claude' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'midjourney', label: 'Midjourney' },
  { value: 'dalle', label: 'DALL-E' },
  { value: 'general', label: 'General' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('all');
  const [platform, setPlatform] = useState('all');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const isLoggedIn = !!localStorage.getItem('contextswitch_token');

  // Dynamic SEO meta tags for the Posts listing page
  useEffect(() => {
    document.title = 'AI Hub - Prompts, News, Tutorials & Discussions | ContextSwitch';
    const setMeta = (attr, key, value) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    setMeta('name', 'description', 'Explore AI prompts, news, tutorials, and discussions shared by the ContextSwitch community. Find the best ChatGPT, Claude, and Gemini prompts. Free and public.');
    setMeta('property', 'og:title', 'AI Hub - Prompts, News & Tutorials | ContextSwitch');
    setMeta('property', 'og:description', 'Community-driven AI prompts, news, tutorials, and discussions. Free and public.');
    setMeta('property', 'og:url', 'https://www.context-switch.dev/posts');
    setMeta('property', 'og:type', 'website');
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', 'https://www.context-switch.dev/posts');
    return () => { document.title = 'ContextSwitch - Save ChatGPT, Gemini 2.0, Claude 3.5 Conversations | AI Context Manager'; };
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [page, category, platform, sort, search]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('contextswitch_token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        sort,
        ...(category !== 'all' && { category }),
        ...(platform !== 'all' && { platform }),
        ...(search && { search }),
      });

      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/posts?${params}`, { headers });
      const data = await res.json();

      if (data.success) {
        setPosts(data.data.posts);
        setTotalPages(data.data.pagination.pages);
      }
    } catch (err) {
      console.error('Fetch posts error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const handlePostClick = (post) => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>
              AI <span style={{ color: '#c8f542' }}>Hub</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              Prompts, AI news, updates, tutorials & more from the community
            </p>
          </div>
          <button
            onClick={() => isLoggedIn ? navigate('/posts/create') : alert('Please login to create a post')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: '#c8f542',
              color: '#0a0a0a',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Post
          </button>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => { setCategory(c.value); setPage(1); }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                border: category === c.value ? '1px solid #c8f542' : '1px solid rgba(255,255,255,0.08)',
                background: category === c.value ? 'rgba(200, 245, 66, 0.12)' : 'rgba(255,255,255,0.02)',
                color: category === c.value ? '#c8f542' : 'rgba(255,255,255,0.5)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                fontWeight: category === c.value ? 600 : 400,
                transition: 'all 0.15s',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Filters Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}>
          {/* Search */}
          <form onSubmit={handleSearch} style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search posts..."
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem 0.65rem 2.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <svg style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: 'rgba(255,255,255,0.3)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          {/* Platform filter */}
          <select
            value={platform}
            onChange={(e) => { setPlatform(e.target.value); setPage(1); }}
            style={{
              padding: '0.55rem 0.75rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0.5rem',
              color: 'white',
              fontSize: '0.85rem',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {PLATFORMS.map((p) => (
              <option key={p.value} value={p.value} style={{ background: '#1a1a1a' }}>
                {p.label}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            style={{
              padding: '0.55rem 0.75rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0.5rem',
              color: 'white',
              fontSize: '0.85rem',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value} style={{ background: '#1a1a1a' }}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(255,255,255,0.1)',
              borderTop: '3px solid #c8f542',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : posts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'rgba(255,255,255,0.4)',
          }}>
            <svg style={{ width: '48px', height: '48px', margin: '0 auto 1rem', opacity: 0.3 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No posts found</p>
            <p style={{ fontSize: '0.85rem' }}>
              No posts yet — be the first to share something!
            </p>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onClick={handlePostClick}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '2.5rem',
          }}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                padding: '0.5rem 1rem',
                background: page === 1 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
                color: page === 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                fontSize: '0.85rem',
              }}
            >
              Previous
            </button>
            <span style={{
              padding: '0.5rem 1rem',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
            }}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                padding: '0.5rem 1rem',
                background: page === totalPages ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
                color: page === totalPages ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                fontSize: '0.85rem',
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
