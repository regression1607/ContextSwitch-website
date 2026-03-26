const About = () => {
  const stats = [
    { label: 'Active Users', value: '10,000+' },
    { label: 'Conversations Saved', value: '500K+' },
    { label: 'Tokens Saved Monthly', value: '50M+' },
    { label: 'AI Platforms Supported', value: '3' },
  ];

  const team = [
    { name: 'Ekansh Kumar', role: 'Founder & Developer', bio: 'Full-stack developer passionate about AI productivity tools. Built ContextSwitch to solve his own workflow pain points.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '6rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            About <span style={{ color: '#c8f542' }}>ContextSwitch</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            The AI productivity platform that saves your conversations, compresses context, and powers a thriving AI community hub.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '3.5rem' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#c8f542', marginBottom: '0.25rem' }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>

          {/* Mission */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#c8f542' }}>01.</span> Our Mission
            </h2>
            <p>
              ContextSwitch was created to solve a common frustration: losing valuable AI conversation context
              when switching between projects or starting new chat sessions. We believe that your conversations
              with AI assistants like ChatGPT, Claude, and Gemini contain valuable context that shouldn't be lost.
            </p>
            <p style={{ marginTop: '0.75rem' }}>
              Beyond saving conversations, we're building a community-driven <strong><a href="/posts" style={{ color: '#c8f542', textDecoration: 'none' }}>AI Hub</a></strong> where
              users share prompts, AI news, tutorials, and discussions — making AI knowledge accessible to everyone.
            </p>
          </section>

          {/* What We Do */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#c8f542' }}>02.</span> What We Do
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              ContextSwitch is a Chrome extension and web platform that helps you:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              {[
                { title: 'Save Conversations', desc: 'Capture your AI chat history with one click across ChatGPT, Claude, and Gemini.' },
                { title: 'Compress Context', desc: 'Intelligently compress long conversations by up to 70% while preserving key information.' },
                { title: 'Restore Instantly', desc: 'Load your saved context into any new conversation — continue where you left off.' },
                { title: 'Organize Projects', desc: 'Keep different projects and contexts neatly separated and easy to find.' },
                { title: 'AI Hub Community', desc: 'Share and discover AI prompts, news, tutorials, and discussions with the community.' },
                { title: 'Save Money', desc: 'Reduce token usage and AI subscription costs by reusing compressed context.' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(200, 245, 66, 0.03)', border: '1px solid rgba(200, 245, 66, 0.1)', borderRadius: '0.6rem', padding: '1rem' }}>
                  <strong style={{ color: '#c8f542' }}>{item.title}</strong>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.3rem' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Supported Platforms */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#c8f542' }}>03.</span> Supported Platforms
            </h2>
            <p>ContextSwitch supports the three major AI platforms:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>ChatGPT</strong> by OpenAI — GPT-4, GPT-4o, GPT-4 Turbo (chat.openai.com, chatgpt.com)</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Claude</strong> by Anthropic — Claude 3.5 Sonnet, Claude Opus (claude.ai)</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Gemini</strong> by Google — Gemini Pro, Gemini 2.0 (gemini.google.com)</li>
            </ul>
          </section>

          {/* AI Hub */}
          <section style={{ marginBottom: '2.5rem', background: 'rgba(200, 245, 66, 0.04)', border: '1px solid rgba(200, 245, 66, 0.12)', borderRadius: '0.75rem', padding: '1.5rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#c8f542' }}>04.</span> AI Hub — Community Knowledge
            </h2>
            <p>
              Our <strong><a href="/posts" style={{ color: '#c8f542', textDecoration: 'none' }}>AI Hub</a></strong> is a free, public platform where the AI community shares:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
              <li style={{ marginBottom: '0.4rem' }}><strong>Prompts:</strong> Battle-tested prompts for coding, writing, business, and more</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>AI News:</strong> Latest announcements from OpenAI, Google, Anthropic, Meta, and others</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Tutorials:</strong> Step-by-step guides for RAG, fine-tuning, agents, and more</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Discussions:</strong> Community conversations about AI careers, ethics, and trends</li>
              <li style={{ marginBottom: '0.4rem' }}><strong>Showcases:</strong> Real-world AI tools and project demonstrations</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>
              All posts are publicly accessible — no login required to read. Each post has a unique, shareable URL optimized for search engines and social media.
            </p>
          </section>

          {/* Our Story */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#c8f542' }}>05.</span> Our Story
            </h2>
            <p>
              ContextSwitch was built by a developer who was tired of re-explaining project context every time
              they started a new AI chat session. What started as a personal tool has grown into a platform
              designed to help anyone who uses AI assistants for work, research, or creative projects.
            </p>
            <p style={{ marginTop: '0.75rem' }}>
              Today, ContextSwitch serves thousands of developers, writers, researchers, and AI enthusiasts
              who rely on it daily to maintain productivity across multiple AI platforms.
            </p>
          </section>

          {/* Team */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#c8f542' }}>06.</span> Team
            </h2>
            {team.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '1.25rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #c8f542, #a8d535)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 700, color: '#0a0a0a', flexShrink: 0 }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: '1.05rem' }}>{t.name}</div>
                  <div style={{ color: '#c8f542', fontSize: '0.82rem', marginBottom: '0.25rem' }}>{t.role}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{t.bio}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Privacy */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#c8f542' }}>07.</span> Privacy First
            </h2>
            <p>
              We take your privacy seriously. Your conversation data is stored locally on your device by default.
              We don't have access to your saved conversations unless you explicitly choose to use our cloud
              features. Read our <a href="/privacy" style={{ color: '#c8f542' }}>Privacy Policy</a> for more details.
            </p>
          </section>

          {/* Contact */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#c8f542' }}>08.</span> Contact Us
            </h2>
            <p>
              We'd love to hear from you! Whether you have questions, feedback, or feature requests,
              feel free to reach out.
            </p>
            <p style={{ marginTop: '1rem' }}>
              <strong>Email:</strong> <a href="mailto:ekanshrajput1607@gmail.com" style={{ color: '#c8f542' }}>ekanshrajput1607@gmail.com</a>
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              <strong>Contact Form:</strong> <a href="/contact" style={{ color: '#c8f542' }}>Visit our Contact Page</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
