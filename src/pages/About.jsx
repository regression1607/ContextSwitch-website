const About = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '6rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
          About <span style={{ color: '#c8f542' }}>ContextSwitch</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '3rem' }}>
          Simplifying AI conversation management
        </p>

        <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Our Mission</h2>
            <p>
              ContextSwitch was created to solve a common frustration: losing valuable AI conversation context 
              when switching between projects or starting new chat sessions. We believe that your conversations 
              with AI assistants like ChatGPT, Claude, and Gemini contain valuable context that shouldn't be lost.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>What We Do</h2>
            <p style={{ marginBottom: '1rem' }}>
              ContextSwitch is a browser extension that helps you:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Save Conversations:</strong> Capture your AI chat history with one click</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Compress Context:</strong> Use AI to intelligently compress long conversations while preserving key information</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Restore Instantly:</strong> Load your saved context into any new conversation</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Organize Projects:</strong> Keep your different projects and contexts neatly separated</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Supported Platforms</h2>
            <p>
              ContextSwitch currently supports three major AI platforms:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>ChatGPT</strong> by OpenAI (chat.openai.com, chatgpt.com)</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Claude</strong> by Anthropic (claude.ai)</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Gemini</strong> by Google (gemini.google.com)</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Our Story</h2>
            <p>
              ContextSwitch was built by a developer who was tired of re-explaining project context every time 
              they started a new AI chat session. What started as a personal tool has grown into a product 
              designed to help anyone who uses AI assistants for work, research, or creative projects.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Privacy First</h2>
            <p>
              We take your privacy seriously. Your conversation data is stored locally on your device by default. 
              We don't have access to your saved conversations unless you explicitly choose to use our cloud 
              features. Read our <a href="/privacy" style={{ color: '#c8f542' }}>Privacy Policy</a> for more details.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Contact Us</h2>
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
