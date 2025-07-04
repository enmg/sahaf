import { z } from 'zod';

import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
    server: {
        APP_NAME: z.string().min(1),
        APP_DESCRIPTION: z.string().min(1),
        API_BASE_URL: z.string().min(1),
        API_TOKEN: z.string().min(1),
        GOOGLE_SITE_VERIFICATION: z.string().optional(),
        YANDEX_VERIFICATION: z.string().optional(),
    },
    client: {},
    runtimeEnv: {
        APP_DESCRIPTION: process.env.APP_DESCRIPTION,
        APP_NAME: process.env.APP_NAME,
        API_BASE_URL: process.env.API_BASE_URL,
        API_TOKEN: process.env.API_TOKEN,
        GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
        YANDEX_VERIFICATION: process.env.YANDEX_VERIFICATION,
    },
});
