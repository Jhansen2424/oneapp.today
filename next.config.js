/** @type {import("next").NextConfig} */
const config = {
  trailingSlash: false,

  images: {
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'oneapp.today',
      },
    ],
  },
};

export default config;
