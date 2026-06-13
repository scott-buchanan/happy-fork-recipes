import type { Config } from 'tailwindcss';
import { primary, secondary } from './src/theme/colours';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: primary,
        secondary: secondary,
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
export default config;
