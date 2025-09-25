const { createNextConfig } = require('next')

const nextConfig = createNextConfig({
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
})

module.exports = nextConfig
