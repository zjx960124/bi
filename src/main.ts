import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:svg-icons-register';

// element-ui
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/theme-chalk/index.css';
import * as ElementIcons from '@element-plus/icons-vue';

import JsLayout from '@/components/JsLayout/index.vue';

//naive
import { setupNaive } from '@/plugins';

// 引入动画
// import 'animate.css/animate.min.css';

// 引入全局样式
import '@/style/styles/pages/index.scss';

// style
import '@/style/index.scss';

// 引入字体
import '@/assets/font/font.css';

// route
import router from '@/router/index';

// pinia
import { createPinia } from 'pinia';

import draggable from 'vuedraggable';
import VueGridLayout from 'vue-grid-layout';

//utils
import directPlugin from '@/utils/directive/lazyPlugin';
import registedBreadcrumb from '@/utils/directive/registedBreadcrumb';
import changeBreadcrumb from '@/utils/directive/changeBreadcrumb';

import SvgIcon from '@/components/svg-icon/index.vue';

const app = createApp(App);

//引入element ICON
for (const [key, component] of Object.entries(ElementIcons)) {
  app.component(key, component);
}

app
  .component('JsLayout', JsLayout)
  .component('SvgIcon', SvgIcon)
  .component('draggable', draggable)
  .use(createPinia())
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(VueGridLayout)
  .use(directPlugin)
  .use(registedBreadcrumb)
  .use(changeBreadcrumb)
  .mount('#app');

setupNaive(app);

window['$vue'] = app;
