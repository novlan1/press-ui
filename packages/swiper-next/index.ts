import type { App } from 'vue';
import installer from './src/components/installer';
export * from './src/components';

export default function (Vue: App) {
  installer(Vue);
}
