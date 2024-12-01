/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://13.209.31.208:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
