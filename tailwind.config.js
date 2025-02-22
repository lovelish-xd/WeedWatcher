/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        top: "0px -4px 10px rgba(0, 0, 0, 0.2)",
    },
  },
  plugins: [],
}
};
