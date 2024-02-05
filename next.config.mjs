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
}

export default nextConfig
