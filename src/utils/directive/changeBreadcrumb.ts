import { App } from 'vue';
import { useMainStore } from '@/store/main';

export default {
  install(app: App<Element>) {
    app.directive('changeBreadcrumb', {
      created(el, binding) {
        const mainStore = useMainStore();
        function eventHandler(e: any) {
          if (!el.contains(e.target)) {
            return false;
          }
          if (binding.value > -1 && typeof binding.value === 'number') {
            mainStore.changeBreadcrumb(binding.value);
          }
        }
        el.__click__ = eventHandler;
        el.addEventListener('click', eventHandler);
      },
      beforeUnmount(el) {
        el.removeEventListener('click', el.__click__);
        delete el.__click__;
      },
    });
  },
};
