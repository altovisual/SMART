import { X, TrendingUp, Calendar } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export default function StatsDetailModal({ stat, onClose, transactions = [] }) {
  const { isDark } = useTheme();

  if (!stat) return null;

  const Icon = stat.icon;

  // Calculate monthly breakdown
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() - i);
    return {
      month: month.toLocaleDateString('en-US', { month: 'short' }),
      value: Math.random() * 500 + 100
    };
  }).reverse();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className={`
          w-full max-w-2xl rounded-apple-xl overflow-hidden
          ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'}
          shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`
          px-6 py-4 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}
          flex items-center justify-between sticky top-0 z-10
          ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'}
        `}>
          <div className="flex items-center gap-3">
            <div className={`
              p-2.5 rounded-xl
              ${stat.color === 'blue' ? 'bg-blue-500/10' :
                stat.color === 'purple' ? 'bg-purple-500/10' :
                stat.color === 'green' ? 'bg-green-500/10' :
                'bg-orange-500/10'
              }
            `}>
              <Icon 
                size={20} 
                className={`
                  ${stat.color === 'blue' ? 'text-blue-500' :
                    stat.color === 'purple' ? 'text-purple-500' :
                    stat.color === 'green' ? 'text-green-500' :
                    'text-orange-500'
                  }
                `}
              />
            </div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              {stat.label}
            </h2>
          </div>
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
          {/* Current Value */}
          <div className={`
            text-center py-6 rounded-apple-lg
            ${isDark ? 'bg-white/5' : 'bg-gray-50'}
          `}>
            <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Current Value
            </p>
            <p className={`text-5xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              {stat.value}
            </p>
            <div className="flex items-center justify-center gap-2 text-green-500">
              <TrendingUp size={16} />
              <span className="text-sm font-semibold">{stat.change}</span>
            </div>
          </div>

          {/* Monthly Trend */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              6-Month Trend
            </h3>
            <div className="space-y-3">
              {monthlyData.map((data, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {data.month}
                    </span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                      ${data.value.toFixed(2)}
                    </span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-200'}`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-500
                        ${stat.color === 'blue' ? 'bg-blue-500' :
                          stat.color === 'purple' ? 'bg-purple-500' :
                          stat.color === 'green' ? 'bg-green-500' :
                          'bg-orange-500'
                        }
                      `}
                      style={{ width: `${(data.value / 600) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          {transactions.length > 0 && (
            <div>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                Recent Activity
              </h3>
              <div className="space-y-2">
                {transactions.slice(0, 5).map((tx, idx) => (
                  <div 
                    key={idx}
                    className={`
                      p-3 rounded-apple flex items-center justify-between
                      ${isDark ? 'bg-white/5' : 'bg-gray-50'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                      <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                          {tx.merchant_name}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {new Date(tx.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                      ${tx.amount_paid.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`
              w-full py-3 rounded-apple font-semibold
              ${isDark ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}
              transition-colors duration-150
            `}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
