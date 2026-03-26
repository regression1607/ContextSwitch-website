import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://context-switch-backend.vercel.app/api';

const PLATFORMS = [
  { value: 'general', label: 'General' },
  { value: 'chatgpt', label: 'ChatGPT' },
  { value: 'claude', label: 'Claude' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'midjourney', label: 'Midjourney' },
  { value: 'dalle', label: 'DALL-E' },
  { value: 'other', label: 'Other' },
];

const CATEGORIES = [
  { value: 'prompt', label: 'Prompt', icon: '>', desc: 'Share an AI prompt' },
  { value: 'ai-news', label: 'AI News', icon: 'N', desc: 'Latest AI news & announcements' },
  { value: 'ai-update', label: 'AI Update', icon: 'U', desc: 'New model or feature updates' },
  { value: 'discussion', label: 'Discussion', icon: 'D', desc: 'Start a conversation' },
  { value: 'tutorial', label: 'Tutorial', icon: 'T', desc: 'How-to guide or walkthrough' },
  { value: 'showcase', label: 'Showcase', icon: 'S', desc: 'Show what you built with AI' },
];

const TEMPLATES = [
  { value: 'minimal', label: 'Minimal', desc: 'Clean and simple', preview: { bg: '#0a0a0a', accent: 'rgba(255,255,255,0.1)', text: '#fff' } },
  { value: 'card', label: 'Card', desc: 'Elevated card style', preview: { bg: '#1a1a2e', accent: 'rgba(99,102,241,0.3)', text: '#e0e7ff' } },
  { value: 'magazine', label: 'Magazine', desc: 'Bold editorial look', preview: { bg: '#1a1a1a', accent: 'rgba(244,114,182,0.3)', text: '#fce7f3' } },
  { value: 'terminal', label: 'Terminal', desc: 'Developer / hacker vibe', preview: { bg: '#0d1117', accent: 'rgba(52,211,153,0.3)', text: '#34d399' } },
  { value: 'neon', label: 'Neon', desc: 'Vibrant neon glow', preview: { bg: '#0a0a0a', accent: 'rgba(167,139,250,0.3)', text: '#a78bfa' } },
];

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.5rem',
  color: 'white',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const labelStyle = {
  display: 'block',
  color: 'rgba(255,255,255,0.7)',
  fontSize: '0.85rem',
  fontWeight: 500,
  marginBottom: '0.5rem',
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
  minimal: { pageBg: '#0a0a0a', cardBg: 'transparent', border: 'rgba(255,255,255,0.08)', accent: '#c8f542', titleColor: '#ffffff', textColor: 'rgba(255,255,255,0.8)', promptBg: 'rgba(200, 245, 66, 0.04)', promptBorder: 'rgba(200, 245, 66, 0.2)' },
  card: { pageBg: '#0f0f23', cardBg: '#1a1a2e', border: 'rgba(99,102,241,0.2)', accent: '#818cf8', titleColor: '#e0e7ff', textColor: 'rgba(224, 231, 255, 0.7)', promptBg: 'rgba(99,102,241,0.08)', promptBorder: 'rgba(99,102,241,0.25)' },
  magazine: { pageBg: '#0a0a0a', cardBg: 'transparent', border: 'rgba(244,114,182,0.15)', accent: '#f472b6', titleColor: '#fce7f3', textColor: 'rgba(252, 231, 243, 0.7)', promptBg: 'rgba(244,114,182,0.06)', promptBorder: 'rgba(244,114,182,0.2)' },
  terminal: { pageBg: '#0d1117', cardBg: '#161b22', border: 'rgba(52,211,153,0.2)', accent: '#34d399', titleColor: '#34d399', textColor: 'rgba(52, 211, 153, 0.7)', promptBg: 'rgba(52,211,153,0.06)', promptBorder: 'rgba(52,211,153,0.25)' },
  neon: { pageBg: '#0a0a0a', cardBg: 'transparent', border: 'rgba(167,139,250,0.2)', accent: '#a78bfa', titleColor: '#ddd6fe', textColor: 'rgba(221, 214, 254, 0.7)', promptBg: 'rgba(167,139,250,0.06)', promptBorder: 'rgba(167,139,250,0.25)' },
};

const PLATFORM_LABELS = {
  general: 'General', chatgpt: 'ChatGPT', claude: 'Claude', gemini: 'Gemini',
  midjourney: 'Midjourney', dalle: 'DALL-E', other: 'Other',
};

const CreatePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const [form, setForm] = useState({
    title: '',
    content: '',
    prompt: '',
    tags: '',
    platform: 'general',
    category: 'prompt',
    template: 'minimal',
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const token = localStorage.getItem('contextswitch_token');

  if (!token) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Please login to create a post</p>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#c8f542',
              color: '#0a0a0a',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 3) {
      setError('Maximum 3 images allowed');
      return;
    }

    files.forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        setError('Each image must be under 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target.result.split(',')[1];
        setImages((prev) => [...prev, {
          data: base64,
          contentType: file.type,
          filename: file.name,
        }]);
        setPreviews((prev) => [...prev, ev.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          prompt: form.prompt || null,
          tags: form.tags,
          platform: form.platform,
          category: form.category,
          template: form.template,
          images,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to create post');

      navigate('/posts');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/posts')}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              padding: 0,
            }}
          >
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Posts
          </button>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>
            Create <span style={{ color: '#c8f542' }}>Post</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Share prompts, AI news, updates, tutorials, and more with the community
          </p>
        </div>

        {/* Edit / Preview toggle */}
        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.5rem', padding: '0.25rem' }}>
          <button type="button" onClick={() => setShowPreview(false)} style={{ flex: 1, padding: '0.55rem', borderRadius: '0.4rem', border: 'none', background: !showPreview ? 'rgba(200, 245, 66, 0.15)' : 'transparent', color: !showPreview ? '#c8f542' : 'rgba(255,255,255,0.45)', fontWeight: !showPreview ? 600 : 400, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.15s' }}>
            Edit
          </button>
          <button type="button" onClick={() => setShowPreview(true)} style={{ flex: 1, padding: '0.55rem', borderRadius: '0.4rem', border: 'none', background: showPreview ? 'rgba(200, 245, 66, 0.15)' : 'transparent', color: showPreview ? '#c8f542' : 'rgba(255,255,255,0.45)', fontWeight: showPreview ? 600 : 400, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.15s' }}>
            Preview
          </button>
        </div>

        {/* Preview Panel */}
        {showPreview ? (
          <PostPreview form={form} previews={previews} />
        ) : (
        <form onSubmit={handleSubmit}>
          {/* Category Selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Category *</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setForm({ ...form, category: cat.value })}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderRadius: '0.5rem',
                    border: form.category === cat.value ? '1.5px solid #c8f542' : '1px solid rgba(255,255,255,0.08)',
                    background: form.category === cat.value ? 'rgba(200, 245, 66, 0.08)' : 'rgba(255,255,255,0.02)',
                    color: form.category === cat.value ? '#c8f542' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: form.category === cat.value ? 600 : 400,
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontSize: '1rem', marginBottom: '0.15rem', fontWeight: 700 }}>{cat.icon}</div>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Give your post a catchy title"
              maxLength={200}
              required
              style={inputStyle}
            />
          </div>

          {/* Content */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>Description *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Describe your prompt, how it works, tips, use cases..."
              maxLength={10000}
              required
              rows={6}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
            />
          </div>

          {/* Prompt */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>
              Prompt
              <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, marginLeft: '0.5rem' }}>
                (the actual prompt text others can copy)
              </span>
            </label>
            <textarea
              name="prompt"
              value={form.prompt}
              onChange={handleChange}
              placeholder="Paste your prompt here... Other users will be able to copy this directly."
              maxLength={5000}
              rows={5}
              style={{
                ...inputStyle,
                resize: 'vertical',
                minHeight: '100px',
                background: 'rgba(200, 245, 66, 0.03)',
                border: '1px solid rgba(200, 245, 66, 0.15)',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
              }}
            />
          </div>

          {/* Platform + Tags + Template row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Platform</label>
              <select
                name="platform"
                value={form.platform}
                onChange={handleChange}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value} style={{ background: '#1a1a1a' }}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>
                Tags
                <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, marginLeft: '0.5rem' }}>
                  (comma separated)
                </span>
              </label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="coding, writing, creative"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Template Picker */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Post Template <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>— choose how your shareable post page looks</span></label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.value}
                  type="button"
                  onClick={() => setForm({ ...form, template: tpl.value })}
                  style={{
                    padding: '0.6rem 0.35rem',
                    borderRadius: '0.5rem',
                    border: form.template === tpl.value ? '1.5px solid #c8f542' : '1px solid rgba(255,255,255,0.08)',
                    background: form.template === tpl.value ? 'rgba(200, 245, 66, 0.06)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{
                    width: '100%', height: '36px', borderRadius: '0.25rem', marginBottom: '0.35rem',
                    background: tpl.preview.bg,
                    border: `1px solid ${tpl.preview.accent}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ width: '50%', height: '3px', borderRadius: '2px', background: tpl.preview.accent }} />
                  </div>
                  <div style={{ fontSize: '0.7rem', color: form.template === tpl.value ? '#c8f542' : 'rgba(255,255,255,0.5)', fontWeight: form.template === tpl.value ? 600 : 400 }}>
                    {tpl.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Images */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>
              Images
              <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, marginLeft: '0.5rem' }}>
                (max 3, under 2MB each)
              </span>
            </label>

            {/* Image previews */}
            {previews.length > 0 && (
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                {previews.map((preview, i) => (
                  <div key={i} style={{ position: 'relative', width: '120px', height: '120px' }}>
                    <img
                      src={preview}
                      alt={`Preview ${i + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-6px',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: '#ef4444',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}

            {images.length < 3 && (
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1.25rem',
                  border: '2px dashed rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '0.85rem',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(200, 245, 66, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              >
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Click to upload images ({images.length}/3)
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={{
              padding: '0.75rem',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '0.5rem',
              color: '#ef4444',
              fontSize: '0.85rem',
              marginBottom: '1rem',
            }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => navigate('/posts')}
              style={{
                flex: 1,
                padding: '0.875rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              style={{
                flex: 1,
                padding: '0.875rem',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '0.5rem',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.95rem',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Preview
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 2,
                padding: '0.875rem',
                background: '#c8f542',
                color: '#0a0a0a',
                fontWeight: 600,
                borderRadius: '0.5rem',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.95rem',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

/* ---- Preview Component ---- */
const PostPreview = ({ form, previews }) => {
  const tpl = TEMPLATE_STYLES[form.template] || TEMPLATE_STYLES.minimal;
  const cat = CATEGORY_LABELS[form.category] || CATEGORY_LABELS.prompt;
  const isTerminal = form.template === 'terminal';
  const isMagazine = form.template === 'magazine';
  const userName = JSON.parse(localStorage.getItem('contextswitch_user') || '{"name":"You"}').name || 'You';
  const tags = form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  return (
    <div style={{ borderRadius: '1rem', overflow: 'hidden', border: `1px solid ${tpl.border}`, background: tpl.pageBg, padding: '0.5rem' }}>
      <div style={{ padding: '1.5rem', background: tpl.cardBg !== 'transparent' ? tpl.cardBg : 'transparent', borderRadius: '0.75rem' }}>
        {/* Terminal bar */}
        {isTerminal && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: `1px solid ${tpl.border}` }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
            <span style={{ marginLeft: '0.5rem', color: tpl.textColor, fontSize: '0.75rem', fontFamily: 'monospace' }}>~/ai-hub/{form.category}</span>
          </div>
        )}

        {/* Author + Category */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${tpl.accent}, ${tpl.accent}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700, color: '#0a0a0a' }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ color: tpl.titleColor, fontWeight: 500, fontSize: '0.9rem' }}>{userName}</div>
              <div style={{ color: tpl.textColor, fontSize: '0.7rem', opacity: 0.6 }}>Just now</div>
            </div>
          </div>
          <span style={{ padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: 600, background: `${cat.color}18`, color: cat.color, border: `1px solid ${cat.color}30` }}>{cat.label}</span>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: isMagazine ? '1.8rem' : '1.4rem', fontWeight: 700, color: tpl.titleColor, lineHeight: 1.3, marginBottom: '0.75rem', fontFamily: isTerminal ? 'monospace' : 'inherit' }}>
          {isTerminal && <span style={{ color: tpl.accent, marginRight: '0.4rem' }}>$</span>}
          {form.title || 'Your post title...'}
        </h2>

        {/* Platform + Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          <span style={{ padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: 500, background: 'rgba(200,245,66,0.15)', color: '#c8f542' }}>{PLATFORM_LABELS[form.platform] || 'General'}</span>
          {tags.map((tag, i) => (
            <span key={i} style={{ padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', color: tpl.textColor }}>#{tag}</span>
          ))}
        </div>

        {/* Images */}
        {previews.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: previews.length === 1 ? '1fr' : 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
            {previews.map((src, i) => (
              <img key={i} src={src} alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '0.5rem', border: `1px solid ${tpl.border}` }} />
            ))}
          </div>
        )}

        {/* Content */}
        <div style={{ color: tpl.textColor, fontSize: isTerminal ? '0.85rem' : '0.95rem', lineHeight: 1.7, marginBottom: '1rem', whiteSpace: 'pre-wrap', fontFamily: isTerminal ? 'monospace' : 'inherit' }}>
          {form.content || 'Your post content will appear here...'}
        </div>

        {/* Prompt */}
        {form.prompt && (
          <div style={{ background: tpl.promptBg, border: `1px solid ${tpl.promptBorder}`, borderRadius: '0.6rem', padding: '1rem' }}>
            <div style={{ color: tpl.accent, fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Prompt
            </div>
            <pre style={{ color: tpl.textColor, fontSize: '0.8rem', lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace', margin: 0, background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '0.4rem' }}>{form.prompt}</pre>
          </div>
        )}
      </div>

      {/* Preview label */}
      <div style={{ textAlign: 'center', padding: '0.75rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
        This is a preview of how your post will look with the <strong style={{ color: tpl.accent }}>{form.template}</strong> template
      </div>
    </div>
  );
};

export default CreatePost;
