import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;

    if (!adminUrl) return [];

    return [
      {
        source: '/api/:path*',
        destination: `${adminUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;