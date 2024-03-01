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
        hostname: 'be8lvzzwj1r921za.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
}

export default nextConfig
