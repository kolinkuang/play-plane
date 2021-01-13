import {areObjectsCollide} from "../utils";
import {onMounted, onUnmounted, reactive} from "@vue/runtime-core";
import {getTickerForUpdate} from "../Game";
import updateSelfPlaneMovement from '../handler-components/SelfPlaneMovementHandler';

function useFighting(emit) {
    // entry
    const {planeInfo} = useCreateSelfPlane(emit);
    const {enemyPlaneInfos, moveEnemyPlane} = useCreateEnemyPlanes();
    const {bullets, moveBullets, addBullet} = useCreateBullets();

    function handleTicker() {
        moveEnemyPlane(enemyPlaneInfos);

        moveBullets(bullets);

        // 飞机碰撞检测
        enemyPlaneInfos.forEach(enemy => {
            if (areObjectsCollide(enemy, planeInfo)) {
                // game over
                emit('changePage', 'EndPage');
            }
        });

        // 我方子弹和敌军碰撞
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
    //reactive data
    const planeInfo = reactive({
        x: 150,
        y: 450,
        width: 258,
        height: 260,
        speed: 7
    });

    const {x, y} = updateSelfPlaneMovement({x: planeInfo.x, y: planeInfo.y, speed: planeInfo.speed});
    planeInfo.x = x;
    planeInfo.y = y;

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
    const bullets = reactive([{}]);

    const width = 61;
    const height = 99;

    const speed = 5;

    function moveBullets(bullets) {
        //子弹移动
        bullets.forEach(bullet => bullet.y -= speed);
    }

    function addBullet(bulletInfo) {
        // on each space pressing, a new bullet is generated
        bullets.push({...bulletInfo, width, height});
    }

    return {
        bullets,
        moveBullets,
        addBullet
    };
}

export default useFighting;