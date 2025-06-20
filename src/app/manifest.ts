import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/utils/urls';
import { env } from '@/lib';
export default async function manifest(): Promise<MetadataRoute.Manifest> {
    const baseUrl = getBaseUrl();

    return {
        name: env.APP_NAME,
        short_name: env.APP_NAME,
        description: env.APP_DESCRIPTION,
        start_url: `${baseUrl}/`,
        display: 'standalone',
        scope: baseUrl,
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#6FBDFF',
        icons: [
            {
                src: `${baseUrl}/favicon/android-chrome-192x192.png`,
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: `${baseUrl}/favicon/android-chrome-512x512.png`,
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
