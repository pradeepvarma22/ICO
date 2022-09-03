/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.thesun.co.uk', 'thumbor.forbes.com'],
  }
}

module.exports = nextConfig
