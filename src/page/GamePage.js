import {h, defineComponent, reactive, onMounted, onUnmounted} from '@vue/runtime-core';
import Map from '../components/Map';
import Plane from '../components/Plane';
import EnemyPlane from '../components/EnemyPlane';
import {game} from '../Game';
import {areObjectsCollide} from '../utils';

export default defineComponent({

    setup(props, {emit}) {
        // entry
        const {planeInfo} = useCreateSelfPlane();
        const {enemyPlaneInfos, moveEnemyPlane} = useCreateEnemyPlanes();

        function handleTicker() {
            moveEnemyPlane(enemyPlaneInfos);
            // 碰撞检测
            enemyPlaneInfos.forEach(enemy => {
                if (areObjectsCollide(enemy, planeInfo)) {
                    console.log('hit!');
                    // game over
                    emit('changePage', 'EndPage');
                }
            });
        }

        onMounted(() => game.ticker.add(handleTicker));
        onUnmounted(() => game.ticker.remove(handleTicker));

        return {
            planeInfo,
            enemyPlaneInfos
        };
    },

    render(ctx) {
        //<div><img src=""></div>
        const {x, y} = ctx.planeInfo;

        function createEnemyPlanes(ctx) {
            return ctx.enemyPlaneInfos.map(({x, y}) => h(EnemyPlane, {x, y}));
        }

        return h('Container', [
            h(Map),
            h(Plane, {
                x,
                y,
                interactive: true
            }),
            ...createEnemyPlanes(ctx)
        ]);
    }

});

function useCreateSelfPlane() {
    //reactive data
    const planeInfo = reactive({
        x: 150,
        y: 450,
        width: 258,
        height: 364
    });

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
}

function useCreateEnemyPlanes() {
    //enemy plane data
    const enemyPlaneInfos = reactive([
        {
            x: 0,
            y: 50,
            width: 308,
            height: 207
        },
        {
            x: 300,
            y: 100,
            width: 308,
            height: 207
        }
    ]);

    function moveEnemyPlane(enemyPlaneInfos) {
        enemyPlaneInfos.forEach(info => info.y += 2);
    }

    return {
        enemyPlaneInfos,
        moveEnemyPlane
    };
}