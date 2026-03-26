import { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found | ContextSwitch';
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem 1.5rem', maxWidth: '500px' }}>
        <div style={{ fontSize: '6rem', fontWeight: 800, color: '#c8f542', lineHeight: 1, marginBottom: '1rem' }}>404</div>
        <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>Page Not Found</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', lineHeight: 1.6 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/" style={{ padding: '0.65rem 1.5rem', background: '#c8f542', color: '#0a0a0a', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            Go Home
          </a>
          <a href="/posts" style={{ padding: '0.65rem 1.5rem', background: 'rgba(200,245,66,0.1)', border: '1px solid rgba(200,245,66,0.2)', color: '#c8f542', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            Explore AI Hub
          </a>
          <a href="/contact" style={{ padding: '0.65rem 1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
