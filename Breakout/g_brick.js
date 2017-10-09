// Function:  Brick (constructor)
// Parameter: descr
// Action:    Creates balls with given values
function Brick(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// ================================================
//             Initilized values
// ================================================

Brick.prototype.halfWidth = 24;
Brick.prototype.halfHeight = 7;
Brick.prototype.alive = true;

// ================================================
//             Render Function
// ================================================

Brick.prototype.render = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);

};

// ================================================
//            CollidesWithY Function
// ================================================

Brick.prototype.collidesWithY = function (prevX, prevY, nextX, nextY, r) {
    if ((nextY - r < this.cy+this.halfHeight &&
        prevY - r >= this.cy+this.halfHeight) ||
        (nextY + r > this.cy-this.halfHeight &&
            prevY + r <= this.cy-this.halfHeight)) {
        if (nextX + r >= this.cx - this.halfWidth &&
            nextX - r <= this.cx + this.halfWidth) {
                if (this.alive) {
                    this.hp--;
                    g_bat.score++;
                    if (this.hp < 1) {
                        this.alive = false;
                    }
                    return true;
                }
            }
        }
    return false;
};

// ================================================
//            CollidesWithX Function
// ================================================

Brick.prototype.collidesWithX = function (prevX, prevY, nextX, nextY, r) {
    if ((nextX - r < this.cx+this.halfWidth &&
        prevX - r >= this.cx+this.halfWidth) ||
        (nextX + r > this.cx-this.halfWidth &&
            prevX + r <= this.cx-this.halfWidth)) {
        if (nextY + r >= this.cy - this.halfHeight &&
            nextY - r <= this.cy + this.halfHeight) {
                if (this.alive) {
                    this.hp--;
                    g_bat.score++;
                    if (this.hp < 1) {
                        this.alive = false;
                    }
                    return true;
                }

            }
        }
    return false;
};

// ================================================
//            Update Function (not used)
// ================================================

Brick.prototype.update = function (du) {

};
