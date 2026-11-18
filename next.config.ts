import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /**
     * Enable static exports.
     *
     * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
     */
    output: "export",

    /**
     * No basePath: this is the user site, served from the domain root.
     *
     * Write /framelet-app/privacy/index.html rather than privacy.html, so
     * the URLs with a trailing slash given to App Store Connect resolve.
     */
    trailingSlash: true,

    /**
     * Disable server-based image optimization. Next.js does not support
     * dynamic features with static exports.
     *
     * @see https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
     */
    images: {
        unoptimized: true,
    },
};

export default nextConfig;