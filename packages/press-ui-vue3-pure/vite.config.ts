import { getViteBaseConfig } from 'plugin-light/lib/vite-config';

import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';


// @ts-ignore
export default defineConfig(({ mode }) => getViteBaseConfig({ mode }) as UserConfig);
