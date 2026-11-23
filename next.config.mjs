/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://api.cellulenoire.fr https://vibz.s3.eu-central-1.amazonaws.com https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://api.cellulenoire.fr https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(isProd
    ? [
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "Content-Security-Policy", value: contentSecurityPolicy },
      ]
    : []),
];

const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    // Sans sharp : next/image sert les images telles quelles (pas d'opti serveur)
    unoptimized: true,
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
      {
        protocol: 'https',
        hostname: 'api.cellulenoire.fr',
        pathname: '/public/avatar/**', // Facultatif, pour limiter aux avatars
      }

    ],
  },
};

export default nextConfig;
