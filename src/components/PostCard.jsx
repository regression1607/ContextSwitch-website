import { useState } from 'react';

const API_URL = 'https://context-switch-backend.vercel.app/api';

const CATEGORY_COLORS = {
  'prompt': { bg: 'rgba(200,245,66,0.12)', text: '#c8f542', label: 'Prompt' },
  'ai-news': { bg: 'rgba(96,165,250,0.12)', text: '#60a5fa', label: 'AI News' },
  'ai-update': { bg: 'rgba(244,114,182,0.12)', text: '#f472b6', label: 'AI Update' },
  'discussion': { bg: 'rgba(250,204,21,0.12)', text: '#facc15', label: 'Discussion' },
  'tutorial': { bg: 'rgba(52,211,153,0.12)', text: '#34d399', label: 'Tutorial' },
  'showcase': { bg: 'rgba(167,139,250,0.12)', text: '#a78bfa', label: 'Showcase' },
};

const PLATFORM_COLORS = {
  chatgpt: { bg: 'rgba(16, 163, 127, 0.15)', text: '#10a37f', label: 'ChatGPT' },
  claude: { bg: 'rgba(204, 120, 50, 0.15)', text: '#cc7832', label: 'Claude' },
  gemini: { bg: 'rgba(66, 133, 244, 0.15)', text: '#4285f4', label: 'Gemini' },
  midjourney: { bg: 'rgba(153, 102, 255, 0.15)', text: '#9966ff', label: 'Midjourney' },
  dalle: { bg: 'rgba(255, 107, 107, 0.15)', text: '#ff6b6b', label: 'DALL-E' },
  general: { bg: 'rgba(200, 245, 66, 0.15)', text: '#c8f542', label: 'General' },
  other: { bg: 'rgba(255,255,255,0.1)', text: 'rgba(255,255,255,0.6)', label: 'Other' },
};

const PostCard = ({ post, onLike, onClick }) => {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [likeLoading, setLikeLoading] = useState(false);

  const platform = PLATFORM_COLORS[post.platform] || PLATFORM_COLORS.general;
  const category = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.prompt;
  const authorName = post.author?.name || 'Anonymous';
  const timeAgo = getTimeAgo(post.createdAt);

  const handleLike = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem('contextswitch_token');
    if (!token) {
      alert('Please login to like posts');
      return;
    }

    setLikeLoading(true);
    try {
      const res = await fetch(`${API_URL}/posts/${post._id}/like`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success) {
        setLiked(data.data.isLiked);
        setLikesCount(data.data.likesCount);
        if (onLike) onLike(post._id, data.data);
      }
    } catch (err) {
      console.error('Like error:', err);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCopyPrompt = (e) => {
    e.stopPropagation();
    if (post.prompt) {
      navigator.clipboard.writeText(post.prompt);
    }
  };

  return (
    <div
      onClick={() => onClick && onClick(post)}
      style={{
        background: '#1a1a1a',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'row',
        minHeight: '140px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(200, 245, 66, 0.3)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Thumbnail (left side) */}
      {post.thumbnail && (
        <div style={{
          width: '180px',
          minWidth: '180px',
          overflow: 'hidden',
          background: '#111',
          flexShrink: 0,
        }}>
          <img
            src={`data:${post.thumbnail.contentType};base64,${post.thumbnail.data}`}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}

      {/* Content (right side) */}
      <div style={{ padding: '1rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
        {/* Top section */}
        <div>
          {/* Header: Author + Time */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #c8f542, #a8d535)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                fontWeight: 700,
                color: '#0a0a0a',
                flexShrink: 0,
              }}>
                {authorName.charAt(0).toUpperCase()}
              </div>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem' }}>{authorName}</span>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem' }}>·</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem' }}>{timeAgo}</span>
            </div>
          </div>

          {/* Title */}
          <h3 style={{
            color: 'white',
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '0.35rem',
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {post.title}
          </h3>

          {/* Content preview */}
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '0.82rem',
            lineHeight: 1.45,
            marginBottom: '0.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {post.content}
          </p>

          {/* Tags + Platform + Category */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.5rem' }}>
            <span style={{
              padding: '0.15rem 0.5rem',
              borderRadius: '1rem',
              fontSize: '0.65rem',
              fontWeight: 600,
              background: category.bg,
              color: category.text,
            }}>
              {category.label}
            </span>
            <span style={{
              padding: '0.15rem 0.5rem',
              borderRadius: '1rem',
              fontSize: '0.65rem',
              fontWeight: 500,
              background: platform.bg,
              color: platform.text,
            }}>
              {platform.label}
            </span>
            {post.tags?.slice(0, 2).map((tag, i) => (
              <span key={i} style={{
                padding: '0.15rem 0.5rem',
                borderRadius: '1rem',
                fontSize: '0.65rem',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.45)',
              }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: Likes, Views, Copy */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.5rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Like button */}
            <button
              onClick={handleLike}
              disabled={likeLoading}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                cursor: 'pointer',
                color: liked ? '#ef4444' : 'rgba(255,255,255,0.4)',
                fontSize: '0.75rem',
                padding: 0,
                transition: 'color 0.2s',
              }}
            >
              <svg style={{ width: '14px', height: '14px' }} fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likesCount}
            </button>

            {/* Views */}
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.75rem',
            }}>
              <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.views || 0}
            </span>

            {/* Image count */}
            {(post.imageCount > 0) && (
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.75rem',
              }}>
                <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.imageCount}
              </span>
            )}
          </div>

          {/* Copy prompt */}
          {post.prompt && (
            <button
              onClick={handleCopyPrompt}
              style={{
                background: 'rgba(200, 245, 66, 0.1)',
                border: '1px solid rgba(200, 245, 66, 0.2)',
                borderRadius: '0.4rem',
                padding: '0.25rem 0.5rem',
                color: '#c8f542',
                fontSize: '0.65rem',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Copy Prompt
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function getTimeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default PostCard;
