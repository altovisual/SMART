import { useTheme } from "../../contexts/ThemeContext";

export default function AnimatedBackground() {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <div className={`
        absolute top-0 -left-4 w-72 h-72 
        ${isDark 
          ? 'bg-purple-500/10' 
          : 'bg-purple-200/30'
        }
        rounded-full mix-blend-multiply filter blur-3xl
        animate-blob
      `} />
      
      <div className={`
        absolute top-0 -right-4 w-72 h-72 
        ${isDark 
          ? 'bg-cyan-500/10' 
          : 'bg-cyan-200/30'
        }
        rounded-full mix-blend-multiply filter blur-3xl
        animate-blob animation-delay-2000
      `} />
      
      <div className={`
        absolute -bottom-8 left-20 w-72 h-72 
        ${isDark 
          ? 'bg-pink-500/10' 
          : 'bg-pink-200/30'
        }
        rounded-full mix-blend-multiply filter blur-3xl
        animate-blob animation-delay-4000
      `} />

      <div className={`
        absolute bottom-20 right-20 w-72 h-72 
        ${isDark 
          ? 'bg-blue-500/10' 
          : 'bg-blue-200/30'
        }
        rounded-full mix-blend-multiply filter blur-3xl
        animate-blob animation-delay-6000
      `} />

      {/* Mesh Gradient Overlay */}
      <div className={`
        absolute inset-0
        ${isDark
          ? 'bg-gradient-to-br from-transparent via-purple-500/5 to-transparent'
          : 'bg-gradient-to-br from-transparent via-blue-100/20 to-transparent'
        }
        animate-gradient
      `} />
    </div>
  );
}
