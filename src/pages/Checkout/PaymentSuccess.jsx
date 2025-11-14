import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { CheckCircle2, Download, Home, ArrowRight } from "lucide-react";

export default function PaymentSuccess() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const transactionId = 'TXN-' + Date.now();
  const transactionDate = new Date().toLocaleString();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className={`max-w-md w-full p-8 rounded-apple-xl text-center ${isDark ? 'bg-[#252526]' : 'bg-white'} border ${isDark ? 'border-[#3e3e42]' : 'border-gray-200'} animate-slide-up shadow-xl`}>
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
          Payment Successful!
        </h1>
        <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Your payment has been processed successfully
        </p>

        <div className="space-y-3 mb-6">
          <div className={`p-4 rounded-apple ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Transaction ID
            </p>
            <p className={`font-mono font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
              {transactionId}
            </p>
          </div>

          <div className={`p-4 rounded-apple ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Amount Paid
            </p>
            <p className={`text-2xl font-bold text-green-500`}>
              $107.99
            </p>
          </div>

          <div className={`p-4 rounded-apple ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Date & Time
            </p>
            <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
              {transactionDate}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-3 rounded-apple font-semibold bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Home size={18} />
            Go to Dashboard
          </button>
          <button
            onClick={() => window.print()}
            className={`w-full py-3 rounded-apple font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all ${
              isDark ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'
            }`}
          >
            <Download size={18} />
            Download Receipt
          </button>
          <button
            onClick={() => navigate('/checkout')}
            className={`w-full py-3 rounded-apple font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all ${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            Make Another Payment
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
