function Bat(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Bat.prototype.halfWidth = 50;
Bat.prototype.halfHeight = 10;

// ================
// Update
// ================

Bat.prototype.update = function (du) {
    if (g_keys[this.GO_LEFT] &&
        this.cx - this.halfWidth > 0) {
        this.cx -= this.xVel;
    } else if (g_keys[this.GO_RIGHT] &&
        this.cx + this.halfWidth < g_canvas.width) {
        this.cx += this.xVel;
    }
};

// ================
// Render
// ================
Bat.prototype.render = function (ctx) {
    ctx.fillRect(this.cx - this.halfWidth,
                this.cy - this.halfHeight,
                this.halfWidth * 2,
                this.halfHeight * 2);
};

// ================
// Collides with
// ================
Bat.prototype.collidesWith = function (prevX, prevY, nextX, nextY, r) {
    var paddleEdge = this.cy-this.halfHeight;

    if ((nextY - r < paddleEdge && prevY - r >= paddleEdge) ||
        (nextY + r > paddleEdge && prevY + r <= paddleEdge)) {
        if (nextX + r >= this.cx - this.halfWidth &&
            nextX - r <= this.cx + this.halfWidth) {
            return true;
        }
    }
    if ((nextX - r < this.cx+this.halfWidth && prevX - r >= this.cx+this.halfWidth) ||
        (nextX + r > this.cx-this.halfWidth && prevX + r <= this.cx-this.halfWidth)) {
        if (nextY + r >= this.cy - this.halfHeight+5 &&
            nextY - r <= this.cy + this.halfHeight-5) {
            return true;
        }
    }
    return false;
};
