import { useState, useEffect } from 'react';
import SubscriptionModal from './SubscriptionModal';

// Pricing configuration for different regions
const PRICING = {
  INR: {
    symbol: '₹',
    currency: 'INR',
    pro: { monthly: 69, monthlyOriginal: 99, yearly: 699, yearlyOriginal: 1299 },
    enterprise: { monthly: 369, monthlyOriginal: 499, yearly: 3699, yearlyOriginal: 5499 },
  },
  USD: {
    symbol: '$',
    currency: 'USD',
    pro: { monthly: 3.99, monthlyOriginal: 6, yearly: 39, yearlyOriginal: 79 },
    enterprise: { monthly: 9.99, monthlyOriginal: 19.99, yearly: 99, yearlyOriginal: 299 },
  }
};

const getPlans = (pricing, billingCycle) => {
  const cycle = billingCycle; // 'monthly' or 'yearly'
  const period = cycle === 'yearly' ? 'year' : 'month';

  return [
    {
      name: 'Free',
      price: `${pricing.symbol}0`,
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
      price: `${pricing.symbol}${pricing.pro[cycle]}`,
      originalPrice: `${pricing.symbol}${pricing.pro[`${cycle}Original`]}`,
      period,
      description: 'Best for regular AI users',
      features: [
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
      savings: cycle === 'yearly' ? Math.round((1 - pricing.pro.yearly / (pricing.pro.monthly * 12)) * 100) : null,
    },
    {
      name: 'Enterprise',
      price: `${pricing.symbol}${pricing.enterprise[cycle]}`,
      originalPrice: `${pricing.symbol}${pricing.enterprise[`${cycle}Original`]}`,
      period,
      description: 'For power users & teams',
      features: [
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
      savings: cycle === 'yearly' ? Math.round((1 - pricing.enterprise.yearly / (pricing.enterprise.monthly * 12)) * 100) : null,
    },
    {
      name: 'Custom',
      price: 'Custom',
      period: 'quote',
      description: 'Tailored for your organization',
      features: [
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
};

const API_URL = import.meta.env.VITE_API_URL || 'https://context-switch-backend.vercel.app/api';

const Pricing = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isIndia, setIsIndia] = useState(true);
  const [loading, setLoading] = useState(true);
  const [customLoading, setCustomLoading] = useState(false);
  const [customStatus, setCustomStatus] = useState('');

  // Auto-detect currency silently
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setIsIndia(data.country_code === 'IN');
      } catch {
        setIsIndia(true);
      } finally {
        setLoading(false);
      }
    };
    detectCountry();
  }, []);

  const pricing = isIndia ? PRICING.INR : PRICING.USD;
  const plans = getPlans(pricing, billingCycle);

  const handlePlanClick = async (plan) => {
    if (plan.type === 'free') {
      window.open('https://chromewebstore.google.com/detail/contextswitch/dihbofoieacondcebbkehcjhiafhhomd', '_blank');
    } else if (plan.type === 'custom') {
      setCustomLoading(true);
      setCustomStatus('');
      try {
        const userData = JSON.parse(localStorage.getItem('contextswitch_user') || '{}');
        const response = await fetch(`${API_URL}/contact/subscription`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: userData.name || 'Guest User',
            email: userData.email || 'Not logged in',
            phone: '',
            plan: 'Custom Enterprise',
            message: `User is interested in Custom Enterprise plan.\nCurrency: ${pricing.currency}`,
          }),
        });
        const data = await response.json();
        setCustomStatus(data.success ? 'success' : 'error');
      } catch {
        setCustomStatus('error');
      } finally {
        setCustomLoading(false);
        setTimeout(() => setCustomStatus(''), 5000);
      }
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

          {/* Monthly / Yearly Toggle */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0', 
            marginTop: '2rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '9999px',
            padding: '0.25rem',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '9999px',
                border: 'none',
                background: billingCycle === 'monthly' ? '#c8f542' : 'transparent',
                color: billingCycle === 'monthly' ? '#0a0a0a' : 'rgba(255,255,255,0.6)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '9999px',
                border: 'none',
                background: billingCycle === 'yearly' ? '#c8f542' : 'transparent',
                color: billingCycle === 'yearly' ? '#0a0a0a' : 'rgba(255,255,255,0.6)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              Yearly
              <span style={{
                fontSize: '0.7rem',
                padding: '0.15rem 0.5rem',
                borderRadius: '9999px',
                background: billingCycle === 'yearly' ? 'rgba(0,0,0,0.15)' : 'rgba(52,211,153,0.15)',
                color: billingCycle === 'yearly' ? '#0a0a0a' : '#34d399',
                fontWeight: 700,
              }}>
                Save 15%+
              </span>
            </button>
          </div>
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
                {plan.originalPrice && (
                  <span style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'line-through', marginRight: '0.5rem' }}>{plan.originalPrice}</span>
                )}
                <span className="price-display" style={{ fontSize: '3rem', fontWeight: 700, color: 'white' }}>{plan.price}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', marginLeft: '0.5rem' }}>/{plan.period}</span>
                {plan.savings && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                      background: 'rgba(52,211,153,0.15)',
                      color: '#34d399',
                      fontWeight: 600,
                    }}>
                      Save {plan.savings}%
                    </span>
                  </div>
                )}
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
                disabled={plan.type === 'custom' && (customLoading || customStatus === 'success')}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.2)',
                  background: plan.type === 'custom' && customStatus === 'success' ? '#34d399' 
                    : plan.type === 'custom' && customStatus === 'error' ? '#ef4444'
                    : plan.popular ? '#c8f542' : 'transparent',
                  color: plan.type === 'custom' && customStatus ? 'white' : plan.popular ? '#0a0a0a' : 'white',
                  fontWeight: 600,
                  cursor: plan.type === 'custom' && (customLoading || customStatus === 'success') ? 'not-allowed' : 'pointer',
                  opacity: plan.type === 'custom' && customLoading ? 0.7 : 1,
                  transition: 'all 0.3s ease',
                }}
              >
                {plan.type === 'custom' 
                  ? customLoading ? 'Sending...' 
                    : customStatus === 'success' ? '✓ Request Sent!' 
                    : customStatus === 'error' ? 'Failed, try again' 
                    : plan.cta
                  : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
            Prices in {isIndia ? '₹ INR' : '$ USD'}. Cancel anytime. Try the free tier first before upgrading.
          </p>
        </div>
      </div>

      <SubscriptionModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        plan={selectedPlan}
        currency={pricing.currency}
        isIndia={isIndia}
        initialBillingCycle={billingCycle}
      />
    </section>
  );
};

export default Pricing;
