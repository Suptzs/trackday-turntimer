var ctx;
var radius;

function resizeClockFace() {
    var canvas = document.getElementById("clock");
    var parent = document.getElementById("grid-container");
    canvas.width = Math.min(parent.offsetWidth / 2, parent.offsetHeight);
    canvas.height = canvas.width;
    ctx = canvas.getContext("2d");
    radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90
}

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawLines(ctx, radius);
    drawTime(ctx, radius);
    drawMiddle(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, '#fff');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = radius * 0.01;
    ctx.stroke();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.7);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.7);
        ctx.rotate(-ang);
    }
}

function drawLines(ctx, radius) {
    var i = 60;
    ctx.strokeStyle = '#333';

    while (i > 0) {
        ctx.save();
        ctx.beginPath();

        var ang = i * Math.PI / 30;
        ctx.rotate(ang);

        if (i % 5 == 0) {
            ctx.lineWidth = 4;
            ctx.moveTo(0, radius * 0.80);
        } else {
            ctx.lineWidth = 2;
            ctx.moveTo(0, radius * 0.85);
        }

        ctx.lineTo(0, radius * 0.9);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        i--;
    }
}

function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.06);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.04);
    // second
    second = (second * Math.PI / 30);
    ctx.strokeStyle = 'red';
    drawHand(ctx, second, radius * 0.9, radius * 0.01);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawMiddle(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = radius * 0.01;
    ctx.stroke();
}