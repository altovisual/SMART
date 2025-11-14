import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchDashboardData } from "../../redux/dashboard/dashboardActions";
import { useTheme } from "../../contexts/ThemeContext";
import { 
  CreditCard, TrendingUp, Award, Activity, 
  ChevronRight, DollarSign, Calendar, CheckCircle2,
  XCircle, Clock
} from "lucide-react";

export default function AppleUserDashboard() {
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('30D');

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

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!loginUser?.email || !user) {
    return null;
  }

  // Calculate stats
  const totalSpent = purchaseHistory.reduce((sum, p) => sum + (p.amount_paid || 0), 0);
  const totalRewards = rewardHistory.reduce((sum, r) => sum + (r.reward_amount || 0), 0);
  const completedTransactions = purchaseHistory.filter(p => p.status === 'Completed').length;
  const successRate = ((completedTransactions / purchaseHistory.length) * 100).toFixed(1);

  // Stats cards data
  const stats = [
    {
      icon: DollarSign,
      label: 'Total Spent',
      value: `$${totalSpent.toFixed(2)}`,
      change: '+12.5%',
      isPositive: true,
      color: 'blue'
    },
    {
      icon: Award,
      label: 'Rewards',
      value: `${totalRewards} pts`,
      change: '+8.2%',
      isPositive: true,
      color: 'purple'
    },
    {
      icon: Activity,
      label: 'Transactions',
      value: completedTransactions,
      change: '+5.1%',
      isPositive: true,
      color: 'green'
    },
    {
      icon: TrendingUp,
      label: 'Success Rate',
      value: `${successRate}%`,
      change: '-2.1%',
      isPositive: false,
      color: 'orange'
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-[#F5F5F7]'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        
        {/* Header */}
        <header className="flex items-center justify-between animate-slide-up">
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              Dashboard
            </h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Welcome back, {user.name || 'User'}
            </p>
          </div>
          <button 
            onClick={() => window.location.href = '/checkout'}
            className={`
              ${isDark ? 'bg-blue-600' : 'bg-blue-500'} 
              text-white px-6 py-2.5 rounded-xl font-semibold
              active:scale-95 transition-all duration-150
              shadow-sm flex items-center gap-2
              hover:${isDark ? 'bg-blue-700' : 'bg-blue-600'}
            `}
          >
            <CreditCard size={18} />
            New Payment
          </button>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`
                  ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'}
                  rounded-2xl p-6 
                  border ${isDark ? 'border-white/10' : 'border-black/5'}
                  hover:scale-[1.02] active:scale-[0.98]
                  transition-all duration-200
                  shadow-sm
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    p-3 rounded-xl
                    ${isDark ? 'bg-white/10' : 'bg-gray-100'}
                  `}>
                    <Icon size={20} className={`text-${stat.color}-500`} />
                  </div>
                  <span className={`
                    text-sm font-medium
                    ${stat.isPositive 
                      ? 'text-green-500' 
                      : 'text-red-500'
                    }
                  `}>
                    {stat.change}
                  </span>
                </div>
                <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  {stat.value}
                </p>
              </div>
            );
          })}
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Spending Overview */}
          <div className={`
            lg:col-span-2
            ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'}
            rounded-2xl p-6
            border ${isDark ? 'border-white/10' : 'border-black/5'}
            shadow-sm animate-slide-up
          `}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  Spending Overview
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Last 30 days
                </p>
              </div>
              <div className={`
                flex gap-2 p-1 rounded-xl
                ${isDark ? 'bg-white/5' : 'bg-gray-100'}
              `}>
                {['7D', '30D', '90D'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`
                      px-4 py-1.5 rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${selectedPeriod === period
                        ? isDark
                          ? 'bg-white text-black'
                          : 'bg-blue-500 text-white'
                        : isDark
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-600 hover:text-black'
                      }
                    `}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Simple chart placeholder */}
            <div className={`
              h-48 rounded-xl flex items-end justify-between gap-2 p-4
              ${isDark ? 'bg-white/5' : 'bg-gray-50'}
            `}>
              {[40, 65, 55, 80, 70, 90, 75, 95, 85, 100, 90, 110].map((height, idx) => (
                <div
                  key={idx}
                  className={`flex-1 rounded-t-lg ${isDark ? 'bg-blue-600' : 'bg-blue-500'} transition-all duration-500`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
              <div>
                <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Average
                </p>
                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  ${(totalSpent / purchaseHistory.length).toFixed(2)}
                </p>
              </div>
              <div>
                <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Highest
                </p>
                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  ${Math.max(...purchaseHistory.map(p => p.amount_paid || 0)).toFixed(2)}
                </p>
              </div>
              <div>
                <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Lowest
                </p>
                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  ${Math.min(...purchaseHistory.map(p => p.amount_paid || 0)).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`
            ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'}
            rounded-2xl p-6
            border ${isDark ? 'border-white/10' : 'border-black/5'}
            shadow-sm animate-slide-up
          `}>
            <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              Quick Actions
            </h2>
            <div className="space-y-3">
              {[
                { icon: CreditCard, label: 'New Payment', color: 'blue' },
                { icon: Calendar, label: 'Schedule Payment', color: 'purple' },
                { icon: Award, label: 'View Rewards', color: 'green' },
                { icon: Activity, label: 'Transaction History', color: 'orange' }
              ].map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    className={`
                      w-full flex items-center justify-between p-4 rounded-xl
                      ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'}
                      active:scale-[0.98] transition-all duration-150
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        p-2 rounded-lg
                        ${isDark ? 'bg-white/10' : 'bg-white'}
                      `}>
                        <Icon size={18} className={`text-${action.color}-500`} />
                      </div>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                        {action.label}
                      </span>
                    </div>
                    <ChevronRight size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <section className={`
          ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'}
          rounded-2xl overflow-hidden
          border ${isDark ? 'border-white/10' : 'border-black/5'}
          shadow-sm animate-slide-up
        `}>
          <div className="p-6 border-b border-gray-200 dark:border-white/10">
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              Recent Transactions
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-white/10">
            {purchaseHistory.slice(0, 5).map((transaction, idx) => {
              const StatusIcon = transaction.status === 'Completed' ? CheckCircle2 :
                                transaction.status === 'Failed' ? XCircle : Clock;
              const statusColor = transaction.status === 'Completed' ? 'green' :
                                 transaction.status === 'Failed' ? 'red' : 'yellow';
              
              return (
                <div
                  key={idx}
                  className={`
                    p-4 flex items-center justify-between
                    ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}
                    active:bg-gray-100 dark:active:bg-white/10
                    transition-colors duration-150 cursor-pointer
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      p-3 rounded-xl
                      ${isDark ? 'bg-white/10' : 'bg-gray-100'}
                    `}>
                      <CreditCard size={20} className={isDark ? 'text-white' : 'text-black'} />
                    </div>
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                        {transaction.merchant_name}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {transaction.item} • {transaction.payment_method}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                        ${transaction.amount_paid.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-1 justify-end">
                        <StatusIcon size={14} className={`text-${statusColor}-500`} />
                        <span className={`text-sm text-${statusColor}-500`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
