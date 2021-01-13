import {h, defineComponent, ref} from '@vue/runtime-core';
import mapImg from '../../assets/map.jpg';
import {getTickerForUpdate} from '../Game';
import {height} from '../config';

export default defineComponent({

    setup() {
        const viewHeight = height;
        // need to change y
        const mapY1 = ref(0);
        const mapY2 = ref(-viewHeight);

        const speed = 3;
        getTickerForUpdate().add(() => {
            mapY1.value += speed;
            mapY2.value += speed;

            if (mapY1.value >= viewHeight) {
                mapY1.value = -viewHeight;
            }
            if (mapY2.value >= viewHeight) {
                mapY2.value = -viewHeight;
            }
        });

        return {
            mapY1,
            mapY2
        };
    },

    render(ctx) {
        //<div><img src=""></div>
        return h('Container', [
            h('Sprite', {texture: mapImg, y: ctx.mapY1}),
            h('Sprite', {texture: mapImg, y: ctx.mapY2})
        ]);
    }

});