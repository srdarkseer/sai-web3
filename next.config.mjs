/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    MORALIS_API_KEY: process.env.MORALIS_API_KEY,
  },
  // images: {
  //   loader: process.env.NODE_ENV === "production" ? "custom" : "default",
  //   // Specify the loaderFile only if the custom loader is used
  //   loaderFile:
  //     process.env.NODE_ENV === "production"
  //       ? "./src/utils/images/loader.ts"
  //       : undefined,
  // },
};

export default nextConfig;
