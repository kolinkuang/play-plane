import {createRenderer} from "@vue/runtime-core";
import {Graphics, Text} from 'pixi.js';

// 自定义渲染器（可跨平台）
const renderer = createRenderer({
    createElement(type, isSVG, isCustomizedBuiltIn) {
        // 创建元素
        console.log(type);

        // create canvas element based on type
        let element;
        if (type === 'rect') {
            // create a rectangle
            element = new Graphics();
            element.beginFill(0xff0000);
            element.drawRect(0,0,200,500);
            element.endFill();
        }
        else if (type === 'circle') {
            // create a circle
            element = new Graphics();
            element.beginFill(0xffff00);
            element.drawCircle(0,0,50);
            element.endFill();
        }

        return element;
    },
    insert(el, parent) {
        // append （创建完元素后，添加进容器）
        parent.addChild(el);
        console.log(el, parent);
    },
    patchProp(el, key, prevValue, nextValue, isSVG, prevChildren, parentComponent, parentSuspense, unmountChildren) {
        // pixi
        if (key === 'x') {
            el.x = nextValue;
        }
        if (key === 'y') {
            el.y = nextValue;
        }
    },
    setElementText(node, text) {
        // create text
        const cText = new Text(text);
        node.addChild(cText);
    },
    createText(text) {
        return new Text(text);
    }
});

export default function createApp(rootComponent) {
    return renderer.createApp(rootComponent);
}