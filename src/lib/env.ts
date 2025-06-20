import { z } from 'zod';

import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
	server: {
		API_BASE_URL: z.string().min(1),
		API_TOKEN: z.string().min(1),
	},
	client: {},
	runtimeEnv: {
		API_BASE_URL: process.env.API_BASE_URL,
		API_TOKEN: process.env.API_TOKEN,
	},
});
