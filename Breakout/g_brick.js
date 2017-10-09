function Brick(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Brick.prototype.halfWidth = 24;
Brick.prototype.halfHeight = 7;
Brick.prototype.alive = true;

// Render
Brick.prototype.render = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);

};

Brick.prototype.collidesWithY = function (prevX, prevY,
                                          nextX, nextY,
                                          r) {
    if ((nextY - r < this.cy+this.halfHeight && prevY - r >= this.cy+this.halfHeight) ||
        (nextY + r > this.cy-this.halfHeight && prevY + r <= this.cy-this.halfHeight)) {
        if (nextX + r >= this.cx - this.halfWidth &&
            nextX - r <= this.cx + this.halfWidth) {
                if (this.alive) {
                    this.hp--;
                    if (this.hp < 1) {
                        this.alive = false;
                    }
                    console.log(this.powerup);
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
        if (nextY + r >= this.cy - this.halfHeight &&
            nextY - r <= this.cy + this.halfHeight) {
                if (this.alive) {
                    this.hp--;
                    if (this.hp < 1) {
                        this.alive = false;
                    }
                    console.log(this.powerup);
                    return true;
                }

            }
        }
    return false;
};

Brick.prototype.update = function (du) {

};
