/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    REACT_APP_API_HOST: process.env.REACT_APP_API_HOST,
  },
};

module.exports = nextConfig;

// module.exports = {
//   nextConfig,
//   env: {
//     // declare here all your variables
//     // BASE_URL: process.env.BASE_URL,
//   },
// };
