/** @type {import('next').NextConfig} */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.punycode = require.resolve('punycode/');
    return config;
  },
};

export default nextConfig;
