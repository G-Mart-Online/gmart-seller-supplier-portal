/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "example.com",
      "img.freepik.com",
      "images.pexels.com",
      "firebasestorage.googleapis.com",
    ], // Add your external image host here
  },
};

export default nextConfig;
