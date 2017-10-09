function Bat(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Bat.prototype.halfWidth = 40;
Bat.prototype.halfHeight = 7;

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
    let xLeftEdge = this.cx - (this.halfWidth / 2);
    let xRightEdge = this.cx + (this.halfWidth / 2);
    let yUpperEdge = this.cy - (this.halfHeight / 2);
    let yLowerEdge = this.cy + (this.halfHeight / 2);

    if ((nextY - r < yUpperEdge && prevY - r >= yUpperEdge) ||
        (nextY + r > yUpperEdge && prevY + r <= yUpperEdge)) {
        if (nextX + r >= this.cx - this.halfWidth &&
            nextX - r <= this.cx + this.halfWidth) {
            return true;
        }
    }
    if ((nextX - r <= xRightEdge && prevX - r >= xRightEdge) ||
        (nextX + r >= xLeftEdge && prevX + r <= xLeftEdge)) {
        if ((nextY + r >= this.cy - this.halfHeight) &&
            (nextY - r <= this.cy + this.halfHeight)) {
            return true;
        }
    }

    return false;
};
