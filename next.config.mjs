/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_AMAZON_S3],
  },
};

export default nextConfig;