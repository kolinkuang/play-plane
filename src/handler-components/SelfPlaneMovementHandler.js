import {ref, onMounted, onUnmounted} from '@vue/runtime-core';
import {getTickerForUpdate} from '../Game';
import {CommandMap, CommandType} from '../config/CommandConfig';

/**
 * 命令模式
 * up-down command object
 * left-right command object
 */
function updateSelfPlaneMovement({x, y, speed}) {

    const moveX = ref(x);
    const moveY = ref(y);

    //用队列+命令模式实现
    const commandQueue = [];

    onMounted(() => {
        getTickerForUpdate().add(handleTicker);
        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', handleKeyup);
    });

    onUnmounted(() => {
        getTickerForUpdate().remove(handleTicker);
        window.removeEventListener('keydown', handleKeydown);
        window.removeEventListener('keyup', handleKeyup);
    });

    // handle automatically
    function handleTicker() {
        handleUpDownMovement();
        handleLeftRightMovement();
    }

    function handleUpDownMovement() {
        const UpDownCommand = findUpDownCommand();
        if (UpDownCommand) {
            moveY.value += speed * UpDownCommand.direction;
        }
    }

    function handleLeftRightMovement() {
        const LeftRightCommand = findLeftRightCommand();
        if (LeftRightCommand) {
            moveX.value += speed * LeftRightCommand.direction;
        }
    }

    function findUpDownCommand() {
        return commandQueue.find(command => command.type === CommandType.UpDown);
    }

    function findLeftRightCommand() {
        return commandQueue.find(command => command.type === CommandType.LeftRight);
    }

    // handle manually
    function handleKeydown(e) {
        const command = CommandMap[e.code];
        if (command && !isExistingCommand(command)) {
            addCommand(commandQueue, command);
        }
    }

    function handleKeyup(e) {
        const command = CommandMap[e.code];
        if (command) {
            removeCommand(commandQueue, command);
        }
    }

    function isExistingCommand(command) {
        return commandQueue.some(c => c.id === command.id);
    }

    function addCommand(commandQueue, command) {
        commandQueue.unshift(command); // in that case the latest entered command would be applied
        if (commandQueue.length > 5) {
            // to limit the queue length
            commandQueue.pop();
        }
    }

    function removeCommand(commandQueue, command) {
        let index = commandQueue.indexOf(command);
        commandQueue.splice(index, 1);
    }

    return {
        x: moveX,
        y: moveY
    };
}

export default updateSelfPlaneMovement;