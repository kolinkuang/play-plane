import createApp from './src/runtime-canvas';
import App from './src/App';    //根组件
import {getRootContainer} from './src/Game';  //根容器

// App.vue
// 1.创建根组件
// 2.创建根容器
createApp(App).mount(getRootContainer());