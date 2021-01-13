import {h, defineComponent, toRefs} from '@vue/runtime-core';
import planeImg from '../../assets/plane.png';

export default defineComponent({

    props: ['x', 'y'],

    setup(props, {emit}) {
        // props is readonly.
        const {x, y} = toRefs(props);

        const eventMap = {
            'Space'() {
                emit('attack', {x: x.value + 100, y: y.value});
            }
        };

        // 发射子弹
        window.addEventListener('keydown', e => {
            const fn = eventMap[e.code];
            typeof fn === 'function' && fn();
        });

        return {
            x, y
        };
    },

    render(ctx) {
        //<div><img src=""></div>
        const {x, y} = ctx;
        //TODO: why x, y can't be bound to children?
        return h('Container',  [
            h('Sprite', {texture: planeImg, x, y}),
        ]);
    }

});