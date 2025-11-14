import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDashboardData } from "../../redux/dashboard/dashboardActions";
import { useTheme } from "../../contexts/ThemeContext";
import { 
  CreditCard, Wallet, Award, Clock, CheckCircle2, XCircle,
  DollarSign, Zap
} from "lucide-react";
import TransactionDetailModal from "../../components/modals/TransactionDetailModal";
import StatsDetailModal from "../../components/modals/StatsDetailModal";
import ConnectWalletModal from "../../components/modals/ConnectWalletModal";

export default function PaymentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [filter, setFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedStat, setSelectedStat] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);

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
  const completedTransactions = purchaseHistory.filter(p => p.status === 'Completed').length;
  const pendingTransactions = purchaseHistory.filter(p => p.status === 'Pending').length;

  // Payment method breakdown
  const cryptoPayments = purchaseHistory.filter(p => p.payment_method === 'Crypto').length;
  const cardPayments = purchaseHistory.filter(p => p.payment_method === 'Via Credit Card').length;
  const bankPayments = purchaseHistory.filter(p => p.payment_method === 'Bank').length;

  const stats = [
    {
      label: 'Total Spent',
      value: `$${totalSpent.toFixed(2)}`,
      icon: DollarSign,
      change: '+12.5%',
      color: 'blue'
    },
    {
      label: 'Rewards Earned',
      value: `${totalRewards} pts`,
      icon: Award,
      change: '+8.2%',
      color: 'purple'
    },
    {
      label: 'Completed',
      value: completedTransactions,
      icon: CheckCircle2,
      change: `${completedTransactions}/${purchaseHistory.length}`,
      color: 'green'
    },
    {
      label: 'Pending',
      value: pendingTransactions,
      icon: Clock,
      change: 'In progress',
      color: 'orange'
    }
  ];

  const filteredTransactions = filter === 'all' 
    ? purchaseHistory 
    : purchaseHistory.filter(t => t.payment_method === filter);

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
            Payment Dashboard
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your payments and track rewards
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                onClick={() => setSelectedStat(stat)}
                className={`
                  ${isDark ? 'bg-[#13141B]/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'}
                  rounded-2xl p-4 sm:p-6
                  border ${isDark ? 'border-white/10' : 'border-black/10'}
                  hover:scale-[1.02] transition-transform duration-200
                  shadow-lg ${isDark ? 'shadow-black/20' : 'shadow-black/5'}
                  cursor-pointer active:scale-[0.98]
                `}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`
                    p-2 sm:p-2.5 rounded-xl
                    ${stat.color === 'blue' ? 'bg-blue-500/10' :
                      stat.color === 'purple' ? 'bg-purple-500/10' :
                      stat.color === 'green' ? 'bg-green-500/10' :
                      'bg-orange-500/10'
                    }
                  `}>
                    <Icon 
                      size={18} 
                      className={`
                        ${stat.color === 'blue' ? 'text-blue-500' :
                          stat.color === 'purple' ? 'text-purple-500' :
                          stat.color === 'green' ? 'text-green-500' :
                          'text-orange-500'
                        }
                      `}
                    />
                  </div>
                </div>
                <div className={`text-xs sm:text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
                <div className={`text-xl sm:text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                  {stat.value}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            
            {/* Quick Actions */}
            <div className={`
              ${isDark ? 'bg-[#13141B]/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'}
              rounded-2xl sm:rounded-3xl p-4 sm:p-6
              border ${isDark ? 'border-white/10' : 'border-black/10'}
              shadow-lg ${isDark ? 'shadow-black/20' : 'shadow-black/5'}
            `}>
              <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/checkout')}
                  className={`
                    p-4 rounded-xl text-left
                    bg-gradient-to-br from-blue-500 to-blue-600
                    text-white font-semibold
                    hover:from-blue-600 hover:to-blue-700
                    active:scale-[0.98] transition-all duration-150
                    shadow-lg shadow-blue-500/25
                  `}
                >
                  <CreditCard size={24} className="mb-2" />
                  <div className="text-sm sm:text-base">New Payment</div>
                  <div className="text-xs opacity-80 mt-1">Pay with crypto or card</div>
                </button>

                <button
                  onClick={() => setShowWalletModal(true)}
                  className={`
                    p-4 rounded-xl text-left
                    ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}
                    ${isDark ? 'text-white' : 'text-black'}
                    font-semibold
                    active:scale-[0.98] transition-all duration-150
                  `}
                >
                  <Wallet size={24} className="mb-2" />
                  <div className="text-sm sm:text-base">Connect Wallet</div>
                  <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Link your crypto wallet
                  </div>
                </button>
              </div>
            </div>

            {/* Transaction History */}
            <div className={`
              ${isDark ? 'bg-[#13141B]/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'}
              rounded-2xl sm:rounded-3xl p-4 sm:p-6
              border ${isDark ? 'border-white/10' : 'border-black/10'}
              shadow-lg ${isDark ? 'shadow-black/20' : 'shadow-black/5'}
            `}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  Transaction History
                </h2>
                
                {/* Filter */}
                <div className={`
                  flex gap-2 p-1 rounded-xl overflow-x-auto
                  ${isDark ? 'bg-white/5' : 'bg-gray-100'}
                `}>
                  {['all', 'Crypto', 'Via Credit Card', 'Bank'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap
                        transition-all duration-300 ease-in-out
                        ${filter === f
                          ? isDark
                            ? 'bg-blue-600 text-white scale-105 shadow-lg shadow-blue-500/25'
                            : 'bg-blue-500 text-white scale-105 shadow-lg shadow-blue-500/25'
                          : isDark
                            ? 'text-gray-400 hover:text-white hover:bg-white/5'
                            : 'text-gray-600 hover:text-black hover:bg-gray-200'
                        }
                        active:scale-95
                      `}
                    >
                      {f === 'all' ? 'All' : f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transactions List */}
              <div className="space-y-3 min-h-[200px]">
                {filteredTransactions.length === 0 ? (
                  <div className={`
                    text-center py-12 animate-fade-in
                    ${isDark ? 'text-gray-400' : 'text-gray-600'}
                  `}>
                    <p className="text-lg mb-2">No transactions found</p>
                    <p className="text-sm">Try selecting a different filter</p>
                  </div>
                ) : (
                  filteredTransactions.map((tx, idx) => {
                  const StatusIcon = tx.status === 'Completed' ? CheckCircle2 :
                                    tx.status === 'Failed' ? XCircle : Clock;
                  const statusColor = tx.status === 'Completed' ? 'green' :
                                     tx.status === 'Failed' ? 'red' : 'orange';
                  
                  return (
                    <div
                      key={`${filter}-${idx}`}
                      onClick={() => setSelectedTransaction(tx)}
                      className={`
                        p-4 rounded-xl
                        ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'}
                        transition-all duration-300 cursor-pointer
                        animate-slide-up
                        active:scale-[0.98]
                      `}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                            ${tx.payment_method === 'Crypto' 
                              ? 'bg-gradient-to-br from-orange-400 to-orange-600'
                              : tx.payment_method === 'Via Credit Card'
                                ? 'bg-gradient-to-br from-blue-400 to-blue-600'
                                : 'bg-gradient-to-br from-green-400 to-green-600'
                            }
                          `}>
                            {tx.payment_method === 'Crypto' ? (
                              <Wallet size={18} className="text-white" />
                            ) : (
                              <CreditCard size={18} className="text-white" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className={`font-semibold truncate ${isDark ? 'text-white' : 'text-black'}`}>
                              {tx.merchant_name}
                            </div>
                            <div className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {tx.item} • {tx.payment_method}
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                            ${tx.amount_paid.toFixed(2)}
                          </div>
                          <div className="flex items-center gap-1 justify-end">
                            <StatusIcon size={14} className={`text-${statusColor}-500`} />
                            <span className={`text-xs text-${statusColor}-500`}>
                              {tx.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            
            {/* Payment Methods */}
            <div className={`
              ${isDark ? 'bg-[#13141B]/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'}
              rounded-2xl sm:rounded-3xl p-4 sm:p-6
              border ${isDark ? 'border-white/10' : 'border-black/10'}
              shadow-lg ${isDark ? 'shadow-black/20' : 'shadow-black/5'}
            `}>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                Payment Methods
              </h3>
              
              <div className="space-y-3">
                <div className={`p-3 rounded-xl ${isDark ? 'bg-orange-500/10' : 'bg-orange-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wallet size={16} className="text-orange-500" />
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                        Cryptocurrency
                      </span>
                    </div>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {cryptoPayments} payments
                    </span>
                  </div>
                  <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${(cryptoPayments / purchaseHistory.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-blue-500" />
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                        Credit/Debit Card
                      </span>
                    </div>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {cardPayments} payments
                    </span>
                  </div>
                  <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${(cardPayments / purchaseHistory.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className={`p-3 rounded-xl ${isDark ? 'bg-green-500/10' : 'bg-green-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-green-500" />
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                        Bank Transfer
                      </span>
                    </div>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {bankPayments} payments
                    </span>
                  </div>
                  <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${(bankPayments / purchaseHistory.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rewards Card */}
            <div className={`
              ${isDark ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10' : 'bg-gradient-to-br from-purple-50 to-pink-50'}
              rounded-2xl sm:rounded-3xl p-4 sm:p-6
              border ${isDark ? 'border-purple-500/20' : 'border-purple-200'}
            `}>
              <div className="flex items-center gap-2 mb-4">
                <Zap size={20} className="text-purple-500" />
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  Instant Rewards
                </h3>
              </div>
              
              <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                {totalRewards}
                <span className="text-xl ml-2">PTS</span>
              </div>
              
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Earn 5% back on every payment
              </p>

              <div className={`
                p-3 rounded-xl
                ${isDark ? 'bg-white/5' : 'bg-white/50'}
              `}>
                <div className="flex items-center justify-between text-sm">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Next reward at
                  </span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    {Math.ceil(totalRewards / 100) * 100} pts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <TransactionDetailModal
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        )}

        {/* Stats Detail Modal */}
        {selectedStat && (
          <StatsDetailModal
            stat={selectedStat}
            transactions={purchaseHistory}
            onClose={() => setSelectedStat(null)}
          />
        )}

        {/* Connect Wallet Modal */}
        {showWalletModal && (
          <ConnectWalletModal
            onClose={() => setShowWalletModal(false)}
          />
        )}
      </div>
    </div>
  );
}
