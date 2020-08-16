import {h, defineComponent, reactive} from '@vue/runtime-core';
import Map from '../components/Map';
import Plane from '../components/Plane';
import EnemyPlane from '../components/EnemyPlane';

export default defineComponent({

    setup() {
        // entry
        //reactive data
        const planeInfo = reactive({x: 150, y: 450});

        // 通过键盘控制飞机移动
        const speed = 10;
        const eventMap = {
            ArrowUp() {
                planeInfo.y -= speed;
            },
            ArrowDown() {
                planeInfo.y += speed;
            },
            ArrowLeft() {
                planeInfo.x -= speed;
            },
            ArrowRight() {
                planeInfo.x += speed;
            }
        };
        window.addEventListener('keydown', e => {
            eventMap[e.code]();
        });

        return {
            planeInfo
        };
    },

    render(ctx) {
        //<div><img src=""></div>
        const {x, y} = ctx.planeInfo;
        return h('Container', [
            h(Map),
            h(Plane, {
                x,
                y,
                interactive: true
            }),
            h(EnemyPlane, {
                x: 150,
                y: 20,
                interactive: true
            })
        ]);
    }

});