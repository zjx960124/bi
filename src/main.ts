import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:svg-icons-register';
// element-ui
import ElementPlus from 'element-plus';
import * as ElementIcons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

import JsLayout from '@/components/JsLayout/index.vue';

//naive
import { setupNaive } from '@/plugins';

// style
import '@/style/index.scss';
import '@/style/main.scss';

// 引入全局样式
import '@/style/styles/pages/index.scss';

// 引入字体
import '@/assets/font/font.css';

// route
import router from '@/router/index';

// pinia
import { createPinia } from 'pinia';

//utils
import directPlugin from '@/utils/directive/lazyPlugin';
import registedBreadcrumb from '@/utils/directive/registedBreadcrumb';
import changeBreadcrumb from '@/utils/directive/changeBreadcrumb';

const app = createApp(App);

//引入element ICON
for (const [key, component] of Object.entries(ElementIcons)) {
  app.component(key, component);
}

app
  .component('JsLayout', JsLayout)
  .use(createPinia())
  .use(router)
  .use(ElementPlus)
  .use(directPlugin)
  .use(registedBreadcrumb)
  .use(changeBreadcrumb)
  .mount('#app');

setupNaive(app);

window['$vue'] = app;
