// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  theme: {},
  variants: { borderColor: ["responsive", "hover", "focus", "active"], borderWidth: ["responsive", "hover", "focus", "active"] },
  // https://github.com/tailwindcss/custom-forms
  plugins: [require("@tailwindcss/custom-forms")]
};
