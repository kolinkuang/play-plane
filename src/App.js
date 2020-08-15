// vue3 root component
import {defineComponent, h} from '@vue/runtime-core';
import Circle from './components/Circle';

// template -> render
export default defineComponent({

    render() {
        // <div x="100" y="100">kaikeba<circle></circle></div>
        const vnode = h('rect', {
            x: 100,
            y: 100
        }, [
            'kaikebar',
            h(Circle)
        ]);
        console.log(vnode);
        return vnode;
    }

});