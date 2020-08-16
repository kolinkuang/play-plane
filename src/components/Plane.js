import {h, defineComponent, toRefs} from '@vue/runtime-core';
import planeImg from '../../assets/plane.png';

export default defineComponent({

    props: ['x', 'y'],

    setup(props) {
        // props is readonly.
        // let point = reactive({x: props.x, y: props.y});
        //
        // watch(props, value => {
        //     point.x = value.x;
        //     point.y = value.y;
        // });
        //
        // return {
        //     point
        // };

        let {x, y} = toRefs(props);
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