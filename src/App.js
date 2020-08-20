// vue3 root component
// 定义 vue3 根组件
import {defineComponent, h, computed, ref} from '@vue/runtime-core';
import StartPage from './page/StartPage';
import GamePage from './page/GamePage';
import EndPage from './page/EndPage';

// template -> render
export default defineComponent({

    setup() {
        // create reactive object: ref
        // vue2 data
        const currentPageName = ref('StartPage');
        // const currentPageName = ref('GamePage');

        const pageMap = {
            StartPage,
            GamePage,
            EndPage
        };

        // computed attribute
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