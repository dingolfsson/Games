function Bat(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Bat.prototype.halfWidth = 10;
Bat.prototype.halfHeight = 50;

// ================
// Update
// ================

Bat.prototype.update = function (du) {
    if (g_keys[this.GO_LEFT]) {
        this.cx -= 5 * du;
    } else if (g_keys[this.GO_RIGHT]) {
        this.cx += 5 * du:
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
    var batEdge = this.cx;
    if ((nextX - r < batEdge && prevX - r >= batEdge) ||
        (nextX + r > batEdge && prevX + r <= batEdge)) {
            if (nextY + r >= this.cy - this.halfHeight &&
                nextY - r <= this.cy + this.halfHeight) {
                    return true;
                }
        }
        return false;
};
