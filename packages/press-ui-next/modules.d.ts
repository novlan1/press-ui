declare module '*.md' {
  const CONTENT: string;
  export default CONTENT;
}

declare module '*.json' {
  const CONTENT: Record<string, any>;
  export default CONTENT;
}

declare module '*.vue' {
  import type { DefineComponent, Plugin } from 'vue';

  const CONTENT: DefineComponent<{}, {}, any> & Plugin;
  export default CONTENT;
}


declare module 'rollup-plugin-static-import';
declare module 'rollup-plugin-multi-input';
