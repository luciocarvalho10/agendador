import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    agentUpgrade: 'security',
  },
  images: {
    remotePatterns: [{ hostname: 'utfs.io' }],
  },
};

export default nextConfig;
