import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      background: '#202733',
      dark_grayish_blue: '#313A48',
      grayish_blue: '#4F5D74',
      primary: '#53FFAA',
      lightcyan: '#CEE3E9',
    },
    screens: {
      tablet: '600px',
    },
    boxShadow: {
      button_hover: '0px 0px 40px 0px #53FFAA',
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
export default config
