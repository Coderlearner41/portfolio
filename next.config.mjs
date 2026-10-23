/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/experience", destination: "/#experience", permanent: true },
      { source: "/por", destination: "/#leadership", permanent: true },
      { source: "/search", destination: "/playground", permanent: true },
    ]
  },
}

export default nextConfig
