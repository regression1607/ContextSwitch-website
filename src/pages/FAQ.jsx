const FAQ = () => {
  const faqs = [
    {
      question: "What is ContextSwitch?",
      answer: "ContextSwitch is a free Chrome extension that allows you to save, compress, and restore AI conversation contexts across ChatGPT, Claude, and Gemini. It helps you maintain continuity across different chat sessions without losing important context."
    },
    {
      question: "How do I install ContextSwitch?",
      answer: "Visit the Chrome Web Store, search for 'ContextSwitch', and click 'Add to Chrome'. Once installed, you'll see the ContextSwitch icon in your browser toolbar. Click it to start saving your AI conversations."
    },
    {
      question: "Is ContextSwitch free to use?",
      answer: "Yes! ContextSwitch offers a free tier that includes unlimited conversation saves with local storage. We also offer Pro plans with additional features like AI-powered compression and cloud sync."
    },
    {
      question: "Which AI platforms does ContextSwitch support?",
      answer: "ContextSwitch currently supports three major AI platforms: ChatGPT (chat.openai.com and chatgpt.com), Claude (claude.ai), and Google Gemini (gemini.google.com)."
    },
    {
      question: "Where is my data stored?",
      answer: "By default, your conversation data is stored locally on your device using browser storage. We don't have access to your saved conversations unless you explicitly use our cloud sync features."
    },
    {
      question: "What is AI compression?",
      answer: "AI compression is a Pro feature that uses artificial intelligence to intelligently compress your conversation history while preserving all essential context, decisions, and key information. This can reduce token usage by up to 70%."
    },
    {
      question: "Can I use ContextSwitch on multiple devices?",
      answer: "With our Pro plan, you can sync your saved contexts across multiple devices using cloud storage. The free tier stores data locally on each device."
    },
    {
      question: "How do I restore a saved conversation?",
      answer: "Open the ContextSwitch extension, find the project you want to restore, and click 'Load'. You can choose to load the full context or a compressed version. The context will be pasted into your current AI chat."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take security seriously. Local storage is protected by your browser's security. For cloud features, we use industry-standard encryption and security practices."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your profile page or by contacting our support. See our Refund Policy for more details about cancellations and refunds."
    },
    {
      question: "What browsers are supported?",
      answer: "ContextSwitch is currently available as a Chrome extension and works on Google Chrome and other Chromium-based browsers like Microsoft Edge and Brave."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team via email at ekanshrajput1607@gmail.com or through our Contact page. We typically respond within 24-48 hours."
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '6rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
          Frequently Asked <span style={{ color: '#c8f542' }}>Questions</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '3rem' }}>
          Find answers to common questions about ContextSwitch
        </p>

        <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
          {faqs.map((faq, index) => (
            <section key={index} style={{ 
              marginBottom: '1.5rem', 
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '0.75rem'
            }}>
              <h2 style={{ color: 'white', fontSize: '1.125rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                {faq.question}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                {faq.answer}
              </p>
            </section>
          ))}
        </div>

        <div style={{ 
          marginTop: '3rem', 
          padding: '2rem', 
          background: 'rgba(200, 245, 66, 0.1)', 
          border: '1px solid rgba(200, 245, 66, 0.2)',
          borderRadius: '1rem',
          textAlign: 'center'
        }}>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>Still have questions?</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>
            Can't find what you're looking for? We're here to help.
          </p>
          <a 
            href="/contact" 
            style={{ 
              display: 'inline-block',
              padding: '0.75rem 2rem',
              background: '#c8f542',
              color: '#0a0a0a',
              fontWeight: 600,
              borderRadius: '0.5rem',
              textDecoration: 'none'
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
