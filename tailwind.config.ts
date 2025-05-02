
import { type Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Midnight Theme - Enhanced for a more elegant dark blue/purple look
        midnight: {
          primary: "#0f1642",
          secondary: "#1a2151",
          accent: "#a78bfa",
          text: "#f3f4f6",
          gradient: "linear-gradient(135deg, #0f1642 0%, #2d3270 100%)",
        },
        // Ocean Theme - Enhanced with richer blues and cyan accents
        ocean: {
          primary: "#003366",
          secondary: "#0e639c",
          accent: "#60d7f8",
          text: "#f0f9ff",
          gradient: "linear-gradient(135deg, #003366 0%, #0e639c 100%)",
        },
        // Sunset Theme - Enhanced with warmer red and orange palette
        sunset: {
          primary: "#7c2d12",
          secondary: "#9a3412",
          accent: "#fbbf24",
          text: "#fef2f2",
          gradient: "linear-gradient(135deg, #7c2d12 0%, #b45309 100%)",
        },
        // Forest Theme - Enhanced with deeper greens and emerald accents
        forest: {
          primary: "#064e3b",
          secondary: "#065f46",
          accent: "#6ee7b7",
          text: "#ecfdf5",
          gradient: "linear-gradient(135deg, #064e3b 0%, #047857 100%)",
        },
        // Candy Theme - Enhanced with vibrant purple and pink gradient
        candy: {
          primary: "#7e22ce",
          secondary: "#9333ea",
          accent: "#f9a8d4",
          text: "#fdf2f8",
          gradient: "linear-gradient(135deg, #7e22ce 0%, #c026d3 100%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-top": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" }
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" }
        },
        "color-shift": {
          "0%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(15deg)" },
          "100%": { filter: "hue-rotate(0deg)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-top": "slide-in-top 0.3s ease-out",
        "bounce-subtle": "bounce-subtle 2s infinite ease-in-out",
        "glow-pulse": "glow-pulse 3s infinite ease-in-out",
        "color-shift": "color-shift 8s infinite ease-in-out"
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(255, 255, 255, 0.3)',
        'glow-md': '0 0 15px rgba(255, 255, 255, 0.4)',
        'glow-lg': '0 0 25px rgba(255, 255, 255, 0.5)',
      },
      backgroundImage: {
        'midnight-gradient': 'linear-gradient(135deg, #0f1642 0%, #2d3270 100%)',
        'ocean-gradient': 'linear-gradient(135deg, #003366 0%, #0e639c 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #7c2d12 0%, #b45309 100%)',
        'forest-gradient': 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
        'candy-gradient': 'linear-gradient(135deg, #7e22ce 0%, #c026d3 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
