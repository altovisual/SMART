/**
 * Apple Pay / iOS Design System
 * Professional, clean, and minimal design inspired by Apple
 */

export const colors = {
  light: {
    // Backgrounds
    bg: {
      primary: '#FFFFFF',
      secondary: '#F5F5F7',
      tertiary: '#E8E8ED',
      elevated: '#FFFFFF',
      grouped: '#F2F2F7'
    },
    // Text
    text: {
      primary: '#000000',
      secondary: '#3C3C43',
      tertiary: '#8E8E93',
      quaternary: '#C7C7CC',
      link: '#007AFF'
    },
    // System colors
    system: {
      blue: '#007AFF',
      green: '#34C759',
      indigo: '#5856D6',
      orange: '#FF9500',
      pink: '#FF2D55',
      purple: '#AF52DE',
      red: '#FF3B30',
      teal: '#5AC8FA',
      yellow: '#FFCC00'
    },
    // Fills
    fill: {
      primary: 'rgba(120, 120, 128, 0.2)',
      secondary: 'rgba(120, 120, 128, 0.16)',
      tertiary: 'rgba(118, 118, 128, 0.12)',
      quaternary: 'rgba(116, 116, 128, 0.08)'
    },
    // Borders
    border: 'rgba(0, 0, 0, 0.1)',
    separator: 'rgba(60, 60, 67, 0.29)'
  },
  dark: {
    // Backgrounds
    bg: {
      primary: '#000000',
      secondary: '#1C1C1E',
      tertiary: '#2C2C2E',
      elevated: '#1C1C1E',
      grouped: '#000000'
    },
    // Text
    text: {
      primary: '#FFFFFF',
      secondary: '#EBEBF5',
      tertiary: '#EBEBF5',
      quaternary: '#8E8E93',
      link: '#0A84FF'
    },
    // System colors
    system: {
      blue: '#0A84FF',
      green: '#30D158',
      indigo: '#5E5CE6',
      orange: '#FF9F0A',
      pink: '#FF375F',
      purple: '#BF5AF2',
      red: '#FF453A',
      teal: '#64D2FF',
      yellow: '#FFD60A'
    },
    // Fills
    fill: {
      primary: 'rgba(120, 120, 128, 0.36)',
      secondary: 'rgba(120, 120, 128, 0.32)',
      tertiary: 'rgba(118, 118, 128, 0.24)',
      quaternary: 'rgba(118, 118, 128, 0.18)'
    },
    // Borders
    border: 'rgba(255, 255, 255, 0.1)',
    separator: 'rgba(84, 84, 88, 0.6)'
  }
};

export const typography = {
  // SF Pro Display (fallback to system fonts)
  fontFamily: {
    display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    text: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'ui-monospace, "SF Mono", Monaco, "Cascadia Code", "Courier New", monospace'
  },
  // iOS text styles
  size: {
    largeTitle: '34px',
    title1: '28px',
    title2: '22px',
    title3: '20px',
    headline: '17px',
    body: '17px',
    callout: '16px',
    subheadline: '15px',
    footnote: '13px',
    caption1: '12px',
    caption2: '11px'
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800'
  }
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px'
};

export const borderRadius = {
  none: '0',
  sm: '6px',
  md: '10px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px'
};

export const shadows = {
  light: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.04)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    xl: '0 12px 32px rgba(0, 0, 0, 0.16)'
  },
  dark: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    xl: '0 12px 32px rgba(0, 0, 0, 0.6)'
  }
};

export const transitions = {
  fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  normal: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
};

// iOS-style component classes generator
export const getComponents = (isDark = false) => {
  const theme = isDark ? colors.dark : colors.light;
  
  return {
    // Card (iOS style)
    card: {
      base: `bg-[${theme.bg.elevated}] border border-[${theme.border}] rounded-2xl overflow-hidden`,
      shadow: isDark ? shadows.dark.md : shadows.light.md,
      hover: 'hover:scale-[1.01] active:scale-[0.99] transition-transform duration-200'
    },
    
    // Buttons (iOS style)
    button: {
      primary: `bg-[${theme.system.blue}] text-white font-semibold rounded-xl px-6 py-3 
                active:scale-95 transition-all duration-150 shadow-sm`,
      secondary: `bg-[${theme.fill.secondary}] text-[${theme.text.primary}] font-semibold 
                  rounded-xl px-6 py-3 active:scale-95 transition-all duration-150`,
      tertiary: `text-[${theme.system.blue}] font-semibold px-6 py-3 
                 active:opacity-50 transition-opacity duration-150`,
      destructive: `bg-[${theme.system.red}] text-white font-semibold rounded-xl px-6 py-3 
                    active:scale-95 transition-all duration-150`
    },
    
    // Input (iOS style)
    input: {
      base: `bg-[${theme.fill.tertiary}] border border-[${theme.border}] rounded-xl 
             px-4 py-3 text-[${theme.text.primary}] placeholder-[${theme.text.tertiary}]
             focus:border-[${theme.system.blue}] focus:ring-2 focus:ring-[${theme.system.blue}]/20
             transition-all duration-200`,
      search: `bg-[${theme.fill.secondary}] rounded-xl px-4 py-2 text-[${theme.text.primary}]
               placeholder-[${theme.text.tertiary}] focus:outline-none`
    },
    
    // List items (iOS style)
    listItem: {
      base: `bg-[${theme.bg.elevated}] border-b border-[${theme.separator}] 
             px-4 py-3 active:bg-[${theme.fill.quaternary}] transition-colors duration-150`,
      grouped: `bg-[${theme.bg.elevated}] rounded-xl mb-2 px-4 py-3 
                active:bg-[${theme.fill.quaternary}] transition-colors duration-150`
    },
    
    // Badge (iOS style)
    badge: {
      base: `bg-[${theme.fill.secondary}] text-[${theme.text.secondary}] 
             rounded-full px-3 py-1 text-sm font-medium`,
      colored: (color) => `bg-[${theme.system[color]}]/10 text-[${theme.system[color]}] 
                           rounded-full px-3 py-1 text-sm font-medium`
    },
    
    // Section header (iOS style)
    sectionHeader: `text-[${theme.text.tertiary}] text-xs font-semibold uppercase 
                    tracking-wide px-4 py-2`,
    
    // Divider
    divider: `border-t border-[${theme.separator}]`,
    
    // Toggle/Switch (iOS style)
    toggle: `relative inline-flex h-8 w-14 items-center rounded-full 
             transition-colors duration-200 focus:outline-none focus:ring-2 
             focus:ring-[${theme.system.blue}] focus:ring-offset-2`
  };
};

// Utility functions
export const getThemeClass = (isDark, lightClass, darkClass) => {
  return isDark ? darkClass : lightClass;
};

export const getSystemColor = (isDark, color) => {
  return isDark ? colors.dark.system[color] : colors.light.system[color];
};

// CSS variables for theme switching
export const getCSSVariables = (isDark = false) => {
  const theme = isDark ? colors.dark : colors.light;
  
  return {
    '--bg-primary': theme.bg.primary,
    '--bg-secondary': theme.bg.secondary,
    '--bg-tertiary': theme.bg.tertiary,
    '--bg-elevated': theme.bg.elevated,
    '--text-primary': theme.text.primary,
    '--text-secondary': theme.text.secondary,
    '--text-tertiary': theme.text.tertiary,
    '--system-blue': theme.system.blue,
    '--system-green': theme.system.green,
    '--system-red': theme.system.red,
    '--border': theme.border,
    '--separator': theme.separator,
    '--fill-primary': theme.fill.primary,
    '--fill-secondary': theme.fill.secondary
  };
};
