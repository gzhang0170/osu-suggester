/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5328/api/:path*',  
      },
    ];
  },
};

const nextConfig = {
  experimental: {
    outputFileTracingExcludes: {
      "api/**": [
        '.next',
        '.cache',
        'node_modules',
        'public',
        'app',
      ],
    },
  },
};

module.exports = nextConfig;