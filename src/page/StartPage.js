import {h, defineComponent} from '@vue/runtime-core';
import startPageImg from '../../assets/startPage.jpg';
import startBtn from '../../assets/startBtn.png';

export default defineComponent({

    //vue2 this.$emit
    setup(props, ctx) {
        // ctx.emit;
        return {
            handleClick() {
                ctx.emit('changePage', 'GamePage');
            }
        };
    },

    render(ctx) {
        //<div><img src=""></div>
        return h('Container', [
            h('Sprite', {
                texture: startPageImg
            }),
            h('Sprite', {
                texture: startBtn,
                x: 227,
                y: 514,
                interactive: true,
                onClick: ctx.handleClick
            })
        ]);
    }

});