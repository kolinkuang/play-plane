// 矩形碰撞

export function areObjectsCollide(objA, objB) {
    return (
        objA.x + objA.width >= objB.x &&
        objB.x + objB.width >= objA.x &&
        objA.y + objA.height >= objB.y &&
        objB.y + objB.height >= objA.y
    );
}