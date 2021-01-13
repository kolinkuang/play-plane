import {h, defineComponent, reactive, onMounted, onUnmounted} from '@vue/runtime-core';
import Map from '../components/Map';
import Plane from '../components/Plane';
import EnemyPlane from '../components/EnemyPlane';
import Bullet from '../components/Bullet';
import {getTickerForUpdate} from '../Game';
import {areObjectsCollide} from '../utils';
import updateSelfPlaneMovement from '../handler-components/SelfPlaneMovementHandler';

export default defineComponent({

    setup(props, {emit}) {
        return useFighting(emit);
    },

    render(ctx) {
        //<div><img src=""></div>
        const {x, y} = ctx.planeInfo;
        const speed = 20;

        function createSelfPlane(ctx) {
            return h(Plane, {
                // ...updateSelfPlaneMovement({x, y, speed}),
                x,
                y,
                interactive: true,
                onAttack(BulletInfo) {
                    ctx.addBullet(BulletInfo);
                },
                // onKeyArrowUp() {
                //     ctx.planeInfo.y -= speed;
                // },
                // onKeyArrowDown() {
                //     ctx.planeInfo.y += speed;
                // },
                // onKeyArrowLeft() {
                //     ctx.planeInfo.x -= speed;
                // },
                // onKeyArrowRight() {
                //     ctx.planeInfo.x += speed;
                // }
            });
        }

        function createEnemyPlanes(ctx) {
            return ctx.enemyPlaneInfos.map(({x, y}) => h(EnemyPlane, {x, y}));
        }

        function createBullets(ctx) {
            return ctx.bullets.map(({x, y}) => h(Bullet, {
                    x,
                    y
                }
            ));
        }

        return h('Container', [
            h(Map),
            createSelfPlane(ctx),
            ...createEnemyPlanes(ctx),
            ...createBullets(ctx)
        ]);
    }

});

function useFighting (emit) {
    // entry
    const {planeInfo} = useCreateSelfPlane(emit);
    const {enemyPlaneInfos, moveEnemyPlane} = useCreateEnemyPlanes();
    const {bullets, moveBullets, addBullet} = useCreateBullets();

    function handleTicker() {
        moveEnemyPlane(enemyPlaneInfos);
        // 碰撞检测
        enemyPlaneInfos.forEach(enemy => {
            if (areObjectsCollide(enemy, planeInfo)) {
                // game over
                emit('changePage', 'EndPage');
            }
        });

        moveBullets(bullets);

        bullets.forEach((bulletInfo, bulletInfoIndex) => {
            enemyPlaneInfos.forEach((enemyPlane, enemyPlaneIndex) => {
                if (areObjectsCollide(bulletInfo, enemyPlane)) {
                    bullets.splice(bulletInfoIndex, 1);
                    enemyPlaneInfos.splice(enemyPlaneIndex, 1);
                }
            });
        });
    }

    onMounted(() => getTickerForUpdate().add(handleTicker));
    onUnmounted(() => getTickerForUpdate().remove(handleTicker));

    return {
        planeInfo,
        enemyPlaneInfos,
        bullets,
        addBullet,
        emit
    };
}

function useCreateSelfPlane() {
    // const {moveX, moveY} = updateSelfPlaneMovement();
    //reactive data
    const planeInfo = reactive({
        x: 150,
        y: 450,
        width: 258,
        height: 260
    });

    return {
        planeInfo
    };
}

function useCreateEnemyPlanes() {
    //enemy plane data
    const enemyPlaneInfos = reactive([
        {
            x: 10,
            y: 0,
            width: 308,
            height: 207
        },
        {
            x: 400,
            y: 0,
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

function useCreateBullets() {
    const bullets = reactive([]);

    const width = 61;
    const height = 99;

    const speed = 5;

    function moveBullets(bullets) {
        //子弹移动
        bullets.forEach(bullet => bullet.y -= speed);
    }

    function addBullet(BulletInfo) {
        // on each space pressing, a new bullet is generated
        bullets.push({...BulletInfo, width, height});
    }

    return {
        bullets,
        moveBullets,
        addBullet
    };
}