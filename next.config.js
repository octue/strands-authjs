/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.cloud.google.com'],
  },
}

module.exports = nextConfig
