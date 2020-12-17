const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'],
        });

        return config;
    },
    async headers() {
        return [
            {
                source: '/:path*/',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                ],
            },
        ];
    },
    images: {
        deviceSizes: [420, 768, 1024, 1560],
        domains: ['firebasestorage.googleapis.com', 'graph.facebook.com'],
    },
};

module.exports = withPlugins(
    [
        [
            optimizedImages,
            {
                /* config for next-optimized-images */
            },
        ],
    ],
    nextConfig
);
