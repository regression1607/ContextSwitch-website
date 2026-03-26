const steps = [
  {
    number: '01',
    title: 'Explore AI Content',
    description: 'Browse prompts, AI news, model updates, tutorials, and showcases — all shared by the community and filterable by category.',
  },
  {
    number: '02',
    title: 'Share Your Knowledge',
    description: 'Post prompts, discuss new AI models, share tutorials, or showcase what you built. Choose a template to make it shareable.',
  },
  {
    number: '03',
    title: 'Copy & Use Instantly',
    description: 'Found a prompt you love? Copy it with one click and paste directly into ChatGPT, Claude, or Gemini.',
  },
  {
    number: '04',
    title: 'Share Everywhere',
    description: 'Every post gets a unique shareable URL with a styled template. Share your posts to Twitter, LinkedIn, Reddit, and more.',
  },
];

const PromptHubPreview = () => {
  return (
    <section id="prompt-hub" style={{ padding: '6rem 0', position: 'relative' }}>
      {/* Subtle gradient divider */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.3), transparent)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label" style={{ background: 'rgba(167, 139, 250, 0.1)', color: '#a78bfa', border: '1px solid rgba(167, 139, 250, 0.2)' }}>
            AI Hub
          </span>
          <h2 className="heading-lg" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            Your community for
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa, #c8f542)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>everything AI</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '42rem', margin: '0 auto' }}>
            Prompts, AI news, upcoming updates, tutorials, and showcases — discover, share, and stay ahead of the AI curve.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="how-it-works-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div style={{
                fontSize: '3rem',
                fontWeight: 700,
                color: 'rgba(167, 139, 250, 0.12)',
                marginBottom: '0.75rem',
                lineHeight: 1,
              }}>
                {step.number}
              </div>

              {/* Visual Card */}
              <div style={{
                width: '100%',
                height: '10rem',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                borderRadius: '1rem',
                border: '1px solid rgba(167, 139, 250, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Step 1: Browse/Discover visual */}
                {index === 0 && (
                  <div style={{ padding: '0.85rem', width: '100%' }}>
                    {/* Search bar */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      padding: '0.35rem 0.6rem', background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.4rem',
                      marginBottom: '0.6rem',
                    }}>
                      <svg style={{ width: '0.7rem', height: '0.7rem', color: 'rgba(255,255,255,0.25)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.55rem' }}>Search AI Hub...</span>
                    </div>
                    {/* Filter pills */}
                    <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                      {['Prompts', 'AI News', 'Updates', 'Tutorials'].map((tag, i) => (
                        <span key={i} style={{
                          padding: '0.15rem 0.4rem', borderRadius: '1rem', fontSize: '0.5rem',
                          background: i === 0 ? 'rgba(167, 139, 250, 0.2)' : 'rgba(255,255,255,0.05)',
                          color: i === 0 ? '#a78bfa' : 'rgba(255,255,255,0.35)',
                          border: i === 0 ? '1px solid rgba(167, 139, 250, 0.3)' : '1px solid rgba(255,255,255,0.06)',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Mini post cards */}
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {[1, 2].map((_, i) => (
                        <div key={i} style={{
                          flex: 1, padding: '0.4rem', background: 'rgba(255,255,255,0.03)',
                          borderRadius: '0.35rem', border: '1px solid rgba(255,255,255,0.06)',
                        }}>
                          <div style={{ height: '0.35rem', width: i === 0 ? '80%' : '60%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '0.25rem' }} />
                          <div style={{ height: '0.3rem', width: '50%', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Share/Post visual */}
                {index === 1 && (
                  <div style={{ padding: '0.85rem', width: '100%' }}>
                    {/* Mini create form */}
                    <div style={{
                      padding: '0.5rem', background: 'rgba(255,255,255,0.03)',
                      borderRadius: '0.4rem', border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                        <div style={{
                          width: '1.1rem', height: '1.1rem', borderRadius: '50%',
                          background: 'linear-gradient(135deg, #a78bfa, #c8f542)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.45rem', fontWeight: 700, color: '#0a0a0a',
                        }}>E</div>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.55rem' }}>Share something...</span>
                      </div>
                      {/* Fake prompt text */}
                      <div style={{
                        padding: '0.3rem 0.5rem',
                        background: 'rgba(167, 139, 250, 0.06)',
                        border: '1px solid rgba(167, 139, 250, 0.15)',
                        borderRadius: '0.3rem', marginBottom: '0.4rem',
                        fontFamily: 'monospace',
                      }}>
                        <span style={{ color: 'rgba(167, 139, 250, 0.6)', fontSize: '0.5rem' }}>
                          Act as a senior dev. Review my code for...
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '0.3rem' }}>
                          <div style={{ width: '1.4rem', height: '1rem', borderRadius: '0.2rem', background: 'rgba(255,255,255,0.06)', border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg style={{ width: '0.5rem', height: '0.5rem', color: 'rgba(255,255,255,0.2)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span style={{ padding: '0.1rem 0.3rem', background: 'rgba(16, 163, 127, 0.15)', color: '#10a37f', fontSize: '0.45rem', borderRadius: '0.2rem' }}>#coding</span>
                        </div>
                        <span style={{ padding: '0.15rem 0.4rem', background: '#a78bfa', color: '#0a0a0a', fontSize: '0.5rem', fontWeight: 600, borderRadius: '0.25rem' }}>Post</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Copy & Use visual */}
                {index === 2 && (
                  <div style={{ padding: '0.85rem', width: '100%' }}>
                    {/* Prompt card with copy */}
                    <div style={{
                      padding: '0.5rem', background: 'rgba(200, 245, 66, 0.04)',
                      border: '1px solid rgba(200, 245, 66, 0.15)', borderRadius: '0.4rem',
                      marginBottom: '0.5rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <span style={{ color: '#c8f542', fontSize: '0.55rem', fontWeight: 600 }}>Prompt</span>
                        <span style={{ padding: '0.1rem 0.35rem', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', fontSize: '0.45rem', borderRadius: '0.2rem', fontWeight: 500 }}>
                          ✓ Copied!
                        </span>
                      </div>
                      <div style={{
                        padding: '0.3rem', background: 'rgba(0,0,0,0.3)',
                        borderRadius: '0.25rem', fontFamily: 'monospace',
                        color: 'rgba(255,255,255,0.5)', fontSize: '0.48rem', lineHeight: 1.5,
                      }}>
                        You are a world-class prompt engineer. Given any task, generate the optimal prompt...
                      </div>
                    </div>
                    {/* Arrow down */}
                    <div style={{ textAlign: 'center', marginBottom: '0.35rem' }}>
                      <svg style={{ width: '0.9rem', height: '0.9rem', color: 'rgba(200, 245, 66, 0.4)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                    {/* Chat input */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.3rem',
                      padding: '0.3rem 0.5rem', background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.4rem',
                    }}>
                      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.5rem', flex: 1 }}>Pasted into ChatGPT...</span>
                      <svg style={{ width: '0.65rem', height: '0.65rem', color: '#c8f542' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Step 4: Stay Updated visual */}
                {index === 3 && (
                  <div style={{ padding: '0.85rem', width: '100%' }}>
                    {/* Trending topics */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.55rem' }}>
                      <svg style={{ width: '0.7rem', height: '0.7rem', color: '#a78bfa' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span style={{ color: '#a78bfa', fontSize: '0.55rem', fontWeight: 600 }}>Trending Now</span>
                    </div>
                    {/* Topic items */}
                    {[
                      { label: 'GPT-5 release date leaked', tag: 'Hot', tagColor: '#ef4444' },
                      { label: 'Claude 4 Sonnet is here', tag: 'New', tagColor: '#c8f542' },
                      { label: 'Gemini 2.5 Pro tips', tag: '120+', tagColor: '#a78bfa' },
                    ].map((item, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0.3rem 0.45rem', marginBottom: '0.3rem',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '0.3rem', border: '1px solid rgba(255,255,255,0.05)',
                      }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.52rem' }}>{item.label}</span>
                        <span style={{
                          padding: '0.08rem 0.3rem', fontSize: '0.42rem', fontWeight: 600,
                          borderRadius: '1rem',
                          background: `${item.tagColor}20`,
                          color: item.tagColor,
                        }}>{item.tag}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>{step.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href="/posts"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.875rem 2rem',
              background: 'linear-gradient(135deg, #a78bfa, #c8f542)',
              color: '#0a0a0a',
              fontWeight: 600,
              fontSize: '1rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
          >
            Explore AI Hub
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginTop: '0.75rem' }}>
            Free to browse. Login to post and like.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PromptHubPreview;
