
import type { Config } from "tailwindcss";

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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// GoreFX Horror Palette
				'gore-black': '#0A0A0A',
				'gore-steel': '#1C1C1C',
				'gore-accent': '#5C5C5C',
				'gore-red': '#8B0000',
				'gore-text': '#F4F4F4',
				'gore-rust': '#A0522D',
				'gore-warning': '#FF4500',
				
				// Shadcn theme overrides
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-red': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.3'
					}
				},
				'flicker': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					},
					'75%': {
						opacity: '0.9'
					}
				},
				'glitch': {
					'0%': {
						transform: 'translate(0)'
					},
					'20%': {
						transform: 'translate(-2px, 2px)'
					},
					'40%': {
						transform: 'translate(-2px, -2px)'
					},
					'60%': {
						transform: 'translate(2px, 2px)'
					},
					'80%': {
						transform: 'translate(2px, -2px)'
					},
					'100%': {
						transform: 'translate(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-red': 'pulse-red 2s ease-in-out infinite',
				'flicker': 'flicker 0.15s ease-in-out infinite alternate',
				'glitch': 'glitch 0.3s ease-in-out infinite'
			},
			fontFamily: {
				'horror': ['Inter Tight', 'system-ui', 'sans-serif'],
				'display': ['Orbitron', 'monospace']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
