import {createRenderer} from "@vue/runtime-core";
import {Text, Container, Sprite, Texture} from 'pixi.js';

//定义渲染方式

const typeElementMap = {
    Container() {
        return new Container();
    },
    Sprite() {
        return new Sprite();
    }
};

const patchPropMap = {
    texture(el, key, nextValue) {
        el.texture = Texture.from(nextValue);
    },
    onClick(el, key, nextValue) {
        el.on('pointertap', nextValue);
    },
    default(el, key, nextValue) {
        el[key] = nextValue;
    }
};

// 自定义渲染器（可跨平台）
const renderer = createRenderer({
    createElement(type, isSVG, isCustomizedBuiltIn) {
        // 创建元素：将Vue 虚拟 DOM 映射成 pixi.js 的元素
        // create canvas element based on type
        return typeElementMap[type]();
    },
    insert(el, parent) {
        // append （创建完元素后，添加进容器）
        parent.addChild(el);
    },
    patchProp(el, key, prevValue, nextValue, isSVG, prevChildren, parentComponent, parentSuspense, unmountChildren) {
        // patch pixi 元素的属性
        let fn = patchPropMap[key];
        !!fn ? fn(el, key, nextValue) : patchPropMap.default(el, key, nextValue);
    },
    setElementText(node, text) {
        // create text
        const cText = new Text(text);
        node.addChild(cText);
    },
    createText(text) {
        return new Text(text);
    },
    createComment(text) {
    },
    parentNode(node) {
    },
    nextSibling(node) {
    },
    remove(el) {
        const parent = el.parent;
        if (parent) {
            parent.removeChild(el);
        }
    }
});

export default function createApp(rootComponent) {
    return renderer.createApp(rootComponent);
}