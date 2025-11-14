import AppleNavBar from "../components/common/NavBar/AppleNavBar";
import AnimatedBackground from "../components/common/AnimatedBackground";
import { useTheme } from "../contexts/ThemeContext";

export default function MainLayout({ children }) {
  const { isDark } = useTheme();
  
  return (
    <div className={`
      min-h-screen relative
      ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-50'}
      transition-colors duration-300
    `}>
      <AnimatedBackground />
      <AppleNavBar />
      <main className="scrollbar-ios relative z-10">
        {children}
      </main>
    </div>
  );
}
