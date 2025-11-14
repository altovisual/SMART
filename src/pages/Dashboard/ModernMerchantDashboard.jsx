import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { 
  DollarSign, TrendingUp, Users, CreditCard, 
  QrCode, Download, Calendar, ArrowUpRight
} from "lucide-react";
import { PaymentMethodsEvilChart } from "../../components/charts/EvilCharts";
import { QRCodeSVG } from "qrcode.react";

export default function ModernMerchantDashboard() {
  const { isDark } = useTheme();
  const [showQR, setShowQR] = useState(false);

  // Mock data
  const stats = [
    { label: 'Total Revenue', value: '$12,458.50', change: '+12.5%', icon: DollarSign, color: 'blue' },
    { label: 'Total Sales', value: '248', change: '+8.2%', icon: TrendingUp, color: 'green' },
    { label: 'Customers', value: '156', change: '+15.3%', icon: Users, color: 'purple' },
    { label: 'Avg. Order', value: '$50.24', change: '+3.1%', icon: CreditCard, color: 'orange' },
  ];

  const salesData = [
    { name: 'Crypto', value: 45, color: '#F97316' },
    { name: 'Credit Card', value: 35, color: '#3B82F6' },
    { name: 'Bank Transfer', value: 20, color: '#10B981' },
  ];

  const recentTransactions = [
    { id: 1, customer: 'John Doe', amount: 125.50, method: 'Crypto', status: 'Completed', date: '2024-11-14' },
    { id: 2, customer: 'Jane Smith', amount: 89.99, method: 'Credit Card', status: 'Completed', date: '2024-11-14' },
    { id: 3, customer: 'Bob Johnson', amount: 250.00, method: 'Bank Transfer', status: 'Pending', date: '2024-11-14' },
    { id: 4, customer: 'Alice Brown', amount: 45.25, method: 'Crypto', status: 'Completed', date: '2024-11-13' },
  ];

  const paymentUrl = "https://smartpay.app/pay/merchant123";

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
            Merchant Dashboard
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your sales and payments
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`
                  ${isDark ? 'bg-[#13141B]/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'}
                  rounded-2xl p-4 sm:p-6
                  border ${isDark ? 'border-white/10' : 'border-black/10'}
                  hover:scale-[1.02] transition-transform duration-200
                  shadow-lg ${isDark ? 'shadow-black/20' : 'shadow-black/5'}
                `}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`
                    p-2 sm:p-2.5 rounded-xl
                    ${stat.color === 'blue' ? 'bg-blue-500/10' :
                      stat.color === 'green' ? 'bg-green-500/10' :
                      stat.color === 'purple' ? 'bg-purple-500/10' :
                      'bg-orange-500/10'
                    }
                  `}>
                    <Icon 
                      size={18} 
                      className={`
                        ${stat.color === 'blue' ? 'text-blue-500' :
                          stat.color === 'green' ? 'text-green-500' :
                          stat.color === 'purple' ? 'text-purple-500' :
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
                <div className="flex items-center gap-1 text-green-500 text-xs">
                  <ArrowUpRight size={14} />
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            
            {/* Sales Breakdown */}
            <div className={`
              ${isDark ? 'bg-[#13141B]/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'}
              rounded-2xl sm:rounded-3xl p-4 sm:p-6
              border ${isDark ? 'border-white/10' : 'border-black/10'}
              shadow-lg ${isDark ? 'shadow-black/20' : 'shadow-black/5'}
            `}>
              <h2 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                Sales by Payment Method
              </h2>
              
              {/* EvilCharts Donut Chart */}
              <div className="h-80">
                <PaymentMethodsEvilChart data={salesData} />
              </div>
            </div>

            {/* Recent Transactions */}
            <div className={`
              ${isDark ? 'bg-[#13141B]/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'}
              rounded-2xl sm:rounded-3xl p-4 sm:p-6
              border ${isDark ? 'border-white/10' : 'border-black/10'}
              shadow-lg ${isDark ? 'shadow-black/20' : 'shadow-black/5'}
            `}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  Recent Transactions
                </h2>
                <button className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className={`
                      p-4 rounded-xl
                      ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'}
                      transition-colors duration-150 cursor-pointer
                    `}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold truncate ${isDark ? 'text-white' : 'text-black'}`}>
                          {tx.customer}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={14} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            {tx.date}
                          </span>
                          <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>•</span>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            {tx.method}
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                          ${tx.amount.toFixed(2)}
                        </p>
                        <span className={`
                          text-xs px-2 py-1 rounded-full
                          ${tx.status === 'Completed'
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-orange-500/10 text-orange-500'
                          }
                        `}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            
            {/* QR Code */}
            <div className={`
              ${isDark ? 'bg-[#13141B]/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'}
              rounded-2xl sm:rounded-3xl p-4 sm:p-6
              border ${isDark ? 'border-white/10' : 'border-black/10'}
              shadow-lg ${isDark ? 'shadow-black/20' : 'shadow-black/5'}
            `}>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                Payment QR Code
              </h3>
              
              <div className={`
                p-4 rounded-apple mb-4
                ${isDark ? 'bg-white' : 'bg-white'}
                flex items-center justify-center
              `}>
                <QRCodeSVG value={paymentUrl} size={160} />
              </div>

              <button
                onClick={() => setShowQR(true)}
                className={`
                  w-full py-3 rounded-apple font-semibold mb-2
                  flex items-center justify-center gap-2
                  ${isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}
                  active:scale-95 transition-all duration-150
                `}
              >
                <QrCode size={18} />
                View Full Size
              </button>

              <button
                className={`
                  w-full py-3 rounded-apple font-semibold
                  flex items-center justify-center gap-2
                  ${isDark ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}
                  active:scale-95 transition-all duration-150
                `}
              >
                <Download size={18} />
                Download QR
              </button>
            </div>

            {/* Quick Stats */}
            <div className={`
              ${isDark ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' : 'bg-gradient-to-br from-blue-50 to-purple-50'}
              rounded-2xl sm:rounded-3xl p-4 sm:p-6
              border ${isDark ? 'border-blue-500/20' : 'border-blue-200'}
            `}>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                Today's Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Sales Today
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    $1,245.50
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Orders
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    24
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    New Customers
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    8
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowQR(false)}
        >
          <div 
            className={`
              ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'}
              rounded-apple-xl p-8 shadow-2xl animate-slide-up
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={`text-xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-black'}`}>
              Scan to Pay
            </h3>
            <div className="bg-white p-4 rounded-apple mb-4">
              <QRCodeSVG value={paymentUrl} size={300} />
            </div>
            <button
              onClick={() => setShowQR(false)}
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
      )}
    </div>
  );
}
