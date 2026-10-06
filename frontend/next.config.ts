import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // GitHub Pages serves the site from /<repo>/, not the domain root.
  // Set NEXT_PUBLIC_BASE_PATH=/<repo-name> when building for Pages
  // (the CI workflow does this automatically). Empty when hosting at root.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;