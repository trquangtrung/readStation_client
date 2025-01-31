/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      padding: {
        sidebar: "250px",
      },
      colors: {
        rtprimary: "#FF7D29",
        orange: {
          50: "#fff6ed",
          100: "#ffebd4",
          200: "#ffd2a8",
          300: "#ffb271",
          400: "#ff7d29",
          500: "#fe6411",
          600: "#ef4a07",
          700: "#c63408",
          800: "#9d2b0f",
          900: "#7e2610",
          950: "#440f06",
        },
        rtgray: {
          50: " #E5E7EB",
          100: "#808089",
        },
        rtyellow: {
          50: "#FEFFD2",
        },
        tag: {
          "bg-01": "#FFFBE5",
          "bg-02": "#E9F4FE",
          "bg-03": "#FFF8ED",
          "bg-04": "#F5E9F7",
          "bg-05": "#E5F4F3",
          "bg-06": "#FEECEB",
          "bg-07": "#F5F5F5",
          "bg-08": "#F8EDE5",
          "bg-09": "#F6FFED",
          "bg-10": "#E5F2FF",
          "bg-11": "#F0F4F9",
          "bg-12": "#ECEEF8",
          "bg-13": "#E5FAF8",
          "bg-14": "#FFF0F7",
          "bg-15": "#F8EFF9",
          "text-01": "#FFD700",
          "text-02": "#2196F3",
          "text-03": "#FFB74D",
          "text-04": "#9C27B0",
          "text-05": "#009688",
          "text-06": "#F44336",
          "text-07": "#9E9E9E",
          "text-08": "#AE9F9B",
          "text-09": "#389E0D",
          "text-10": "#007FFF",
          "text-11": "#698DC5",
          "text-12": "#3F51B5",
          "text-13": "#00CEB6",
          "text-14": "#FF69B4",
          "text-15": "#D85BAA",
        },
      },
      boxShadow: {
        cs_01:
          "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
