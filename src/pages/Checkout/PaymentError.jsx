import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { XCircle, RotateCcw, MessageCircle, Home } from "lucide-react";

export default function PaymentError() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const errorDetails = {
    code: 'ERR_PAYMENT_FAILED',
    message: 'Insufficient funds',
    timestamp: new Date().toLocaleString()
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className={`max-w-md w-full p-8 rounded-apple-xl text-center ${isDark ? 'bg-[#252526]' : 'bg-white'} border ${isDark ? 'border-[#3e3e42]' : 'border-gray-200'} animate-slide-up shadow-xl`}>
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <XCircle size={48} className="text-red-500" />
        </div>
        
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
          Payment Failed
        </h1>
        <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          We couldn't process your payment. Please try again.
        </p>

        <div className={`p-4 rounded-apple mb-6 ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
          <div className="space-y-2 text-left">
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Error Code
              </p>
              <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                {errorDetails.code}
              </p>
            </div>
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Reason
              </p>
              <p className={`text-sm font-semibold text-red-500`}>
                {errorDetails.message}
              </p>
            </div>
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Time
              </p>
              <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                {errorDetails.timestamp}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3 rounded-apple font-semibold bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <RotateCcw size={18} />
            Try Again
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className={`w-full py-3 rounded-apple font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all ${
              isDark ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'
            }`}
          >
            <Home size={18} />
            Go to Dashboard
          </button>
          <button
            onClick={() => alert('Support contact: support@smartpay.com')}
            className={`w-full py-3 rounded-apple font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all ${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            <MessageCircle size={18} />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
