const Privacy = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '6rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
          Privacy <span style={{ color: '#c8f542' }}>Policy</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '3rem' }}>
          Last updated: March 12, 2026
        </p>

        <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Introduction</h2>
            <p>
              Welcome to ContextSwitch ("we," "our," or "us"). We are committed to protecting your personal information 
              and your right to privacy. This Privacy Policy explains how we collect, use, disclose, store, and safeguard your 
              information when you use our browser extension and website (collectively, the "Service").
            </p>
            <p style={{ marginTop: '1rem' }}>
              By using ContextSwitch, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>2. Information We Collect</h2>
            <p style={{ marginBottom: '1rem' }}>We collect the following types of information:</p>
            
            <h3 style={{ color: '#c8f542', fontSize: '1.1rem', marginBottom: '0.5rem', marginTop: '1rem' }}>2.1 Information You Provide</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Account Information:</strong> When you create an account, we collect your name, email address, and encrypted password.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Contact Information:</strong> When you contact us for support, we collect your email and message content.</li>
            </ul>

            <h3 style={{ color: '#c8f542', fontSize: '1.1rem', marginBottom: '0.5rem', marginTop: '1rem' }}>2.2 Information Collected Automatically</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Usage Statistics:</strong> Number of compressions used, tokens saved (aggregate counts only).</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Authentication Tokens:</strong> Session tokens for keeping you logged in.</li>
            </ul>

            <h3 style={{ color: '#c8f542', fontSize: '1.1rem', marginBottom: '0.5rem', marginTop: '1rem' }}>2.3 Information Stored Locally (NOT sent to our servers)</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Saved Conversations:</strong> Your AI conversation contexts are stored locally in your browser using Chrome's local storage API. We do NOT have access to this data.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Project Names:</strong> Names you give to saved projects are stored locally only.</li>
            </ul>

            <h3 style={{ color: '#c8f542', fontSize: '1.1rem', marginBottom: '0.5rem', marginTop: '1rem' }}>2.4 Information Processed Temporarily</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Compression Data:</strong> When you use the AI compression feature, your conversation text is temporarily sent to our server, processed through OpenAI's API for compression, and the compressed result is returned to you. The original and compressed text is NOT stored on our servers after processing.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>3. How We Use Your Information</h2>
            <p style={{ marginBottom: '1rem' }}>We use your information for the following purposes:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>To provide the Service:</strong> Create and manage your account, authenticate your sessions.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>To process compressions:</strong> Send conversation data to AI for compression (Pro feature).</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>To track usage:</strong> Monitor compression counts for subscription limits.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>To communicate:</strong> Respond to support requests, send service updates.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>To improve:</strong> Analyze aggregate usage patterns to improve our Service.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>4. Data Storage and Retention</h2>
            
            <h3 style={{ color: '#c8f542', fontSize: '1.1rem', marginBottom: '0.5rem', marginTop: '1rem' }}>4.1 Where We Store Data</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Account Data:</strong> Stored securely in MongoDB Atlas database (cloud-hosted in the United States).</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Conversation Data:</strong> Stored locally on YOUR device in browser storage. We have no access to this.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Compression Data:</strong> Processed in-memory only, NOT stored on our servers.</li>
            </ul>

            <h3 style={{ color: '#c8f542', fontSize: '1.1rem', marginBottom: '0.5rem', marginTop: '1rem' }}>4.2 How Long We Keep Data</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Account Data:</strong> Retained until you delete your account.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Usage Statistics:</strong> Retained for the duration of your account.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Compression Data:</strong> NOT retained - processed and immediately discarded.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Local Data:</strong> Retained on your device until you clear browser data or uninstall the extension.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>5. Data Sharing and Third Parties</h2>
            <p style={{ marginBottom: '1rem' }}>We share data with the following third parties:</p>
            
            <h3 style={{ color: '#c8f542', fontSize: '1.1rem', marginBottom: '0.5rem', marginTop: '1rem' }}>5.1 Service Providers</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>OpenAI:</strong> When you use compression, your conversation text is sent to OpenAI's API for processing. OpenAI's privacy policy applies: <a href="https://openai.com/privacy" style={{ color: '#c8f542' }}>https://openai.com/privacy</a></li>
              <li style={{ marginBottom: '0.5rem' }}><strong>MongoDB Atlas:</strong> Hosts our account database. MongoDB's privacy policy: <a href="https://www.mongodb.com/legal/privacy-policy" style={{ color: '#c8f542' }}>https://www.mongodb.com/legal/privacy-policy</a></li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Vercel:</strong> Hosts our website and API. Vercel's privacy policy: <a href="https://vercel.com/legal/privacy-policy" style={{ color: '#c8f542' }}>https://vercel.com/legal/privacy-policy</a></li>
            </ul>

            <h3 style={{ color: '#c8f542', fontSize: '1.1rem', marginBottom: '0.5rem', marginTop: '1rem' }}>5.2 We Do NOT Share Data With</h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Advertisers or ad networks</li>
              <li style={{ marginBottom: '0.5rem' }}>Data brokers</li>
              <li style={{ marginBottom: '0.5rem' }}>Any other third parties for marketing purposes</li>
            </ul>

            <h3 style={{ color: '#c8f542', fontSize: '1.1rem', marginBottom: '0.5rem', marginTop: '1rem' }}>5.3 Legal Requirements</h3>
            <p>We may disclose your information if required by law, court order, or government request.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>6. Data Security</h2>
            <p style={{ marginBottom: '1rem' }}>We implement the following security measures:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Passwords are hashed using bcrypt encryption</li>
              <li style={{ marginBottom: '0.5rem' }}>All data transmission uses HTTPS/TLS encryption</li>
              <li style={{ marginBottom: '0.5rem' }}>JWT tokens for secure authentication</li>
              <li style={{ marginBottom: '0.5rem' }}>Database access restricted to authorized personnel only</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>7. Your Rights and Choices</h2>
            <p style={{ marginBottom: '1rem' }}>You have the following rights regarding your data:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Access:</strong> Request a copy of your personal data by contacting us.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Correction:</strong> Update your account information through the website.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Deletion:</strong> Request deletion of your account and all associated data by contacting us.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Local Data:</strong> Clear your locally stored conversations anytime by clearing browser data or uninstalling the extension.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Opt-out:</strong> Unsubscribe from marketing emails using the link in the email.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>8. Cookies and Tracking</h2>
            <p style={{ marginBottom: '1rem' }}>We use the following technologies:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Authentication Cookies:</strong> To keep you logged in to your account.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Local Storage:</strong> To store your saved conversations locally on your device.</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>We do NOT use tracking cookies or analytics that track individual users.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>9. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If you are a parent and believe your child has provided us with 
              personal information, please contact us and we will delete it.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>10. International Users</h2>
            <p>
              Our Service is operated from India. If you are accessing the Service from outside India, please be aware 
              that your information may be transferred to, stored, and processed in the United States (where our database 
              is hosted). By using the Service, you consent to this transfer.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the 
              new Privacy Policy on this page and updating the "Last updated" date. Your continued use of the Service after 
              changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us at:
            </p>
            <p style={{ marginTop: '1rem' }}>
              <strong>Email:</strong> <a href="mailto:ekanshrajput1607@gmail.com" style={{ color: '#c8f542' }}>ekanshrajput1607@gmail.com</a>
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              <strong>Website:</strong> <a href="https://www.context-switch.dev" style={{ color: '#c8f542' }}>https://www.context-switch.dev</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
