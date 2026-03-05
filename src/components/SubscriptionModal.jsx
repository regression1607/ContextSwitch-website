import { useState } from 'react';
import { createPortal } from 'react-dom';

const API_URL = 'https://context-switch-backend.vercel.app/api';

// Plan pricing configuration based on currency
const PLAN_CONFIG = {
  INR: {
    Pro: {
      monthly: { price: '₹499', priceId: 'pro_monthly_inr', amount: 499 },
      yearly: { price: '₹4,999', priceId: 'pro_yearly_inr', amount: 4999, savings: 'Save 17%' }
    },
    Enterprise: {
      monthly: { price: '₹999', priceId: 'enterprise_monthly_inr', amount: 999 },
      yearly: { price: '₹9,999', priceId: 'enterprise_yearly_inr', amount: 9999, savings: 'Save 17%' }
    }
  },
  USD: {
    Pro: {
      monthly: { price: '$9.99', priceId: 'pro_monthly_usd', amount: 9.99 },
      yearly: { price: '$99.99', priceId: 'pro_yearly_usd', amount: 99.99, savings: 'Save 17%' }
    },
    Enterprise: {
      monthly: { price: '$29.99', priceId: 'enterprise_monthly_usd', amount: 29.99 },
      yearly: { price: '$299.99', priceId: 'enterprise_yearly_usd', amount: 299.99, savings: 'Save 17%' }
    }
  }
};

const SubscriptionModal = ({ isOpen, onClose, plan, currency = 'INR', isIndia = true }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubscriptionRequest = async () => {
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const currencyConfig = PLAN_CONFIG[currency] || PLAN_CONFIG.INR;
      const planConfig = currencyConfig[plan];
      const priceConfig = planConfig[billingCycle];
      
      // Get user info if logged in
      const userData = JSON.parse(localStorage.getItem('contextswitch_user') || '{}');

      // Send subscription interest email to admin
      const response = await fetch(`${API_URL}/contact/subscription`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: userData.name || 'Guest User',
          email: userData.email || 'Not logged in',
          phone: '',
          plan: `${plan} - ${billingCycle} (${priceConfig.price})`,
          message: `User wants to subscribe to ${plan} plan.\n\nBilling: ${billingCycle}\nPrice: ${priceConfig.price}\nCurrency: ${currency}`
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ 
          type: 'success', 
          message: 'Request sent! We will contact you within 24 hours to complete your subscription.' 
        });
      } else {
        setStatus({ type: 'error', message: data.message || 'Failed to send request' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send request. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const currencyConfig = PLAN_CONFIG[currency] || PLAN_CONFIG.INR;
  const planConfig = currencyConfig[plan] || currencyConfig.Pro;
  const currentPrice = planConfig[billingCycle];

  return createPortal(
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div 
        style={{
          position: 'relative',
          background: '#1a1a1a',
          borderRadius: '1rem',
          padding: '2rem',
          width: '100%',
          maxWidth: '450px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          margin: '1rem',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'rgba(200, 245, 66, 0.1)',
            border: '1px solid rgba(200, 245, 66, 0.3)',
            borderRadius: '9999px',
            marginBottom: '1rem',
          }}>
            <span style={{ color: '#c8f542', fontWeight: 600 }}>{plan} Plan</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
            Upgrade to {plan}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
            Choose your billing cycle and proceed to checkout
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div style={{ 
          display: 'flex', 
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '0.5rem',
          padding: '0.25rem',
          marginBottom: '1.5rem'
        }}>
          <button
            onClick={() => setBillingCycle('monthly')}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '0.375rem',
              border: 'none',
              background: billingCycle === 'monthly' ? '#c8f542' : 'transparent',
              color: billingCycle === 'monthly' ? '#0a0a0a' : 'rgba(255,255,255,0.6)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '0.375rem',
              border: 'none',
              background: billingCycle === 'yearly' ? '#c8f542' : 'transparent',
              color: billingCycle === 'yearly' ? '#0a0a0a' : 'rgba(255,255,255,0.6)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Yearly {planConfig.yearly.savings && <span style={{ fontSize: '0.75rem' }}>({planConfig.yearly.savings})</span>}
          </button>
        </div>

        {/* Price Display */}
        <div style={{ 
          textAlign: 'center', 
          padding: '1.5rem',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '0.75rem',
          border: '1px solid rgba(255,255,255,0.05)',
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: 'white' }}>
            {currentPrice.price}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)' }}>
            per {billingCycle === 'monthly' ? 'month' : 'year'}
          </div>
        </div>

        {/* Features */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
          {plan === 'Pro' ? (
            <>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                <svg style={{ width: '1rem', height: '1rem', color: '#34d399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                500 compressions/month
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                <svg style={{ width: '1rem', height: '1rem', color: '#34d399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                100 saved contexts
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                <svg style={{ width: '1rem', height: '1rem', color: '#34d399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority support
              </li>
            </>
          ) : (
            <>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                <svg style={{ width: '1rem', height: '1rem', color: '#34d399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited compressions
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                <svg style={{ width: '1rem', height: '1rem', color: '#34d399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited saved contexts
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                <svg style={{ width: '1rem', height: '1rem', color: '#34d399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                24/7 Priority support + API access
              </li>
            </>
          )}
        </ul>

        {status.message && (
          <div style={{
            padding: '0.875rem',
            background: status.type === 'success' ? 'rgba(52,211,153,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${status.type === 'success' ? 'rgba(52,211,153,0.3)' : 'rgba(239,68,68,0.3)'}`,
            borderRadius: '0.5rem',
            color: status.type === 'success' ? '#34d399' : '#ef4444',
            marginBottom: '1rem',
            fontSize: '0.875rem',
          }}>
            {status.message}
          </div>
        )}

        <button
          onClick={handleSubscriptionRequest}
          disabled={loading || status.type === 'success'}
          style={{
            width: '100%',
            padding: '1rem',
            background: status.type === 'success' ? '#34d399' : '#c8f542',
            color: '#0a0a0a',
            fontWeight: 600,
            borderRadius: '0.5rem',
            border: 'none',
            cursor: (loading || status.type === 'success') ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          {loading ? 'Sending Request...' : status.type === 'success' ? (
            <>
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Request Sent!
            </>
          ) : (
            <>
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Request Subscription
            </>
          )}
        </button>

        <p style={{ textAlign: 'center', marginTop: '1rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
          We'll contact you within 24 hours to complete your subscription.
        </p>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
        >
          <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default SubscriptionModal;
