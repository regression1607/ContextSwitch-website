import { useState, useEffect } from 'react';
import SubscriptionModal from './SubscriptionModal';

// Pricing configuration for different regions
const PRICING = {
  INR: {
    symbol: '₹',
    currency: 'INR',
    free: 0,
    pro: 49,
    enterprise: 499,
  },
  USD: {
    symbol: '$',
    currency: 'USD',
    free: 0,
    pro: 9.99,
    enterprise: 29.99,
  }
};

const getPlans = (pricing) => [
  {
    name: 'Free',
    price: `${pricing.symbol}${pricing.free}`,
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Unlimited context saves',
      'Unlimited project organization',
      'Load context anywhere',
      'All AI platforms supported',
      'Local storage',
    ],
    cta: 'Get Started Free',
    popular: false,
    color: '#ffffff',
    type: 'free',
  },
  {
    name: 'Pro',
    price: `${pricing.symbol}${pricing.pro}`,
    period: 'month',
    description: 'Best for regular AI users',
    features: [
      'Everything in Free',
      '50 compressions/month',
      'Cloud sync (coming soon)',
      'Priority support',
      'Early access to features',
      'Export/Import projects',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
    color: '#c8f542',
    type: 'paid',
  },
  {
    name: 'Enterprise',
    price: `${pricing.symbol}${pricing.enterprise}`,
    period: 'month',
    description: 'For power users & teams',
    features: [
      'Everything in Pro',
      '200 compressions',
      'Team sharing (coming soon)',
      'API access',
      'Dedicated support',
      'Custom integrations',
    ],
    cta: 'Get Enterprise',
    popular: false,
    color: '#a78bfa',
    type: 'paid',
  },
  {
    name: 'Custom',
    price: 'Custom',
    period: 'quote',
    description: 'Tailored for your organization',
    features: [
      'Everything in Enterprise',
      'Custom user limits',
      'On-premise deployment',
      'SLA & compliance',
      'Dedicated account manager',
      'Custom training & onboarding',
    ],
    cta: 'Contact Sales',
    popular: false,
    color: '#60a5fa',
    type: 'custom',
  },
];

const Pricing = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isIndia, setIsIndia] = useState(true); // Default to India
  const [loading, setLoading] = useState(true);

  // Detect user's country on component mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Using free IP geolocation API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setIsIndia(data.country_code === 'IN');
      } catch (error) {
        // Default to India on error
        console.log('Could not detect location, defaulting to INR');
        setIsIndia(true);
      } finally {
        setLoading(false);
      }
    };
    detectCountry();
  }, []);

  const pricing = isIndia ? PRICING.INR : PRICING.USD;
  const plans = getPlans(pricing);

  const handlePlanClick = (plan) => {
    if (plan.type === 'free') {
      window.open('https://chrome.google.com/webstore', '_blank');
    } else if (plan.type === 'custom') {
      window.location.href = '/contact?subject=Custom%20Enterprise%20Plan';
    } else {
      setSelectedPlan(plan.name);
      setModalOpen(true);
    }
  };

  return (
    <section id="pricing" style={{ padding: '6rem 0', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label">Pricing</span>
          <h2 className="heading-lg" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            Simple, transparent
            <br />
            <span className="gradient-text">pricing</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '42rem', margin: '0 auto' }}>
            Start free and upgrade when you need more compression power.
            No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className="pricing-card"
              style={{
                padding: '2rem',
                borderRadius: '1.5rem',
                background: plan.popular ? 'linear-gradient(135deg, rgba(200, 245, 66, 0.1) 0%, rgba(200, 245, 66, 0.02) 100%)' : 'rgba(255,255,255,0.02)',
                border: plan.popular ? '2px solid rgba(200, 245, 66, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-0.75rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#c8f542',
                  color: '#0a0a0a',
                  padding: '0.25rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}>
                  Most Popular
                </div>
              )}
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: plan.color, marginBottom: '0.5rem' }}>
                  {plan.name}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
                  {plan.description}
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <span className="price-display" style={{ fontSize: '3rem', fontWeight: 700, color: 'white' }}>{plan.price}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', marginLeft: '0.5rem' }}>/{plan.period}</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    marginBottom: '0.75rem',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9rem',
                  }}>
                    <svg style={{ width: '1.25rem', height: '1.25rem', color: '#34d399', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanClick(plan)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.2)',
                  background: plan.popular ? '#c8f542' : 'transparent',
                  color: plan.popular ? '#0a0a0a' : 'white',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Currency Toggle & FAQ hint */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => setIsIndia(!isIndia)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '9999px',
                padding: '0.5rem 1rem',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>🌍</span>
              Showing prices in {isIndia ? '₹ INR (India)' : '$ USD (International)'}
              <span style={{ fontSize: '0.65rem' }}>• Click to change</span>
            </button>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
            Cancel anytime. Try the free tier first before upgrading.
          </p>
        </div>
      </div>

      <SubscriptionModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        plan={selectedPlan}
        currency={pricing.currency}
        isIndia={isIndia}
      />
    </section>
  );
};

export default Pricing;
