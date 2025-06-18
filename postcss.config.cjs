// postcss.config.cjs
module.exports = {
  plugins: {
    // si tu veux du nesting CSS :
    "postcss-nesting": {},

    // **le** plugin Tailwind pour PostCSS v4
    "@tailwindcss/postcss": {},

    // autoprefixer
    autoprefixer: {},
  },
};
