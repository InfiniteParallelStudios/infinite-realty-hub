export interface Theme {
  colors: {
    // Primary Colors (Archon-inspired)
    primary: string;
    primaryDark: string;
    primaryLight: string;
    
    // Secondary Colors
    secondary: string;
    secondaryDark: string;
    secondaryLight: string;
    
    // Background Colors
    background: string;
    backgroundSecondary: string;
    surface: string;
    surfaceSecondary: string;
    
    // Text Colors
    text: string;
    textSecondary: string;
    textMuted: string;
    
    // UI Colors
    border: string;
    borderLight: string;
    shadow: string;
    
    // Status Colors
    success: string;
    warning: string;
    error: string;
    info: string;
    
    // Tab Navigation
    tabActive: string;
    tabInactive: string;
    tabBackground: string;
    
    // Card Colors
    cardBackground: string;
    cardBorder: string;
  };
  
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  
  typography: {
    fontSizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
      xxxl: number;
    };
    fontWeights: {
      normal: '400' | 'normal';
      medium: '500' | 'medium';
      semibold: '600' | 'semibold';
      bold: '700' | 'bold';
    };
    lineHeights: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

const baseTheme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    fontWeights: {
      normal: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  shadows: {
    sm: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0px 10px 15px rgba(0, 0, 0, 0.1)',
  },
};

// Archon-inspired Light Theme
export const lightTheme: Theme = {
  ...baseTheme,
  colors: {
    // Primary Colors - Archon's signature blue/purple gradient tones
    primary: '#6366F1', // Indigo-500 (similar to Archon's primary)
    primaryDark: '#4F46E5', // Indigo-600
    primaryLight: '#A5B4FC', // Indigo-300
    
    // Secondary Colors - Complementary purple/violet
    secondary: '#8B5CF6', // Violet-500
    secondaryDark: '#7C3AED', // Violet-600
    secondaryLight: '#C4B5FD', // Violet-300
    
    // Background Colors
    background: '#FFFFFF',
    backgroundSecondary: '#F8FAFC', // Slate-50
    surface: '#FFFFFF',
    surfaceSecondary: '#F1F5F9', // Slate-100
    
    // Text Colors
    text: '#1E293B', // Slate-800
    textSecondary: '#475569', // Slate-600
    textMuted: '#94A3B8', // Slate-400
    
    // UI Colors
    border: '#E2E8F0', // Slate-200
    borderLight: '#F1F5F9', // Slate-100
    shadow: 'rgba(0, 0, 0, 0.1)',
    
    // Status Colors
    success: '#10B981', // Emerald-500
    warning: '#F59E0B', // Amber-500
    error: '#EF4444', // Red-500
    info: '#3B82F6', // Blue-500
    
    // Tab Navigation
    tabActive: '#6366F1',
    tabInactive: '#94A3B8',
    tabBackground: 'rgba(255, 255, 255, 0.95)',
    
    // Card Colors
    cardBackground: '#FFFFFF',
    cardBorder: '#E2E8F0',
  },
};

// Archon-inspired Dark Theme (matching Archon dashboard exactly)
export const darkTheme: Theme = {
  ...baseTheme,
  colors: {
    // Primary Colors - Archon's exact purple/indigo tones
    primary: '#8B5CF6', // Purple-500 (Archon's main accent)
    primaryDark: '#7C3AED', // Purple-600
    primaryLight: '#A78BFA', // Purple-400
    
    // Secondary Colors - Archon's blue accents
    secondary: '#6366F1', // Indigo-500
    secondaryDark: '#4F46E5', // Indigo-600
    secondaryLight: '#818CF8', // Indigo-400
    
    // Background Colors - Archon's deep gradient background
    background: '#0A0A0F', // Very deep dark purple-black
    backgroundSecondary: '#111827', // Dark blue-grey
    surface: 'rgba(30, 41, 59, 0.6)', // Semi-transparent surface with blue tint
    surfaceSecondary: 'rgba(51, 65, 85, 0.8)', // Elevated surfaces
    
    // Text Colors - High contrast for readability
    text: '#FFFFFF', // Pure white
    textSecondary: '#E5E7EB', // Very light grey
    textMuted: '#9CA3AF', // Medium grey
    
    // UI Colors - Subtle borders and shadows
    border: 'rgba(139, 92, 246, 0.2)', // Purple tinted border
    borderLight: 'rgba(139, 92, 246, 0.1)', // Lighter purple border
    shadow: 'rgba(139, 92, 246, 0.2)', // Purple glow shadow
    
    // Status Colors - Bright and vibrant
    success: '#10B981', // Emerald-500
    warning: '#F59E0B', // Amber-500
    error: '#EF4444', // Red-500
    info: '#3B82F6', // Blue-500
    
    // Tab Navigation - Match the gradient theme
    tabActive: '#8B5CF6',
    tabInactive: '#6B7280',
    tabBackground: 'rgba(10, 10, 15, 0.95)', // Deep background with transparency
    
    // Card Colors - Semi-transparent with purple glow
    cardBackground: 'rgba(30, 41, 59, 0.4)',
    cardBorder: 'rgba(139, 92, 246, 0.3)',
  },
};

export type ThemeMode = 'light' | 'dark';