/**
 * SmartPay Design System
 * Consistent styling across the entire app
 */

export const borderRadius = {
  none: '0',
  sm: '0.5rem',      // 8px
  md: '0.75rem',     // 12px
  lg: '1rem',        // 16px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '2rem',     // 32px
  full: '9999px'     // Fully rounded
};

export const glassmorphism = {
  light: 'bg-white/5 backdrop-blur-xl border border-white/10',
  medium: 'bg-white/10 backdrop-blur-xl border border-white/20',
  dark: 'bg-black/20 backdrop-blur-xl border border-white/10',
  card: 'bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10'
};

export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  glow: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
  glowCyan: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]'
};

export const gradients = {
  primary: 'bg-gradient-to-r from-violet-600 to-indigo-600',
  secondary: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  success: 'bg-gradient-to-r from-green-500 to-emerald-500',
  danger: 'bg-gradient-to-r from-red-500 to-pink-500',
  card: 'bg-gradient-to-br from-violet-500/10 to-cyan-500/10'
};

export const transitions = {
  fast: 'transition-all duration-150 ease-in-out',
  normal: 'transition-all duration-300 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out'
};

// Standard component classes
export const components = {
  card: `${glassmorphism.card} ${borderRadius['2xl']} p-6 ${transitions.normal} hover:scale-[1.02]`,
  button: {
    primary: `${gradients.primary} ${borderRadius.xl} px-6 py-3 font-semibold ${transitions.normal} hover:scale-105 ${shadows.glow}`,
    secondary: `${glassmorphism.medium} ${borderRadius.xl} px-6 py-3 font-semibold ${transitions.normal} hover:bg-white/20`,
    ghost: `${borderRadius.xl} px-6 py-3 font-semibold ${transitions.normal} hover:bg-white/10`
  },
  input: `${glassmorphism.light} ${borderRadius.xl} px-4 py-3 ${transitions.normal} focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20`,
  badge: `${glassmorphism.medium} ${borderRadius.full} px-3 py-1 text-sm font-medium`
};
