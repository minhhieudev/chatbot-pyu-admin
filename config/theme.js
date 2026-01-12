// SSE Theme Configuration - Professional Color System

export const sseTheme = {
  // Brand Colors
  brand: {
    primary: "#1e40af", // Deep Blue
    secondary: "#7c3aed", // Purple
    accent: "#f59e0b", // Amber
  },

  // Status Colors
  status: {
    success: "#10b981", // Emerald
    warning: "#f59e0b", // Amber
    error: "#ef4444", // Red
    info: "#3b82f6", // Blue
  },

  // Workflow Colors
  workflow: {
    sales: "#3b82f6", // Blue
    pickup: "#8b5cf6", // Purple
    warehouse: "#f59e0b", // Amber
    payment: "#10b981", // Green
    documentation: "#06b6d4", // Cyan
    completed: "#6b7280", // Gray
  },

  // Background Colors
  background: {
    primary: "#ffffff",
    secondary: "#f8fafc",
    tertiary: "#f1f5f9",
    dark: "#0f172a",
  },

  // Text Colors
  text: {
    primary: "#0f172a",
    secondary: "#475569",
    tertiary: "#94a3b8",
    inverse: "#ffffff",
  },

  // Border & Shadow
  border: {
    light: "#e2e8f0",
    DEFAULT: "#cbd5e1",
    dark: "#94a3b8",
  },

  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  // Spacing
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
  },

  // Border Radius
  radius: {
    sm: "0.375rem",
    DEFAULT: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },
};

// Gradient Backgrounds
export const gradients = {
  primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  success: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  warning: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  error: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  blue: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  purple: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
  ocean: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
};

// Card Styles
export const cardStyles = {
  default: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
    borderRadius: "1rem",
  },
  elevated: {
    background: "#ffffff",
    border: "none",
    shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    borderRadius: "1rem",
  },
  glass: {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    shadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
    borderRadius: "1rem",
  },
};

export default sseTheme;
