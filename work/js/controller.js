// updates canvas
import { average, toDeg } from "./general.js";
import { drawPoint, drawLine, drawText, drawCoordinateSystem } from "./draw.js";

export function update() {
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
        "red"
    );

    drawText(
        "cos = " + cos.toFixed(4),
        { x: -offset.x / 2, y: offset.y * 0.8 },
        "blue"
    );

    drawText(
        "tan = " + tan.toFixed(4),
        { x: -offset.x / 2, y: offset.y * 0.9 },
        "magenta"
    );

    drawText(
        "θ = " + theta.toFixed(4) + " (" +
        toDeg(theta).toFixed(3).
            toString().padStart(2, " ") + "°)",
        { x: offset.x / 2, y: offset.y * 0.7 }
    );

    drawLine(A, B);
    drawText("1", average(A, B));
    drawLine(A, C, "blue");
    drawText("cos", average(A, C), "blue");
    drawLine(B, C, "red");
    drawText("sin", average(B, C), "red");
    drawLine(B, T, "magenta");
    drawText("tan", average(B, T), "magenta");

    drawText("θ", A);

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.arc(0, 0, c, 0, theta, theta < 0);
    ctx.stroke();

    const chartScaler = chartOffset.y * 0.5;
    drawPoint({
        x: theta * chartScaler,
        y: sin * chartScaler
    }, 2, "red");
    drawPoint({
        x: theta * chartScaler,
        y: cos * chartScaler
    }, 2, "blue");
    drawPoint({
        x: theta * chartScaler,
        y: tan * chartScaler
    }, 2, "magenta");
}
