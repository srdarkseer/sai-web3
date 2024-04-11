/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    loader: process.env.NODE_ENV === "production" ? "custom" : "default",
    // Specify the loaderFile only if the custom loader is used
    loaderFile:
      process.env.NODE_ENV === "production"
        ? "./src/utils/images/loader.ts"
        : undefined,
  },
};

export default nextConfig;
