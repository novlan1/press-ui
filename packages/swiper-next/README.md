# Swiper Next

Vue3 的 Swiper 组件

## 使用方式

```bash
pnpm i swiper-next
```

main.ts

```ts
import { createApp } from 'vue'
import App from './App.vue'
import SwiperNext from 'swiper-next';
import 'swiper-next/es/style.css';

createApp(App)
  .use(SwiperNext)
  .mount('#app');
```