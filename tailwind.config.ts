import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
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
          DEFAULT: "rgba(87, 233, 163, 1)",
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
        gray: {
          DEFAULT: "#363636",
          foreground: "hsl(var(--forestGreen-foreground))",
        },
        silver: {
          DEFAULT: "#696969",
          foreground: "hsl(var(--charcoal-foreground))",
        },
        slate: {
          DEFAULT: "#171717",
          foreground: "hsl(var(--forestGreen-foreground))",
        },
        white: {
          DEFAULT: "#EEEEEE",
          foreground: "hsl(var(--pine-foreground))",
        },
        hunterGreen: {
          DEFAULT: "#162D25",
          foreground: "hsl(var(--hunterGreen-foreground))",
        },
        olive: {
          DEFAULT: "#0E1A16",
          foreground: "hsl(var(--olive-foreground))",
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
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-out",
        fadeOut: "fadeOut 0.5s ease-out",
      },
      boxShadow: {
        "custom-green": "0px 0px 28.4px 0px rgba(87, 233, 163, 0.16)",
      },
      backgroundImage: {
        "gradient-green":
          "linear-gradient(91.45deg, #57E9A3 1.23%, rgba(87, 233, 163, 0) 147.68%)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Your existing animation plugin
    plugin(function ({ addUtilities }) {
      addUtilities(
        {
          ".gradient-text": {
            backgroundImage:
              "linear-gradient(45deg, rgba(87, 233, 163, 1) -10%, #171717 30%, #00523D 60%, #171717 80%)",
            backgroundClip: "text",
            webkitBackgroundClip: "text",
            color: "transparent",
            webkitTextFillColor: "transparent",
          },
        },
        {
          respectPrefix: false,
          respectImportant: false,
        }
      ); // This second argument adds these styles to responsive and hover variants if needed
    }),
  ],
} satisfies Config;

export default config;
