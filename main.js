import createApp from './src/runtime-canvas';
import App from './src/App';    //根组件
import {getRootContainer} from './src/Game';  //根容器

// App.vue
// 1.确认自定义渲染方式（runtime-canvas）
// 2.创建根组件
// 3.创建根容器
createApp(App).mount(getRootContainer());