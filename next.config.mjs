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
}

export default nextConfig
