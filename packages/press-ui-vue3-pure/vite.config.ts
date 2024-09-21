import { getViteBaseConfig } from '@plugin-light/project-config-vite';

import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';


// @ts-ignore
export default defineConfig(({ mode }) => getViteBaseConfig({ mode }) as UserConfig);
