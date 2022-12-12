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

export const generateImage = (previews: any) => {
  let scaleBy = window.devicePixelRatio;
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  let dom = document.getElementById('scaleView')!;
  html2canvas(document.querySelector('#scaleView')!, {
    width: 1920, // canvas宽度
    height: 969,
    backgroundColor: null, //画出来的图片有白色的边框,不要可设置背景为透明色（null）
    useCORS: true, //支持图片跨域
    scale: 2, //设置放大的倍数
    x: 0, //x坐标
    y: 0, //y坐标
  }).then((canvas) => {
    let img = new Image();
    let res = canvas.toDataURL('image/jpeg', 1.0); // toDataURL :图片格base64
    let canvased = document.createElement('canvas');
    let context = canvased.getContext('2d')!;
    canvased.width = 1920;
    canvased.height = 969;
    // 核心JS就这个
    context.drawImage(canvas, 0, 0, 1920, 969);
    let resd = canvased.toDataURL('image/jpeg', 1.0);
    console.log(resd);
  });
};
