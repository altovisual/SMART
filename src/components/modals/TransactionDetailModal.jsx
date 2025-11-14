import { X, Calendar, CreditCard, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export default function TransactionDetailModal({ transaction, onClose }) {
  const { isDark } = useTheme();

  if (!transaction) return null;

  const StatusIcon = transaction.status === 'Completed' ? CheckCircle2 :
                    transaction.status === 'Failed' ? XCircle : Clock;
  const statusColor = transaction.status === 'Completed' ? 'green' :
                     transaction.status === 'Failed' ? 'red' : 'orange';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className={`
          w-full max-w-lg rounded-apple-xl overflow-hidden
          ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'}
          shadow-2xl animate-slide-up
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`
          px-6 py-4 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}
          flex items-center justify-between
        `}>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            Transaction Details
          </h2>
          <button
            onClick={onClose}
            className={`
              p-2 rounded-apple-sm
              ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}
              transition-colors duration-150
            `}
          >
            <X size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Merchant Info */}
          <div className="text-center">
            <div className={`
              w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center
              ${transaction.payment_method === 'Crypto' 
                ? 'bg-gradient-to-br from-orange-400 to-orange-600'
                : transaction.payment_method === 'Via Credit Card'
                  ? 'bg-gradient-to-br from-blue-400 to-blue-600'
                  : 'bg-gradient-to-br from-green-400 to-green-600'
              }
            `}>
              <CreditCard size={32} className="text-white" />
            </div>
            <h3 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
              {transaction.merchant_name}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {transaction.item}
            </p>
          </div>

          {/* Amount */}
          <div className={`
            text-center py-4 rounded-apple
            ${isDark ? 'bg-white/5' : 'bg-gray-50'}
          `}>
            <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Amount Paid
            </p>
            <p className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              ${transaction.amount_paid.toFixed(2)}
            </p>
          </div>

          {/* Details Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Payment Method
              </span>
              <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                {transaction.payment_method}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Status
              </span>
              <div className="flex items-center gap-2">
                <StatusIcon size={16} className={`text-${statusColor}-500`} />
                <span className={`text-sm font-semibold text-${statusColor}-500`}>
                  {transaction.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Rewards Earned
              </span>
              <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                {transaction.points} pts
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Date
              </span>
              <div className="flex items-center gap-2">
                <Calendar size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                  {new Date(transaction.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Transaction ID
              </span>
              <span className={`text-sm font-mono ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                #{transaction.id.toString().padStart(6, '0')}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className={`
                flex-1 py-3 rounded-apple font-semibold
                ${isDark ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}
                transition-colors duration-150
              `}
            >
              Close
            </button>
            {transaction.status === 'Completed' && (
              <button
                className={`
                  flex-1 py-3 rounded-apple font-semibold
                  bg-blue-500 hover:bg-blue-600 text-white
                  transition-colors duration-150
                `}
              >
                Download Receipt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
