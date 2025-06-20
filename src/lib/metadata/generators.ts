import { Metadata } from 'next';
import { getBaseUrl } from '../utils/urls';
import { env } from '../env';

export async function generateSiteMetadata(): Promise<Metadata> {
    const baseUrl = getBaseUrl();

    const imageData = {
        images: [{ url: baseUrl + '/api/og' }],
    };

    return {
        metadataBase: new URL(baseUrl),
        generator: 'Nitrokit',
        applicationName: env.APP_NAME,
        referrer: 'origin-when-cross-origin',
        creator: '',
        publisher: '',
        appleWebApp: {
            statusBarStyle: 'black-translucent',
            title: env.APP_NAME,
            capable: true,
            startupImage: [
                {
                    url: `${baseUrl}/images/apple-touch-startup-image.png`,
                    media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
                },
            ],
        },
        title: {
            default: env.APP_NAME,
            template: `%s - ${env.APP_NAME}`,
        },
        description: env.APP_DESCRIPTION,

        icons: {
            icon: `${baseUrl}/favicon.ico`,
        },
        openGraph: {
            title: env.APP_NAME,
            description: env.APP_DESCRIPTION,
            url: baseUrl,
            siteName: env.APP_NAME,
            ...imageData,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export type PageMetaDataProps = Promise<{ title: string; description: string }>;

export async function generatePageMetadata({
    params,
}: {
    params: PageMetaDataProps;
}): Promise<Metadata> {
    const { title, description } = await params;

    const baseMetadata = {
        title: title,
        description: description,
    };

    return {
        ...baseMetadata,
    };
}
