import { createVNode, render, h, nextTick } from 'vue';
import { loadAsyncComponent } from '@/utils';
// import Preview from '@/views/preview/index.vue';
import Project from '@/store/pageEditStore/pageEditStore';
import { setLocalStorage } from '@/utils';
import html2canvas from 'html2canvas';

let mountNode: HTMLElement | null = null;
const Preview = loadAsyncComponent(() => import('@/views/preview/index.vue'));

export default () => {
  if (mountNode) {
    document.body.removeChild(mountNode);
    mountNode = null;
  }
  const projectInfo = Project.value.getProjectInfo();
  setLocalStorage(projectInfo.id, projectInfo);
  const app = createVNode(Preview, {
    id: projectInfo.id,
  });
  //创建一个空的div
  mountNode = document.createElement('div');
  mountNode.style.position = 'fixed';
  mountNode.style.left = '0';
  mountNode.style.top = '0';
  mountNode.style.width = '100vw';
  mountNode.style.height = '100vh';
  mountNode.style.zIndex = '999';
  render(app, mountNode);
  document.getElementById('app')!.appendChild(mountNode);
};

export const generateImage = async (previews: any) => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  let result = '';
  await html2canvas(document.querySelector('#scaleView')!, {
    width: 1920,
    height: 969,
    backgroundColor: null,
    useCORS: true,
    scale: 2,
    x: 0,
    y: 0,
  }).then((canvas) => {
    let img = new Image();
    let res = canvas.toDataURL('image/jpeg', 1.0);
    let canvased = document.createElement('canvas');
    let context = canvased.getContext('2d')!;
    canvased.width = 380;
    canvased.height = 212;
    // 核心JS就这个
    context.drawImage(canvas, 0, 0, 380, 212);
    let resd = canvased.toDataURL('image/jpeg', 5);
    result = resd;
  });
  return result;
};
