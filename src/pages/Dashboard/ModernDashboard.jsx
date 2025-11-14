import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchDashboardData } from "../../redux/dashboard/dashboardActions";
import { useTheme } from "../../contexts/ThemeContext";
import { 
  TrendingUp, DollarSign, CreditCard, MoreHorizontal
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

export default function ModernDashboard() {
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const [timeframe, setTimeframe] = useState('1m');

  const loginUser = useMemo(() => {
    const storedUser = localStorage.getItem("authUser");
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  }, []);

  const { user, purchaseHistory, rewardHistory, status } =
    useSelector((state) => state.dashboard, shallowEqual);

  useEffect(() => {
    if (loginUser?.email) {
      dispatch(fetchDashboardData(loginUser.email));
    }
  }, [dispatch, loginUser?.email]);

  if (status === "loading" || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  // Calculate stats
  const totalSpent = purchaseHistory.reduce((sum, p) => sum + (p.amount_paid || 0), 0);
  const totalRewards = rewardHistory.reduce((sum, r) => sum + (r.reward_amount || 0), 0);
  
  // Mock chart data
  const chartData = Array.from({ length: 30 }, (_, i) => ({
    date: i,
    value: 1000 + Math.random() * 500 + i * 10
  }));

  const timeframes = ['1h', '24h', '1w', '1m', '6m', '1y'];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0A0B0D]' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Main Chart Section */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            
            {/* Price Card */}
            <div className={`
              ${isDark ? 'bg-[#13141B]' : 'bg-white'}
              rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8
              border ${isDark ? 'border-white/5' : 'border-black/5'}
              shadow-xl shadow-black/5
            `}>
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <DollarSign size={16} className="text-white sm:w-5 sm:h-5" />
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center -ml-2 sm:-ml-3">
                      <CreditCard size={16} className="text-white sm:w-5 sm:h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Balance
                    </h3>
                  </div>
                </div>
                
                {/* Timeframe Selector */}
                <div className={`
                  flex items-center gap-0.5 sm:gap-1 p-1 rounded-xl overflow-x-auto
                  ${isDark ? 'bg-white/5' : 'bg-gray-100'}
                `}>
                  {timeframes.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`
                        px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap
                        ${timeframe === tf
                          ? isDark
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-500 text-white'
                          : isDark
                            ? 'text-gray-400 hover:text-white'
                            : 'text-gray-600 hover:text-black'
                        }
                      `}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Display */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 mb-2">
                  <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h1>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp size={18} className="sm:w-5 sm:h-5" />
                    <span className="text-base sm:text-lg font-semibold">+4.6%</span>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="h-64 -mx-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? '#1C1D24' : '#FFFFFF',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Transaction Table */}
            <div className={`
              ${isDark ? 'bg-[#13141B]' : 'bg-white'}
              rounded-3xl p-6
              border ${isDark ? 'border-white/5' : 'border-black/5'}
              shadow-xl shadow-black/5
            `}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  Recent Transactions
                </h2>
                <button className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  View All
                </button>
              </div>

              <div className="space-y-1">
                {/* Table Header */}
                <div className={`
                  grid grid-cols-5 gap-4 px-4 py-3 text-xs font-medium
                  ${isDark ? 'text-gray-500' : 'text-gray-600'}
                `}>
                  <div className="col-span-2">#  MERCHANT</div>
                  <div className="text-right">AMOUNT</div>
                  <div className="text-right">STATUS</div>
                  <div className="text-right">REWARDS</div>
                </div>

                {/* Table Rows */}
                {purchaseHistory.slice(0, 5).map((tx, idx) => (
                  <div
                    key={idx}
                    className={`
                      grid grid-cols-5 gap-4 px-4 py-4 rounded-2xl
                      ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}
                      transition-colors duration-150 cursor-pointer
                    `}
                  >
                    <div className="col-span-2 flex items-center gap-3">
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {idx + 1}
                      </span>
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${tx.payment_method === 'Crypto' 
                          ? 'bg-gradient-to-br from-orange-400 to-orange-600'
                          : tx.payment_method === 'Via Credit Card'
                            ? 'bg-gradient-to-br from-blue-400 to-blue-600'
                            : 'bg-gradient-to-br from-green-400 to-green-600'
                        }
                      `}>
                        <span className="text-white text-xs font-bold">
                          {tx.merchant_name.charAt(0)}
                        </span>
                      </div>
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                        {tx.merchant_name}
                      </span>
                    </div>
                    
                    <div className={`text-right text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                      ${tx.amount_paid.toFixed(2)}
                    </div>
                    
                    <div className="text-right">
                      <span className={`
                        inline-flex px-2 py-1 rounded-full text-xs font-medium
                        ${tx.status === 'Completed'
                          ? 'bg-blue-500/10 text-blue-500'
                          : tx.status === 'Failed'
                            ? 'bg-red-500/10 text-red-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }
                      `}>
                        {tx.status}
                      </span>
                    </div>
                    
                    <div className={`text-right text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                      {tx.points > 0 ? `${tx.points} pts` : '-'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Actions Card */}
            <div className={`
              ${isDark ? 'bg-[#13141B]' : 'bg-white'}
              rounded-3xl p-6
              border ${isDark ? 'border-white/5' : 'border-black/5'}
              shadow-xl shadow-black/5
            `}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  Quick Actions
                </h3>
                <MoreHorizontal size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
              </div>

              <div className="space-y-3">
                <button className={`
                  w-full py-4 rounded-2xl font-semibold
                  bg-gradient-to-r from-blue-500 to-blue-600
                  text-white
                  hover:from-blue-600 hover:to-blue-700
                  active:scale-[0.98] transition-all duration-150
                  shadow-lg shadow-blue-500/25
                `}>
                  Buy Crypto
                </button>
                
                <button className={`
                  w-full py-4 rounded-2xl font-semibold
                  ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}
                  active:scale-[0.98] transition-all duration-150
                `}>
                  Sell Crypto
                </button>
              </div>

              <button className={`
                w-full mt-4 py-3 rounded-2xl text-sm font-medium
                ${isDark ? 'text-blue-400 hover:bg-white/5' : 'text-blue-600 hover:bg-gray-50'}
                transition-colors duration-150
              `}>
                Connect Wallet
              </button>
            </div>

            {/* Balance Cards */}
            <div className="space-y-4">
              {/* BTC Balance */}
              <div className={`
                ${isDark ? 'bg-gradient-to-br from-orange-500/10 to-orange-600/5' : 'bg-gradient-to-br from-orange-50 to-orange-100/50'}
                rounded-3xl p-6
                border ${isDark ? 'border-orange-500/20' : 'border-orange-200'}
              `}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">₿</span>
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                      BTC
                    </span>
                  </div>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    You Buy
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    18.959
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Balance
                  </span>
                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    487.95
                  </span>
                </div>
              </div>

              {/* USD Balance */}
              <div className={`
                ${isDark ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/5' : 'bg-gradient-to-br from-blue-50 to-blue-100/50'}
                rounded-3xl p-6
                border ${isDark ? 'border-blue-500/20' : 'border-blue-200'}
              `}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">$</span>
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                      USD
                    </span>
                  </div>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    You Spend
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    10,272
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Balance
                  </span>
                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    15,812.49
                  </span>
                </div>
              </div>
            </div>

            {/* Available Balance */}
            <div className={`
              ${isDark ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10' : 'bg-gradient-to-br from-purple-50 to-blue-50'}
              rounded-3xl p-6
              border ${isDark ? 'border-purple-500/20' : 'border-purple-200'}
            `}>
              <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Available Balance
              </h4>
              
              <div className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                {totalRewards.toLocaleString()} <span className="text-2xl">PTS</span>
              </div>

              <div className={`
                grid grid-cols-3 gap-3 p-4 rounded-2xl
                ${isDark ? 'bg-white/5' : 'bg-white/50'}
              `}>
                <div>
                  <div className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Fee
                  </div>
                  <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    6.32 USD
                  </div>
                </div>
                <div>
                  <div className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Receive
                  </div>
                  <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    120.58
                  </div>
                </div>
                <div>
                  <div className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Spread
                  </div>
                  <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    0%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
