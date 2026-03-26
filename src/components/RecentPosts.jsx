import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';

const API_URL = 'https://context-switch-backend.vercel.app/api';

const RecentPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      const token = localStorage.getItem('contextswitch_token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/posts/recent?limit=6`, { headers });
      const data = await res.json();

      if (data.success) {
        setPosts(data.data.posts);
      }
    } catch (err) {
      console.error('Fetch recent posts error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <div style={{
            width: '32px', height: '32px',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTop: '3px solid #c8f542',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section id="recent-posts" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>
            Recent from <span style={{ color: '#c8f542' }}>AI Hub</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            Latest posts shared by the community
          </p>
        </div>
        <button
          onClick={() => navigate('/posts')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.6rem 1.2rem',
            background: 'rgba(200, 245, 66, 0.1)',
            border: '1px solid rgba(200, 245, 66, 0.2)',
            borderRadius: '0.5rem',
            color: '#c8f542',
            fontSize: '0.85rem',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          View All
          <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Posts list */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onClick={(p) => navigate(`/posts/${p._id}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
