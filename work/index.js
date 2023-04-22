import {toDeg, toRad,average} from "./js/general.js";
import {drawPoint,drawLine, drawText, drawCoordinateSystem} from "./js/draw.js";
const myCanvas = document.getElementById("myCanvas");
const chartCanvas = document.getElementById("chartCanvas");

const ctx = myCanvas.getContext("2d");
const chartCtx = chartCanvas.getContext("2d");
// position on canvas
const offset = {
    x: myCanvas.width / 2,
    y: myCanvas.height / 2
};
const chartOffset = {
    x: chartCanvas.width / 2,
    y: chartCanvas.height / 2
};
// set theta angle
let theta = Math.PI / 4;
// set radius
const c = 100;

const A = { x: 0, y: 0 };
const B = {
    x: Math.cos(-theta) * c,
    y: Math.sin(-theta) * c
};
const C = { x: 0, y: 0 };
console.log(theta);
console.log(ctx);
ctx.translate(offset.x, offset.y);
chartCtx.translate(chartOffset.x, chartOffset.y);

drawCoordinateSystem(chartCtx, chartOffset);

update(ctx);
document.onwheel = (event) => {
    theta -= toRad(Math.sign(event.deltaY));

    B.x = Math.cos(theta) * c;
    B.y = Math.sin(theta) * c;

    C.x = B.x;

    update(ctx);
}
// updates canvas


function update(ctx) {
    const sin = Math.sin(theta);
    const cos = Math.cos(theta);
    const tan = Math.tan(theta);

    const T = {
        x: Math.sign(cos) * Math.hypot(1, tan) * c,
        y: 0
    };

    ctx.clearRect(-offset.x, -offset.y,
        myCanvas.width, myCanvas.height);

    drawCoordinateSystem(ctx, offset);

    drawText(
        "sin = " + sin.toFixed(4),
        { x: -offset.x / 2, y: offset.y * 0.7 },
        "red",ctx
    );

    drawText(
        "cos = " + cos.toFixed(4),
        { x: -offset.x / 2, y: offset.y * 0.8 },
        "blue",ctx
    );

    drawText(
        "tan = " + tan.toFixed(4),
        { x: -offset.x / 2, y: offset.y * 0.9 },
        "magenta",ctx
    );

    drawText(
        "θ = " + theta.toFixed(4) + " (" +
        toDeg(theta).toFixed(3).
            toString().padStart(2, " ") + "°)",
        { x: offset.x / 2, y: offset.y * 0.7 },"black",ctx
    );

    drawLine(A, B,"black", ctx);
    drawText("1", average(A, B),"black",ctx);
    drawLine(A, C, "blue",ctx);
    drawText("cos", average(A, C), "blue",ctx);
    drawLine(B, C, "red",ctx);
    drawText("sin", average(B, C), "red",ctx);
    drawLine(B, T, "magenta",ctx);
    drawText("tan", average(B, T), "magenta",ctx);

    drawText("θ", A,"black",ctx);

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.arc(0, 0, c, 0, theta, theta < 0);
    ctx.stroke();

    const chartScaler = chartOffset.y * 0.5;
    drawPoint({
        x: theta * chartScaler,
        y: sin * chartScaler
    }, 2, "red",chartCtx);
    drawPoint({
        x: theta * chartScaler,
        y: cos * chartScaler
    }, 2, "blue",chartCtx);
    drawPoint({
        x: theta * chartScaler,
        y: tan * chartScaler
    }, 2, "magenta",chartCtx);
}
