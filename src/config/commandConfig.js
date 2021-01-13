const CommandType = {
    UpDown: 'UpDown',
    LeftRight: 'LeftRight'
};

const DownCommand = {
    type: CommandType.UpDown,
    direction: 1,
    id: 0
};

const UpCommand = {
    type: CommandType.UpDown,
    direction: -1,
    id: 1
};

const LeftCommand = {
    type: CommandType.LeftRight,
    direction: -1,
    id: 2
};

const RightCommand = {
    type: CommandType.LeftRight,
    direction: 1,
    id: 3
};

const CommandMap = {
    ArrowLeft: LeftCommand,
    ArrowRight: RightCommand,
    ArrowUp: UpCommand,
    ArrowDown: DownCommand
};

export {
    CommandMap,
    CommandType
};