import { App } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

const defaultImg = '../../assets/logo.png';
export default {
  install(app: App<Element>) {
    app.directive('imgLazy', {
      // Vue3自定义指令的钩子函数有所变化
      mounted(el, binding) {
        // el 元素  binding:通过binding.value可以取出传来的值
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }], observerElement) => {
            if (isIntersecting) {
              el.onerror = () => {
                // el.src = defaultImg;
              };
              // 停止监听
              stop();
              el.src = binding.value;
            }
          }
        );
      },
    });
  },
};
