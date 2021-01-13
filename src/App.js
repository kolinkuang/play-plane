// vue3 root component
// 定义 vue3 根组件
import {defineComponent, h, computed, ref} from '@vue/runtime-core';
import StartPage from './page-components/StartPage';
import GamePage from './page-components/GamePage';
import EndPage from './page-components/EndPage';

// template -> render()
export default defineComponent({

    setup() {
        // create reactive object by using ref()
        const currentPageName = ref('StartPage');

        const pageMap = {
            StartPage,
            GamePage,
            EndPage
        };

        // computed attribute: read only reactive object, lazily executed
        const currentPage = computed(() => {
            return pageMap[currentPageName.value];
        });

        return {
            currentPage,
            currentPageName
        };
    },

    render(ctx) {
        return h('Container', [
            h(ctx.currentPage, {
                onChangePage(page) {
                    ctx.currentPageName = page;
                }
            })
        ]);
    }

});