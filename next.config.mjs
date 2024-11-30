/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://15.165.237.161:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
