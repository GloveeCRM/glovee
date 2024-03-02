/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/privacy-policy',
        destination: '/html/privacy-policy.html',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_BLOB_HOST || 'default',
        port: '',
      },
    ],
  },
}

export default nextConfig
