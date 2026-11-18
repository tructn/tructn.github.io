import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig: NextConfig = {
    /**
     * Enable static exports.
     *
     * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
     */
    output: "export",

    /**
     * Set base path. This is usually the slug of your repository.
     *
     * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
     */
    basePath: isGithubActions ? "/tructn.github.io" : "",

    /**
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