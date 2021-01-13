import {h, defineComponent} from '@vue/runtime-core';
import Map from '../components/Map';
import Plane from '../components/Plane';
import EnemyPlane from '../components/EnemyPlane';
import Bullet from '../components/Bullet';
import useFighting from "../use/UseFighting";

function createSelfPlane(ctx) {
    const {x, y} = ctx.planeInfo;

    return h(Plane, {
        x,
        y,
        interactive: true,
        onAttack(bulletInfo) {
            ctx.addBullet(bulletInfo);
        }
    });
}

function createEnemyPlanes(ctx) {
    return ctx.enemyPlaneInfos.map(({x, y}) => h(EnemyPlane, {x, y}));
}

function createBullets(ctx) {
    return ctx.bullets.map(({x, y}) => h(Bullet, {x, y}));
}

export default defineComponent({

    setup(props, {emit}) {
        return useFighting(emit);
    },

    render(ctx) {
        //<div><img src=""></div>
        return h('Container', [
            h(Map),
            createSelfPlane(ctx),
            ...createEnemyPlanes(ctx),
            ...createBullets(ctx)
        ]);
    }

});