import { useEffect, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchDashboardData } from "../../redux/dashboard/dashboardActions";
import { TrendingUp, TrendingDown, DollarSign, Award, CreditCard, Activity } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

import LoadingScreen from "../../components/common/LoadingScreen";
import { components, glassmorphism } from "../../styles/designSystem";

const PurchaseHistory = lazy(() =>
  import("../../components/dashboard/PurchaseHistory")
);
const RewardHistory = lazy(() =>
  import("../../components/dashboard/RewardHistory")
);

export default function Dashboard() {
  const dispatch = useDispatch();

  const loginUser = useMemo(() => {
    const storedUser = localStorage.getItem("authUser");
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      console.warn("Invalid authUser format in localStorage");
      return null;
    }
  }, []);

  const { user, purchaseHistory, rewardHistory, status, error } =
    useSelector((state) => state.dashboard, shallowEqual);

  useEffect(() => {
    if (loginUser?.email) {
      dispatch(fetchDashboardData(loginUser.email));
    }
  }, [dispatch, loginUser?.email]);

  if (status === "loading") {
    return <LoadingScreen message="Loading dashboard..." />;
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-center">
        <p>Error loading dashboard: {error || "Unknown error"}</p>
      </div>
    );
  }

  if (!loginUser?.email || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-center">
        <p>Please log in to continue.</p>
      </div>
    );
  }

  // Mock chart data
  const chartData = [
    { value: 100 }, { value: 120 }, { value: 115 }, { value: 134 },
    { value: 168 }, { value: 155 }, { value: 178 }, { value: 165 },
    { value: 189 }, { value: 210 }, { value: 198 }, { value: 220 }
  ];

  // Calculate stats
  const totalSpent = purchaseHistory.reduce((sum, p) => sum + (p.amount_paid || 0), 0);
  const totalRewards = rewardHistory.reduce((sum, r) => sum + (r.reward_amount || 0), 0);
  const completedTransactions = purchaseHistory.filter(p => p.status === 'Completed').length;

  return (
    <div className="w-full min-h-screen text-white px-4 py-6 md:px-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-grifter font-bold mb-1">
              Dashboard
            </h1>
            <p className="text-sm text-gray-400">Welcome back, {user.name || 'User'}</p>
          </div>
          <button className={`${components.button.primary} flex items-center gap-2`}>
            <CreditCard size={20} />
            Make Payment
          </button>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto">
        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Spent */}
          <div className={components.card}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${glassmorphism.medium} rounded-2xl`}>
                <DollarSign className="text-violet-400" size={24} />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <TrendingUp size={16} />
                <span>+12.5%</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Total Spent</h3>
            <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
          </div>

          {/* Total Rewards */}
          <div className={components.card}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${glassmorphism.medium} rounded-2xl`}>
                <Award className="text-cyan-400" size={24} />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <TrendingUp size={16} />
                <span>+8.2%</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Total Rewards</h3>
            <p className="text-2xl font-bold">{totalRewards} pts</p>
          </div>

          {/* Transactions */}
          <div className={components.card}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${glassmorphism.medium} rounded-2xl`}>
                <Activity className="text-blue-400" size={24} />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <TrendingUp size={16} />
                <span>+5.1%</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Transactions</h3>
            <p className="text-2xl font-bold">{completedTransactions}</p>
          </div>

          {/* Success Rate */}
          <div className={components.card}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${glassmorphism.medium} rounded-2xl`}>
                <TrendingUp className="text-green-400" size={24} />
              </div>
              <div className="flex items-center gap-1 text-red-400 text-sm">
                <TrendingDown size={16} />
                <span>-2.1%</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Success Rate</h3>
            <p className="text-2xl font-bold">{((completedTransactions / purchaseHistory.length) * 100).toFixed(1)}%</p>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Spending Overview - Takes 2 columns */}
          <div className={`lg:col-span-2 ${components.card}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-grifter mb-1">Spending Overview</h2>
                <p className="text-sm text-gray-400">Last 30 days</p>
              </div>
              <div className="flex gap-2">
                <button className={`${components.button.ghost} text-sm py-2`}>7D</button>
                <button className={`${components.button.secondary} text-sm py-2`}>30D</button>
                <button className={`${components.button.ghost} text-sm py-2`}>90D</button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
              <div>
                <p className="text-gray-400 text-sm mb-1">Average</p>
                <p className="text-xl font-bold">${(totalSpent / purchaseHistory.length).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Highest</p>
                <p className="text-xl font-bold">${Math.max(...purchaseHistory.map(p => p.amount_paid || 0)).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Lowest</p>
                <p className="text-xl font-bold">${Math.min(...purchaseHistory.map(p => p.amount_paid || 0)).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className={components.card}>
            <h2 className="text-xl font-grifter mb-6">Payment Methods</h2>
            <div className="space-y-4">
              {['Crypto', 'Via Credit Card', 'Bank'].map((method, idx) => {
                const count = purchaseHistory.filter(p => p.payment_method === method).length;
                const percentage = (count / purchaseHistory.length) * 100;
                return (
                  <div key={method}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">{method}</span>
                      <span className="text-sm text-gray-400">{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${idx === 0 ? 'bg-violet-500' : idx === 1 ? 'bg-cyan-500' : 'bg-blue-500'} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Purchase History */}
        <section className="mb-6">
          <Suspense fallback={<LoadingScreen message="Loading purchases..." />}>
            <PurchaseHistory data={purchaseHistory} />
          </Suspense>
        </section>

        {/* Reward History */}
        <section>
          <Suspense fallback={<LoadingScreen message="Loading rewards..." />}>
            <RewardHistory data={rewardHistory} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
