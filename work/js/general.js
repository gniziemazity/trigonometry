// math functions
function toRad(deg) {
    return deg * Math.PI / 180;
 }

 function toDeg(rad) {
    return rad * 180 / Math.PI;
 }

 function average(p1, p2) {
    return {
       x: (p1.x + p2.x) / 2,
       y: (p1.y + p2.y) / 2
    };
 }

 function distance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
 }