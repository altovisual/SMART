import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";

export default function CardPayment() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/checkout/success');
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <button
        onClick={() => navigate('/checkout')}
        className={`flex items-center gap-2 mb-6 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}
      >
        <ArrowLeft size={20} />
        Back to Checkout
      </button>

      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
          Card Payment
        </h1>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Enter your card details to complete payment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className={`p-6 rounded-apple-lg ${isDark ? 'bg-[#252526]' : 'bg-white'} border ${isDark ? 'border-[#3e3e42]' : 'border-gray-200'}`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Card Number
              </label>
              <input
                type="text"
                maxLength="19"
                placeholder="1234 5678 9012 3456"
                value={formatCardNumber(cardData.number)}
                onChange={(e) => setCardData({...cardData, number: e.target.value.replace(/\s/g, '')})}
                className={`w-full px-4 py-3 rounded-apple outline-none transition-colors ${
                  isDark 
                    ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500/50' 
                    : 'bg-gray-50 border border-gray-200 text-black placeholder-gray-500 focus:border-blue-500/50'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="JOHN DOE"
                value={cardData.name}
                onChange={(e) => setCardData({...cardData, name: e.target.value.toUpperCase()})}
                className={`w-full px-4 py-3 rounded-apple outline-none transition-colors ${
                  isDark 
                    ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500/50' 
                    : 'bg-gray-50 border border-gray-200 text-black placeholder-gray-500 focus:border-blue-500/50'
                }`}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Expiry Date
                </label>
                <input
                  type="text"
                  maxLength="5"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length >= 2) {
                      value = value.slice(0, 2) + '/' + value.slice(2, 4);
                    }
                    setCardData({...cardData, expiry: value});
                  }}
                  className={`w-full px-4 py-3 rounded-apple outline-none transition-colors ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500/50' 
                      : 'bg-gray-50 border border-gray-200 text-black placeholder-gray-500 focus:border-blue-500/50'
                  }`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  CVV
                </label>
                <input
                  type="text"
                  maxLength="3"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '')})}
                  className={`w-full px-4 py-3 rounded-apple outline-none transition-colors ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500/50' 
                      : 'bg-gray-50 border border-gray-200 text-black placeholder-gray-500 focus:border-blue-500/50'
                  }`}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-apple font-semibold bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Lock size={18} />
              Pay $107.99
            </button>
          </form>
        </div>

        {/* Card Preview */}
        <div className={`p-6 rounded-apple-lg ${isDark ? 'bg-[#252526]' : 'bg-white'} border ${isDark ? 'border-[#3e3e42]' : 'border-gray-200'}`}>
          <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Card Preview
          </h3>
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-apple-lg p-6 text-white aspect-video flex flex-col justify-between shadow-xl">
            <div className="flex justify-between items-start">
              <CreditCard size={32} />
              <span className="text-sm font-bold">VISA</span>
            </div>
            <div>
              <p className="text-lg font-mono mb-4 tracking-wider">
                {formatCardNumber(cardData.number) || '•••• •••• •••• ••••'}
              </p>
              <div className="flex justify-between">
                <div>
                  <p className="text-xs opacity-70 mb-1">Cardholder</p>
                  <p className="text-sm font-semibold">{cardData.name || 'YOUR NAME'}</p>
                </div>
                <div>
                  <p className="text-xs opacity-70 mb-1">Expires</p>
                  <p className="text-sm font-semibold">{cardData.expiry || 'MM/YY'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
