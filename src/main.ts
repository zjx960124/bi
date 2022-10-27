import { createApp } from 'vue';
import App from './App.vue';

// element-ui
import ElementPlus from 'element-plus';
import * as ElementIcons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

//naive
import { setupNaive } from '@/plugins';

// style
import '@/style/index.scss';
// 引入全局样式
import '@/styles/pages/index.scss';

// route
import router from '@/router/index';

// pinia
import { createPinia } from 'pinia';

//utils
import directPlugin from '@/utils/directive/lazyPlugin';
import registedBreadcrumb from '@/utils/directive/registedBreadcrumb';
import changeBreadcrumb from '@/utils/directive/changeBreadcrumb';

const app = createApp(App);

app
  .use(router)
  .use(createPinia())
  .use(ElementPlus)
  .use(directPlugin)
  .use(registedBreadcrumb)
  .use(changeBreadcrumb)
  .mount('#app');

setupNaive(app);
window['$vue'] = app;
