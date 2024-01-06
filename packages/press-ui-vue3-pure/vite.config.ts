import { getViteBaseConfig } from 'plugin-light/lib/vite-config';

import { defineConfig, type UserConfig } from 'vite';

export default defineConfig(({ mode }) => getViteBaseConfig({ mode }) as UserConfig);
