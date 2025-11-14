import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, signup } from "../../redux/auth/actions";
import { useTheme } from "../../contexts/ThemeContext";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CreditCard, Zap, Shield, Store, Key } from "lucide-react";
import ThemeToggle from "../../components/common/ThemeToggle";

export default function ModernAuth2Col() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Determine role based on email
        const role = formData.email.includes('merchant') ? 'merchant' : 'user';
        await dispatch(login(formData.email, formData.password, role));
        
        // Redirect based on role
        if (role === 'merchant') {
          navigate("/merchant/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        const role = formData.email.includes('merchant') ? 'merchant' : 'user';
        await dispatch(signup(formData.email, formData.name, role, formData.password));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert(error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`
      min-h-screen flex items-center justify-center p-4
      ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-50'}
      transition-colors duration-300
    `}>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`
          absolute top-0 -left-4 w-72 h-72 
          ${isDark ? 'bg-blue-500/10' : 'bg-blue-200/30'}
          rounded-full mix-blend-multiply filter blur-3xl animate-blob
        `} />
        <div className={`
          absolute top-0 -right-4 w-72 h-72 
          ${isDark ? 'bg-purple-500/10' : 'bg-purple-200/30'}
          rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000
        `} />
        <div className={`
          absolute -bottom-8 left-20 w-72 h-72 
          ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-200/30'}
          rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000
        `} />
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Auth Card - 2 Columns */}
      <div className={`
        w-full max-w-6xl rounded-apple-xl overflow-hidden
        ${isDark ? 'bg-[#252526]/90' : 'bg-white/80'}
        backdrop-blur-2xl
        border ${isDark ? 'border-[#3e3e42]' : 'border-black/5'}
        shadow-2xl ${isDark ? 'shadow-black/20' : 'shadow-black/10'}
        animate-slide-up
      `}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Column - Form */}
          <div className="p-8 lg:p-12">
            {/* Logo */}
            <div className="mb-8">
              <h1 className={`
                text-3xl font-grifter tracking-wide mb-2
                ${isDark ? 'text-[#00FFD1]' : 'text-cyan-600'}
              `}>
                SMART
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {isLogin ? 'Welcome back!' : 'Create your account'}
              </p>
            </div>

            {/* Tabs */}
            <div className={`
              flex p-1 rounded-apple mb-6
              ${isDark ? 'bg-white/5' : 'bg-gray-100'}
            `}>
              <button
                onClick={() => setIsLogin(true)}
                className={`
                  flex-1 py-2.5 rounded-apple-sm text-sm font-semibold
                  transition-all duration-200
                  ${isLogin
                    ? isDark
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-blue-500 text-white shadow-lg'
                    : isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-black'
                  }
                `}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`
                  flex-1 py-2.5 rounded-apple-sm text-sm font-semibold
                  transition-all duration-200
                  ${!isLogin
                    ? isDark
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-blue-500 text-white shadow-lg'
                    : isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-black'
                  }
                `}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Name
                  </label>
                  <div className={`
                    flex items-center gap-3 px-4 py-3 rounded-apple
                    ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}
                    focus-within:${isDark ? 'border-cyan-500/50' : 'border-blue-500/50'}
                    transition-colors duration-200
                  `}>
                    <User size={18} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required={!isLogin}
                      className={`
                        flex-1 bg-transparent outline-none text-sm
                        ${isDark ? 'text-white placeholder-gray-500' : 'text-black placeholder-gray-500'}
                      `}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <div className={`
                  flex items-center gap-3 px-4 py-3 rounded-apple
                  ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}
                  focus-within:${isDark ? 'border-cyan-500/50' : 'border-blue-500/50'}
                  transition-colors duration-200
                `}>
                  <Mail size={18} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@test.com"
                    required
                    className={`
                      flex-1 bg-transparent outline-none text-sm
                      ${isDark ? 'text-white placeholder-gray-500' : 'text-black placeholder-gray-500'}
                    `}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Password
                </label>
                <div className={`
                  flex items-center gap-3 px-4 py-3 rounded-apple
                  ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}
                  focus-within:${isDark ? 'border-cyan-500/50' : 'border-blue-500/50'}
                  transition-colors duration-200
                `}>
                  <Lock size={18} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className={`
                      flex-1 bg-transparent outline-none text-sm
                      ${isDark ? 'text-white placeholder-gray-500' : 'text-black placeholder-gray-500'}
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`p-1 rounded-apple-sm ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}
                  >
                    {showPassword ? (
                      <EyeOff size={18} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                    ) : (
                      <Eye size={18} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded accent-blue-500"
                    />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    className={`font-medium ${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-700'}`}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full py-3 rounded-apple font-semibold
                  flex items-center justify-center gap-2
                  ${loading
                    ? isDark
                      ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : isDark
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }
                  active:scale-95 transition-all duration-150
                  shadow-lg ${loading ? '' : 'shadow-blue-500/25'}
                `}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className={`font-semibold ${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className={`
            p-8 lg:p-12
            ${isDark ? 'bg-white/5' : 'bg-gradient-to-br from-cyan-50 to-blue-50'}
            border-l ${isDark ? 'border-[#3e3e42]' : 'border-gray-200'}
          `}>
            {/* Demo Accounts */}
            <div className={`
              p-4 rounded-apple-lg mb-6
              ${isDark ? 'bg-gradient-to-br from-[#00FFD1]/10 to-blue-500/10 border border-[#00FFD1]/20' : 'bg-white/50 border border-cyan-200'}
            `}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#00FFD1]' : 'bg-cyan-500'} animate-pulse`} />
                <p className={`text-xs font-bold ${isDark ? 'text-[#00FFD1]' : 'text-cyan-600'}`}>
                  DEMO ACCOUNTS
                </p>
              </div>
              
              {/* User Account */}
              <div className={`mb-3 p-3 rounded-apple ${isDark ? 'bg-white/5' : 'bg-white/50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <User size={14} className={isDark ? 'text-[#00FFD1]' : 'text-cyan-600'} />
                  <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    User Account
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail size={12} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      user@test.com
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Key size={12} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      password
                    </p>
                  </div>
                </div>
              </div>

              {/* Merchant Account */}
              <div className={`p-3 rounded-apple ${isDark ? 'bg-white/5' : 'bg-white/50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Store size={14} className={isDark ? 'text-[#00FFD1]' : 'text-cyan-600'} />
                  <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Merchant Account
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail size={12} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      merchant@test.com
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Key size={12} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      password
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Login Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, email: 'user@test.com', password: 'password' });
                    setIsLogin(true);
                  }}
                  className={`
                    px-3 py-2 rounded-apple text-xs font-semibold
                    ${isDark ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-white hover:bg-gray-50 text-gray-900'}
                    transition-all duration-150 active:scale-95
                  `}
                >
                  Login as User
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, email: 'merchant@test.com', password: 'password' });
                    setIsLogin(true);
                  }}
                  className={`
                    px-3 py-2 rounded-apple text-xs font-semibold
                    ${isDark ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-white hover:bg-gray-50 text-gray-900'}
                    transition-all duration-150 active:scale-95
                  `}
                >
                  Login as Merchant
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Why Choose SMART?
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-apple ${isDark ? 'bg-[#00FFD1]/10' : 'bg-cyan-100'}`}>
                    <CreditCard size={20} className={isDark ? 'text-[#00FFD1]' : 'text-cyan-600'} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Multi-Payment Support
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Accept crypto, cards, and bank transfers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-apple ${isDark ? 'bg-[#00FFD1]/10' : 'bg-cyan-100'}`}>
                    <Zap size={20} className={isDark ? 'text-[#00FFD1]' : 'text-cyan-600'} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Instant Rewards
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Earn 5% back on every transaction
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-apple ${isDark ? 'bg-[#00FFD1]/10' : 'bg-cyan-100'}`}>
                    <Shield size={20} className={isDark ? 'text-[#00FFD1]' : 'text-cyan-600'} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Bank-Level Security
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Your data is encrypted and protected
                    </p>
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
