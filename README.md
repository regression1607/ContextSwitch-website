# ContextSwitch

> **Save, Compress & Restore AI Conversations** - Never lose context again!

[![Website](https://img.shields.io/badge/Website-context--switch.dev-c8f542?style=for-the-badge)](https://www.context-switch.dev)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chrome.google.com/webstore)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

## What is ContextSwitch?

ContextSwitch is a powerful Chrome extension and web platform that helps you **save, compress, and restore conversations** across multiple AI platforms like ChatGPT, Claude, and Google Gemini. Stop losing valuable context when switching between AI tools or starting new conversations!

### Key Features

- **Save Context** - Capture any AI conversation with one click
- **Smart Compression** - Reduce context size by up to 70% while preserving meaning
- **Cross-Platform** - Works with ChatGPT, Claude, Gemini, and more
- **Project Organization** - Organize saved contexts into projects
- **Load Anywhere** - Restore context to any supported AI platform
- **Cloud Sync** - Access your contexts from any device (Pro)

## Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React 18, Vite, CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Auth** | JWT |
| **Payments** | Stripe |
| **Hosting** | Vercel |
| **Extension** | Chrome Manifest V3 |

## Project Structure

```
ContextSwitch/
├── ContextSwitch-website/     # React frontend (this repo)
├── ContextSwitch-backend/     # Express.js API server
└── ContextSwitch/             # Chrome extension
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/regression1607/ContextSwitch-website.git
   cd ContextSwitch-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open** http://localhost:5173

### Environment Variables

```env
VITE_API_URL=http://localhost:5001/api
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
```

## Pricing

| Plan | India (INR) | International (USD) | Features |
|------|-------------|---------------------|----------|
| **Free** | ₹0 | $0 | Unlimited saves, local storage |
| **Pro** | ₹49/mo | $9.99/mo | 50 compressions, cloud sync |
| **Enterprise** | ₹499/mo | $29.99/mo | Unlimited, API access |
| **Custom** | Contact | Contact | On-premise, SLA |

## Supported AI Platforms

- ChatGPT (GPT-4, GPT-4 Turbo)
- Google Gemini (Gemini Pro, Gemini 2.0)
- Anthropic Claude (Claude 3.5 Sonnet, Opus)
- More coming soon...

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Links

- **Website**: [https://www.context-switch.dev](https://www.context-switch.dev)
- **Chrome Extension**: [Chrome Web Store](https://chrome.google.com/webstore)
- **API Documentation**: Coming soon
- **Privacy Policy**: [https://www.context-switch.dev/privacy](https://www.context-switch.dev/privacy)

## Contact

- **Email**: support@context-switch.dev
- **Twitter**: [@contextswitch](https://twitter.com/contextswitch)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by the ContextSwitch Team
