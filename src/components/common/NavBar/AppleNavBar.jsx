import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { supabase } from "../../../supabaseClient";
import store from "../../../redux/store";
import { logout } from "../../../redux/auth/actions";
import { User, LogOut, Settings, CreditCard, Search } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import ThemeToggle from "../ThemeToggle";

export default function AppleNavBar() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    store.dispatch(logout());
    await supabase.auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`
      sticky top-0 z-50 px-4 sm:px-6 pt-4 pb-4
      ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-50'}
      transition-colors duration-300
    `}>
      <nav className={`
        max-w-7xl mx-auto
        ${isDark 
          ? 'bg-[#252526]/95' 
          : 'bg-white/95'
        }
        backdrop-blur-2xl
        rounded-apple-lg
        border ${isDark ? 'border-white/10' : 'border-black/5'}
        shadow-lg ${isDark ? 'shadow-black/20' : 'shadow-black/5'}
        transition-all duration-300
      `}>
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo Original SMART */}
          <div 
            onClick={() => navigate("/dashboard")}
            className="flex items-center cursor-pointer group"
          >
            <h1 className={`
              text-2xl font-grifter tracking-wide
              ${isDark ? 'text-[#00FFD1]' : 'text-cyan-600'}
              group-hover:text-[#00FFD1] transition-colors duration-200
            `}>
              SMART
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink 
              to="/dashboard" 
              label="Dashboard" 
              isDark={isDark}
              navigate={navigate}
            />
            <NavLink 
              to="/checkout" 
              label="Checkout" 
              isDark={isDark}
              navigate={navigate}
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            
            {/* Search Bar - iOS Style */}
            <div className={`
              hidden md:flex items-center gap-2 px-3 py-1.5 rounded-apple-sm
              transition-all duration-200
              ${isDark 
                ? searchFocused
                  ? 'bg-white/10'
                  : 'bg-white/5'
                : searchFocused
                  ? 'bg-gray-100'
                  : 'bg-gray-50'
              }
            `}>
              <Search 
                size={16} 
                className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`} 
              />
              <input
                type="text"
                placeholder="Search"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`
                  w-32 lg:w-40 bg-transparent outline-none text-sm
                  ${isDark ? 'text-white placeholder-gray-500' : 'text-black placeholder-gray-500'}
                `}
              />
            </div>
            
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`
                  flex items-center gap-2 px-2 sm:px-3 py-2 rounded-apple
                  ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}
                  active:scale-95 transition-all duration-150
                `}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${isDark ? 'bg-blue-600' : 'bg-blue-500'}
                `}>
                  <User size={16} className="text-white" />
                </div>
                <span className={`
                  hidden lg:block text-sm font-medium
                  ${isDark ? 'text-white' : 'text-black'}
                `}>
                  {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                </span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className={`
                  absolute right-0 mt-2 w-56 rounded-apple-lg overflow-hidden
                  ${isDark ? 'bg-[#2C2C2E]' : 'bg-white'}
                  border ${isDark ? 'border-white/10' : 'border-black/5'}
                  shadow-xl animate-slide-up
                `}>
                  <div className={`
                    px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-gray-100'}
                  `}>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                      {user?.user_metadata?.name || 'User'}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {user?.email}
                    </p>
                  </div>

                  <div className="py-2">
                    <DropdownItem
                      icon={CreditCard}
                      label="Payments"
                      onClick={() => {
                        navigate('/checkout');
                        setDropdownOpen(false);
                      }}
                      isDark={isDark}
                    />
                    <DropdownItem
                      icon={Settings}
                      label="Settings"
                      onClick={() => setDropdownOpen(false)}
                      isDark={isDark}
                    />
                  </div>

                  <div className={`
                    border-t ${isDark ? 'border-white/10' : 'border-gray-100'}
                    py-2
                  `}>
                    <DropdownItem
                      icon={LogOut}
                      label="Sign Out"
                      onClick={handleLogout}
                      isDark={isDark}
                      danger
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </nav>
    </div>
  );
}

// Nav Link Component
function NavLink({ to, label, isDark, navigate }) {
  const isActive = window.location.pathname === to;
  
  return (
    <button
      onClick={() => navigate(to)}
      className={`
        px-4 py-2 rounded-apple-sm text-sm font-medium
        transition-all duration-150
        ${isActive
          ? isDark
            ? 'bg-white/10 text-white'
            : 'bg-gray-100 text-black'
          : isDark
            ? 'text-gray-400 hover:text-white hover:bg-white/5'
            : 'text-gray-600 hover:text-black hover:bg-gray-50'
        }
        active:scale-95
      `}
    >
      {label}
    </button>
  );
}

// Dropdown Item Component
function DropdownItem({ icon: Icon, label, onClick, isDark, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-2.5
        ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}
        active:bg-gray-100 dark:active:bg-white/10
        transition-colors duration-150
        ${danger 
          ? 'text-red-500' 
          : isDark ? 'text-white' : 'text-black'
        }
      `}
    >
      <Icon size={18} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
