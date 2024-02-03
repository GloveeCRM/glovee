/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/templates',
        permanent: true,
      },
    ]
  },
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
