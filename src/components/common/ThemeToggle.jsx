import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full
                 bg-white/10 dark:bg-white/10 backdrop-blur-xl
                 border border-black/10 dark:border-white/10
                 hover:bg-white/20 dark:hover:bg-white/20
                 active:scale-95 transition-all duration-200
                 shadow-sm"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        {/* Sun icon (light mode) */}
        <Sun
          size={20}
          className={`absolute inset-0 transition-all duration-300 ${
            isDark
              ? 'opacity-0 rotate-90 scale-0'
              : 'opacity-100 rotate-0 scale-100'
          } text-gray-900`}
        />
        
        {/* Moon icon (dark mode) */}
        <Moon
          size={20}
          className={`absolute inset-0 transition-all duration-300 ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          } text-white`}
        />
      </div>
    </button>
  );
}
