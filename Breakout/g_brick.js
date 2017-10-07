function Brick(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Brick.prototype.halfWidth = 28;
Brick.prototype.halfHeight = 10;
Brick.prototype.alive = true;
Brick.prototype.powerup = false;

// Render
Brick.prototype.render = function (ctx) {

    if (this.alive) {
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);
    }
};

Brick.prototype.collidesWithY = function (prevX, prevY,
                                          nextX, nextY,
                                          r) {
    if ((nextY - r < this.cy+this.halfHeight && prevY - r >= this.cy+this.halfHeight) ||
        (nextY + r > this.cy-this.halfHeight && prevY + r <= this.cy-this.halfHeight)) {
        if (nextX + r >= this.cx - this.halfWidth &&
            nextX - r <= this.cx + this.halfWidth) {
                if (this.alive) {
                    this.alive = false;
                    return true;
                }
            }
        }
    return false;
};

Brick.prototype.collidesWithX = function (prevX, prevY,
                                          nextX, nextY,
                                          r) {
    if ((nextX - r < this.cx+this.halfWidth && prevX - r >= this.cx+this.halfWidth) ||
        (nextX + r > this.cx-this.halfWidth && prevX + r <= this.cx-this.halfWidth)) {
        if (nextY + r >= this.cy - this.halfHeight+5 &&
            nextY - r <= this.cy + this.halfHeight-5) {
                if (this.alive) {
                    this.alive = false;
                    return true;
                }
            }
        }
    return false;
};

Brick.prototype.update = function (du) {
    if (this.powerup) {
        console.log("Brick has a powerup");
    }
};
