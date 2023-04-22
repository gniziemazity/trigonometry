// math functions
export function toRad(deg) {
    return deg * Math.PI / 180;
}

export function toDeg(rad) {
    return rad * 180 / Math.PI;
}

export function average(p1, p2) {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
    };
}

export function distance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}