import { getViteBaseConfig } from '@tencent/project-config-vite';

import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';


// @ts-ignore
export default defineConfig(({ mode }) => getViteBaseConfig({ mode }) as UserConfig);
