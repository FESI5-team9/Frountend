/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_AMAZON_S3, // S3 도메인을 환경 변수에서 가져옵니다.
        pathname: "/**", // 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
