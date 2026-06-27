import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const API_URL = import.meta.env.VITE_API_URL || 'https://context-switch-backend.vercel.app/api';
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

// Plan pricing configuration based on currency
const PLAN_CONFIG = {
  INR: {
    Pro: {
      monthly: { price: '₹69', originalPrice: '₹99', amount: 69 },
      yearly: { price: '₹699', originalPrice: '₹1,299', amount: 699, savings: 'Save 46%' }
    },
    Enterprise: {
      monthly: { price: '₹369', originalPrice: '₹499', amount: 369 },
      yearly: { price: '₹3,699', originalPrice: '₹5,499', amount: 3699, savings: 'Save 33%' }
    }
  },
  USD: {
    Pro: {
      monthly: { price: '$3.99', originalPrice: '$6', amount: 3.99 },
      yearly: { price: '$39', originalPrice: '$79', amount: 39, savings: 'Save 51%' }
    },
    Enterprise: {
      monthly: { price: '$9.99', originalPrice: '$19.99', amount: 9.99 },
      yearly: { price: '$99', originalPrice: '$299', amount: 99, savings: 'Save 67%' }
    }
  }
};

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const SubscriptionModal = ({ isOpen, onClose, plan, currency = 'INR', isIndia = true, onSuccess, initialBillingCycle = 'monthly' }) => {
  const [billingCycle, setBillingCycle] = useState(initialBillingCycle);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Sync billing cycle when prop changes (user switches toggle on Pricing page)
  useEffect(() => {
    setBillingCycle(initialBillingCycle);
  }, [initialBillingCycle]);

  const handlePayment = async () => {
    const token = localStorage.getItem('contextswitch_token');
    if (!token) {
      setStatus({ type: 'error', message: 'Please login first to subscribe.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Load Razorpay SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setStatus({ type: 'error', message: 'Failed to load payment gateway. Please try again.' });
        setLoading(false);
        return;
      }

      // Create order on backend
      const planKey = plan.toLowerCase();
      const response = await fetch(`${API_URL}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          plan: planKey,
          billingCycle,
          currency: currency,
        }),
      });

      const orderData = await response.json();

      if (!orderData.success) {
        setStatus({ type: 'error', message: orderData.message || 'Failed to create order' });
        setLoading(false);
        return;
      }

      // Get user info
      const userData = JSON.parse(localStorage.getItem('contextswitch_user') || '{}');

      // Open Razorpay checkout
      const options = {
        key: orderData.data.keyId || RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: 'ContextSwitch',
        description: `${plan} Plan - ${billingCycle === 'yearly' ? 'Yearly' : 'Monthly'}`,
        order_id: orderData.data.orderId,
        handler: async function (response) {
          // Verify payment on backend
          try {
            const verifyRes = await fetch(`${API_URL}/payment/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan: planKey,
                billingCycle,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setStatus({ type: 'success', message: verifyData.message || `Successfully upgraded to ${plan}!` });
              // Update local storage with new subscription info
              const storedUser = JSON.parse(localStorage.getItem('contextswitch_user') || '{}');
              storedUser.subscription = verifyData.data.subscription;
              storedUser.limits = verifyData.data.limits;
              localStorage.setItem('contextswitch_user', JSON.stringify(storedUser));
              if (onSuccess) onSuccess(verifyData.data);
            } else {
              setStatus({ type: 'error', message: verifyData.message || 'Payment verification failed' });
            }
          } catch (err) {
            setStatus({ type: 'error', message: 'Payment verification failed. Contact support if amount was deducted.' });
          }
        },
        prefill: {
          name: userData.name || '',
          email: userData.email || '',
        },
        theme: {
          color: '#c8f542',
          backdrop_color: 'rgba(10, 10, 10, 0.95)',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function (response) {
        setStatus({
          type: 'error',
          message: response.error?.description || 'Payment failed. Please try again.',
        });
        setLoading(false);
      });

      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
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
            Choose your billing cycle and pay securely
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
          {currentPrice.originalPrice && (
            <div style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'line-through', marginBottom: '0.25rem' }}>
              {currentPrice.originalPrice}
            </div>
          )}
          <div style={{ fontSize: '3rem', fontWeight: 700, color: 'white' }}>
            {currentPrice.price}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)' }}>
            per {billingCycle === 'monthly' ? 'month' : 'year'}
            {currentPrice.savings && (
              <span style={{ marginLeft: '0.5rem', color: '#34d399', fontWeight: 600 }}>
                ({currentPrice.savings})
              </span>
            )}
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
          onClick={handlePayment}
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
          {loading ? 'Processing...' : status.type === 'success' ? (
            <>
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Payment Successful!
            </>
          ) : (
            <>
              <svg style={{ width: '1.25rem', height: '1.25rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Pay Securely with Razorpay
            </>
          )}
        </button>

        <p style={{ textAlign: 'center', marginTop: '1rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
          Secure payment via Razorpay. UPI, Cards, NetBanking, Wallets accepted.
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
