// init game canvas
import {Application} from "pixi.js";
import {width, height} from './constants/Constants';

const game = new Application({
    width,
    height
});

document.body.append(game.view);

function getRootContainer() {
    return game.stage;
}

export {getRootContainer, game};