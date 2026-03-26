import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://context-switch-backend.vercel.app/api';

const CATEGORY_COLORS = {
  'prompt': { bg: 'rgba(200,245,66,0.15)', text: '#c8f542', label: 'Prompt' },
  'ai-news': { bg: 'rgba(96,165,250,0.15)', text: '#60a5fa', label: 'AI News' },
  'ai-update': { bg: 'rgba(244,114,182,0.15)', text: '#f472b6', label: 'AI Update' },
  'discussion': { bg: 'rgba(250,204,21,0.15)', text: '#facc15', label: 'Discussion' },
  'tutorial': { bg: 'rgba(52,211,153,0.15)', text: '#34d399', label: 'Tutorial' },
  'showcase': { bg: 'rgba(167,139,250,0.15)', text: '#a78bfa', label: 'Showcase' },
};

const PostsShowcase = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const animRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/posts/recent?limit=12`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success && data.data.posts.length > 0) {
        setPosts(data.data.posts);
      }
    } catch (err) {
      console.error('PostsShowcase fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll animation
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || posts.length === 0) return;

    let scrollPos = 0;
    const speed = 0.5; // px per frame

    const animate = () => {
      if (!paused) {
        scrollPos += speed;
        // Reset when we've scrolled half (the duplicated set)
        if (scrollPos >= el.scrollWidth / 2) {
          scrollPos = 0;
        }
        el.scrollLeft = scrollPos;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [posts, paused]);

  if (loading || posts.length === 0) return null;

  // Duplicate posts for infinite scroll effect
  const displayPosts = [...posts, ...posts];

  return (
    <section style={{ padding: '3rem 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>
              Trending on <span style={{ color: '#c8f542' }}>AI Hub</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem' }}>
              Prompts, news, tutorials & discussions from the community
            </p>
          </div>
          <button
            onClick={() => navigate('/posts')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.5rem 1rem',
              background: 'rgba(200, 245, 66, 0.1)',
              border: '1px solid rgba(200, 245, 66, 0.2)',
              borderRadius: '0.5rem',
              color: '#c8f542',
              fontSize: '0.8rem',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Explore AI Hub
            <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrolling container with edge blur */}
      <div style={{ position: 'relative' }}>
        {/* Left fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '80px', zIndex: 2,
          background: 'linear-gradient(to right, #0a0a0a, transparent)',
          pointerEvents: 'none',
        }} />
        {/* Right fade */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '80px', zIndex: 2,
          background: 'linear-gradient(to left, #0a0a0a, transparent)',
          pointerEvents: 'none',
        }} />
      <div
        ref={scrollRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          display: 'flex',
          gap: '1rem',
          overflow: 'hidden',
          paddingLeft: '5rem',
          paddingRight: '5rem',
          cursor: 'grab',
        }}
      >
        {displayPosts.map((post, idx) => {
          const cat = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.prompt;
          const authorName = post.author?.name || 'Anonymous';

          return (
            <div
              key={`${post._id}-${idx}`}
              onClick={() => navigate(`/posts/${post._id}`)}
              style={{
                minWidth: '320px',
                maxWidth: '320px',
                background: '#141414',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '0.75rem',
                padding: '1.1rem',
                cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(200,245,66,0.25)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Category + Author */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{
                  padding: '0.15rem 0.5rem', borderRadius: '1rem', fontSize: '0.65rem',
                  fontWeight: 600, background: cat.bg, color: cat.text,
                }}>
                  {cat.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #c8f542, #a8d535)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.55rem', fontWeight: 700, color: '#0a0a0a',
                  }}>
                    {authorName.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>{authorName}</span>
                </div>
              </div>

              {/* Title */}
              <h3 style={{
                color: 'white', fontSize: '0.92rem', fontWeight: 600,
                lineHeight: 1.35, marginBottom: '0.4rem',
                display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {post.title}
              </h3>

              {/* Content preview */}
              <p style={{
                color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem',
                lineHeight: 1.4, marginBottom: '0.5rem',
                display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {post.content}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                {(post.tags || []).slice(0, 3).map((tag, i) => (
                  <span key={i} style={{
                    padding: '0.1rem 0.4rem', borderRadius: '0.75rem', fontSize: '0.6rem',
                    background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.35)',
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                marginTop: '0.6rem', paddingTop: '0.5rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>
                  <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {post.likesCount || 0}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>
                  <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {post.views || 0}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
};

export default PostsShowcase;
