import { useTheme } from "../../contexts/ThemeContext";
import { useWeb3, formatAddress, NETWORKS } from "../../hooks/useWeb3";
import { X, Wallet, ExternalLink, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function ConnectWalletModal({ onClose }) {
  const { isDark } = useTheme();
  const { 
    account, 
    isConnecting, 
    error, 
    chainId,
    connectWallet, 
    disconnectWallet,
    getBalance 
  } = useWeb3();
  
  const [balance, setBalance] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) {
      const bal = await getBalance(address);
      setBalance(bal);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getNetworkName = (chainId) => {
    const network = Object.values(NETWORKS).find(n => n.chainId === chainId);
    return network ? network.name : 'Unknown Network';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        className={`
          w-full max-w-md rounded-apple-xl p-6
          ${isDark ? 'bg-[#252526]' : 'bg-white'}
          border ${isDark ? 'border-[#3e3e42]' : 'border-gray-200'}
          shadow-2xl animate-slide-up
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            {account ? 'Wallet Connected' : 'Connect Wallet'}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-apple transition-colors ${
              isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
            }`}
          >
            <X size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>

        {/* Content */}
        {!account ? (
          // Not Connected State
          <div className="space-y-4">
            {/* MetaMask Button */}
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className={`
                w-full p-4 rounded-apple-lg flex items-center gap-4
                transition-all duration-150
                ${isDark 
                  ? 'bg-white/5 hover:bg-white/10 border border-white/10' 
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                }
                ${isConnecting ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
              `}
            >
              <div className="w-12 h-12 rounded-apple bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <Wallet size={24} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                  {isConnecting ? 'Connecting...' : 'MetaMask'}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Connect to your MetaMask wallet
                </p>
              </div>
              <ExternalLink size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
            </button>

            {/* Error Message */}
            {error && (
              <div className={`p-4 rounded-apple flex items-start gap-3 ${
                isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
              }`}>
                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    Connection Failed
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* Info */}
            <div className={`p-4 rounded-apple ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        ) : (
          // Connected State
          <div className="space-y-4">
            {/* Success Badge */}
            <div className={`p-4 rounded-apple flex items-center gap-3 ${
              isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'
            }`}>
              <CheckCircle2 size={20} className="text-green-500" />
              <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                Wallet Successfully Connected
              </p>
            </div>

            {/* Wallet Info */}
            <div className={`p-4 rounded-apple ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
              <div className="space-y-3">
                {/* Address */}
                <div>
                  <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Wallet Address
                  </p>
                  <div className="flex items-center gap-2">
                    <p className={`font-mono text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                      {formatAddress(account)}
                    </p>
                    <button
                      onClick={handleCopy}
                      className={`p-1.5 rounded-apple transition-colors ${
                        isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200'
                      }`}
                    >
                      {copied ? (
                        <CheckCircle2 size={16} className="text-green-500" />
                      ) : (
                        <Copy size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Balance */}
                {balance && (
                  <div>
                    <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Balance
                    </p>
                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                      {balance} ETH
                    </p>
                  </div>
                )}

                {/* Network */}
                {chainId && (
                  <div>
                    <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Network
                    </p>
                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                      {getNetworkName(chainId)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => window.open(`https://etherscan.io/address/${account}`, '_blank')}
                className={`
                  flex-1 py-3 rounded-apple font-semibold flex items-center justify-center gap-2
                  ${isDark ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}
                  active:scale-95 transition-all
                `}
              >
                <ExternalLink size={18} />
                View on Explorer
              </button>
              <button
                onClick={() => {
                  disconnectWallet();
                  onClose();
                }}
                className={`
                  flex-1 py-3 rounded-apple font-semibold
                  bg-red-500 hover:bg-red-600 text-white
                  active:scale-95 transition-all
                `}
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
