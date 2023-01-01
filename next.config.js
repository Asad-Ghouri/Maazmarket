/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// module.exports = nextConfig
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gateway.ipfscdn.io',
        port: '',
        pathname: 'ipfs/QmdgfdDRN5seYokExKThQkuerQTsY3qy4wZsxRMSEbLBmb/**',
      },
    ],
  },
}