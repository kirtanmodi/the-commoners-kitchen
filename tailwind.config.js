// Add to your tailwind.config.js

module.exports = {
  // ...your existing config
  theme: {
    extend: {
      // ...your existing extends
      animation: {
        "float-slow": "float 3s ease-in-out infinite",
        "float-custom": "floatCustom 15s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatCustom: {
          "0%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-15px) translateX(10px)" },
          "50%": { transform: "translateY(0) translateX(20px)" },
          "75%": { transform: "translateY(15px) translateX(10px)" },
          "100%": { transform: "translateY(0) translateX(0)" },
        },
      },
    },
  },
};
