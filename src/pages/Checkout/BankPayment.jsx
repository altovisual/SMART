import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { ArrowLeft, Building2, Copy, CheckCircle2 } from "lucide-react";

export default function BankPayment() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [copied, setCopied] = useState('');

  const bankDetails = {
    'Bank Name': 'SmartPay Bank',
    'Account Number': '1234567890',
    'Routing Number': '987654321',
    'Account Name': 'SmartPay Inc.',
    'Reference': 'SP-' + Date.now()
  };

  const handleCopy = (field, value) => {
    navigator.clipboard.writeText(value);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
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
          Bank Transfer
        </h1>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Transfer the exact amount to the bank account below
        </p>
      </div>

      <div className={`p-6 rounded-apple-lg mb-6 ${isDark ? 'bg-[#252526]' : 'bg-white'} border ${isDark ? 'border-[#3e3e42]' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-apple bg-green-500/10">
            <Building2 size={24} className="text-green-500" />
          </div>
          <div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
              Bank Details
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Use these details for your transfer
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(bankDetails).map(([key, value]) => (
            <div key={key} className={`p-4 rounded-apple ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {key}
                  </p>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    {value}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(key, value)}
                  className={`p-2 rounded-apple transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}
                >
                  {copied === key ? (
                    <CheckCircle2 size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-6 p-4 rounded-apple ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
          <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
            Amount to Transfer
          </p>
          <p className="text-2xl font-bold text-green-500">
            $107.99
          </p>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Please include the reference number in your transfer
          </p>
        </div>

        <button
          onClick={() => navigate('/checkout/success')}
          className="w-full mt-6 py-3 rounded-apple font-semibold bg-green-500 hover:bg-green-600 text-white active:scale-95 transition-all"
        >
          I've Completed the Transfer
        </button>
      </div>
    </div>
  );
}
