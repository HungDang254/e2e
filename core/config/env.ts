import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  ENV: z.enum(['dev', 'staging', 'prod']).default('dev'),
  RUN_PROFILE: z.enum(['pr', 'nightly', 'release']).default('pr'),

  BASE_URL: z.string().url(),
  API_URL: z.string().url(),

  HEADLESS: z
    .string()
    .optional()
    .transform((v) => (v ? v.toLowerCase() === 'true' : true))
    .default(true),

  PW_WORKERS: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined)),

  PW_RETRIES: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined)),

  CI: z
    .string()
    .optional()
    .transform((v) => (v ? v.toLowerCase() === 'true' : false))
    .default(false)
});

export type Env = z.infer<typeof EnvSchema>;

export function getEnv(): Env {
  const parsed = EnvSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('Invalid environment variables:');
    console.error(parsed.error.format());
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}
