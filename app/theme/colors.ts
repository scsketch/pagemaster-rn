export const colors = {
  // Primary brand color - Deep blue that's professional and accessible
  primary: '#2563EB', // WCAG AA compliant with white text

  // Background colors
  background: '#FFFFFF',
  surface: '#F8FAFC', // Light gray for secondary surfaces

  // Text colors with proper contrast ratios
  text: {
    primary: '#1E293B', // Dark slate for primary text (WCAG AAA)
    secondary: '#475569', // Slate for secondary text (WCAG AA)
    error: '#DC2626', // Red for errors (WCAG AA)
    inverse: '#FFFFFF', // White text for dark backgrounds
  },

  // Border colors
  border: {
    light: '#E2E8F0', // Light gray for subtle borders
    medium: '#CBD5E1', // Medium gray for more visible borders
  },

  // Input colors
  input: {
    background: '#F1F5F9', // Light gray for input backgrounds
    focus: '#2563EB', // Primary color for focus states
  },

  // Button colors
  button: {
    primary: '#2563EB', // Primary button color
    secondary: '#F1F5F9', // Secondary button background
    disabled: '#94A3B8', // Disabled state color (WCAG AA)
    hover: '#1D4ED8', // Darker shade for hover states
  },

  // Status colors
  status: {
    success: '#059669', // Green for success states (WCAG AA)
    warning: '#D97706', // Orange for warnings (WCAG AA)
    error: '#DC2626', // Red for errors (WCAG AA)
    info: '#2563EB', // Blue for info (WCAG AA)
  },
} as const;
