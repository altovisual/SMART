import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { CreditCard, Wallet, Building2, ChevronRight, CheckCircle2, Lock, ShieldCheck } from "lucide-react";

export default function AppleCheckout() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('crypto');

  const paymentMethods = [
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Pay with Bitcoin, Ethereum, or other crypto',
      icon: Wallet,
      color: 'orange',
      bgColor: isDark ? 'bg-orange-500/10' : 'bg-orange-50',
      borderColor: 'border-orange-500',
      textColor: 'text-orange-500',
      fee: '1.5%',
      time: '~2 minutes',
      verified: true
    },
    {
      id: 'card',
      name: 'Credit or Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
      color: 'blue',
      bgColor: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-500',
      fee: '2.9% + $0.30',
      time: 'Instant',
      verified: false
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank account transfer',
      icon: Building2,
      color: 'green',
      bgColor: isDark ? 'bg-green-500/10' : 'bg-green-50',
      borderColor: 'border-green-500',
      textColor: 'text-green-500',
      fee: '0.8%',
      time: '1-3 business days',
      verified: false
    }
  ];

  const orderSummary = {
    subtotal: 99.99,
    tax: 8.00,
    total: 107.99
  };

  const handlePayment = () => {
    console.log('🚀 Navigating to:', `/checkout/${selectedMethod}`);
    console.log('📍 Selected method:', selectedMethod);
    
    if (!selectedMethod) {
      console.error('❌ No payment method selected!');
      return;
    }
    
    // Navigate to specific payment page based on selected method
    navigate(`/checkout/${selectedMethod}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
          Checkout
        </h1>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Choose your payment method
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-4 animate-slide-up">
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Payment Method
          </h2>
          
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`
                  w-full p-6 rounded-2xl text-left
                  ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'}
                  border-2 transition-all duration-200
                  ${isSelected
                    ? isDark
                      ? 'border-blue-500 bg-blue-500/5'
                      : 'border-blue-500 bg-blue-50'
                    : isDark
                      ? 'border-white/10 hover:border-white/20'
                      : 'border-black/5 hover:border-black/10'
                  }
                  active:scale-[0.98]
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`
                      p-3 rounded-xl
                      ${isDark ? 'bg-white/10' : 'bg-gray-100'}
                    `}>
                      <Icon 
                        size={24} 
                        className={`text-${method.color}-500`}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                          {method.name}
                        </h3>
                        {method.verified && (
                          <CheckCircle2 size={16} className="text-blue-500" />
                        )}
                      </div>
                      <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {method.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`
                          px-2 py-1 rounded-lg
                          ${isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'}
                        `}>
                          Fee: {method.fee}
                        </span>
                        <span className={`
                          px-2 py-1 rounded-lg
                          ${isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'}
                        `}>
                          {method.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <ChevronRight 
                    size={20} 
                    className={isDark ? 'text-gray-400' : 'text-gray-600'}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="animate-slide-up">
          <div className={`
            ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'}
            rounded-2xl p-6
            border ${isDark ? 'border-white/10' : 'border-black/5'}
            sticky top-24
          `}>
            <h2 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Subtotal
                </span>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                  ${orderSummary.subtotal.toFixed(2)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tax
                </span>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                  ${orderSummary.tax.toFixed(2)}
                </span>
              </div>

              <div className={`
                pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}
                flex items-center justify-between
              `}>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                  Total
                </span>
                <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  ${orderSummary.total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={!selectedMethod}
              className={`
                w-full py-3 rounded-apple font-semibold
                flex items-center justify-center gap-2
                transition-all duration-150
                ${selectedMethod
                  ? isDark
                    ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                    : 'bg-blue-500 hover:bg-blue-600 text-white active:scale-95'
                  : isDark
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <Lock size={18} />
              Pay ${orderSummary.total.toFixed(2)}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2">
              <ShieldCheck size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Secured by SmartPay
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
