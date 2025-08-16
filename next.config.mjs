/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence warnings
  // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination:
          'https://api.farcaster.xyz/miniapps/hosted-manifest/0198b546-324e-6bae-4898-564254ac393f',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
