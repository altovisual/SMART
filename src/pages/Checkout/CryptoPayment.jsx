import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { ArrowLeft, Copy, CheckCircle2, Wallet } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function CryptoPayment() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [copied, setCopied] = useState(false);

  const cryptos = [
    { id: 'BTC', name: 'Bitcoin' },
    { id: 'ETH', name: 'Ethereum' },
    { id: 'USDT', name: 'Tether' }
  ];

  const walletAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    navigate('/checkout/success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate('/checkout')}
        className={`flex items-center gap-2 mb-6 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}
      >
        <ArrowLeft size={20} />
        Back to Checkout
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
          Cryptocurrency Payment
        </h1>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Send the exact amount to complete your payment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Crypto Selector */}
          <div className={`p-6 rounded-apple-lg mb-6 ${isDark ? 'bg-[#252526]' : 'bg-white'} border ${isDark ? 'border-[#3e3e42]' : 'border-gray-200'}`}>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Select Cryptocurrency
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {cryptos.map(crypto => (
                <button
                  key={crypto.id}
                  onClick={() => setSelectedCrypto(crypto.id)}
                  className={`p-4 rounded-apple text-center transition-all ${
                    selectedCrypto === crypto.id 
                      ? 'bg-orange-500 text-white' 
                      : isDark 
                        ? 'bg-white/5 text-gray-400 hover:bg-white/10' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Wallet size={24} className="mx-auto mb-2" />
                  <span className="text-xs font-semibold">{crypto.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Wallet Address */}
          <div className={`p-6 rounded-apple-lg ${isDark ? 'bg-[#252526]' : 'bg-white'} border ${isDark ? 'border-[#3e3e42]' : 'border-gray-200'}`}>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Wallet Address
            </h3>
            <div className={`p-4 rounded-apple mb-3 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
              <p className={`text-sm font-mono break-all ${isDark ? 'text-white' : 'text-black'}`}>
                {walletAddress}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className={`w-full py-3 rounded-apple font-semibold flex items-center justify-center gap-2 transition-all ${
                isDark ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'
              }`}
            >
              {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Address'}
            </button>
          </div>
        </div>

        {/* Right Column - QR Code */}
        <div className={`p-6 rounded-apple-lg ${isDark ? 'bg-[#252526]' : 'bg-white'} border ${isDark ? 'border-[#3e3e42]' : 'border-gray-200'}`}>
          <h3 className={`font-semibold mb-4 text-center ${isDark ? 'text-white' : 'text-black'}`}>
            Scan QR Code
          </h3>
          <div className="bg-white p-6 rounded-apple mb-6 flex items-center justify-center">
            <QRCodeSVG value={walletAddress} size={200} />
          </div>
          
          <div className={`p-4 rounded-apple mb-4 ${isDark ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-orange-50 border border-orange-200'}`}>
            <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
              Amount to Send
            </p>
            <p className="text-2xl font-bold text-orange-500">
              0.00234 BTC
            </p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              ≈ $107.99 USD
            </p>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full py-3 rounded-apple font-semibold bg-orange-500 hover:bg-orange-600 text-white active:scale-95 transition-all"
          >
            I've Sent the Payment
          </button>
        </div>
      </div>
    </div>
  );
}
