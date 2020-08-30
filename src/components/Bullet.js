import {h, defineComponent, toRefs} from '@vue/runtime-core';
import bulletImg from '../../assets/bullet.png';

export default defineComponent({

    props: ['x', 'y'],

    setup(props) {
        let {x, y} = toRefs(props);
        return {
            x, y
        };
    },

    render(ctx) {
        //<div><img src=""></div>
        const {x, y} = ctx;
        return h('Container',  [
            h('Sprite', {texture: bulletImg, x, y}),
        ]);
    }

});