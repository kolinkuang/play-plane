// init game canvas
import {Application} from "pixi.js";
import {width, height} from './constants/Constants';

// 定义根容器
const game = new Application({
    width,
    height
});

document.body.append(game.view);

function getRootContainer() {
    return game.stage;
}

export {getRootContainer, game};