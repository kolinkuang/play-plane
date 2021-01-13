import {h, defineComponent} from '@vue/runtime-core';
import endPageImg from '../../assets/endPage.jpg';
import restartBtn from '../../assets/restartBtn.png';

export default defineComponent({

    // Vue 2: this.$emit()
    setup(props, ctx) {
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
                texture: endPageImg
            }),
            h('Sprite', {
                texture: restartBtn,
                x: 227,
                y: 514,
                interactive: true,
                onClick: ctx.handleClick
            })
        ]);
    }

});