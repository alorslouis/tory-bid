/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["members-api.parliament.uk"],
  },
};

module.exports = nextConfig;
