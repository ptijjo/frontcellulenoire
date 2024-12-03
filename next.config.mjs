/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080', // Remplacez par le port utilisé par votre backend
        pathname: '/public/avatar/**', // Facultatif, pour limiter aux avatars
      },
      {
        protocol: 'https',
        hostname: 'vibz.s3.eu-central-1.amazonaws.com',
        pathname: '/logo/**', // Facultatif, pour limiter les chemins
      },

    ],
  },
};

export default nextConfig;
