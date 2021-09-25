/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
};

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },

  // other next config
  ...baseConfig,
});
