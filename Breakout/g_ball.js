// ================
// Balls Properties
// ================

var g_ball = {
    cx: 50,
    cy: 200,
    radius: 10,

    xVel: 5,
    yVel: 4
};

g_ball.update = function (du) {
    var prevX = this.cx;
    var prevY = this.cy;

    var nextX = prevX + this.xVel * du;
    var nextY = prevX + this.yVel * du;

    // Bat Collition
    if (g_bat.collidesWith(prevX, prevY, nextX, nextY, this.radius)) {
        this.xVel *= -1;
    }

    // Border Collition
    if (nextY < 0 ||nextY > g_canvas.height) {
        this.yVel *= -1;
    }
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;
}

// ================
// Reset
// ================

g_ball.render = function (ctx) {
    fillCircle(ctx, this.cx, this.cy, this.radius);
}
