// Function:  Bat (constructor)
// Parameter: descr
// Action:    Creates balls with given values
function Bat(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// ================================================
//             Initilized values
// ================================================

Bat.prototype.halfWidth = 40;
Bat.prototype.halfHeight = 7;
Bat.prototype.score = 0;

// ================================================
//             Update Function
// ================================================

Bat.prototype.update = function (du) {
    if (g_keys[this.GO_LEFT] &&
        this.cx - this.halfWidth > 0) {
        this.cx -= this.xVel;
    } else if (g_keys[this.GO_RIGHT] &&
        this.cx + this.halfWidth < g_canvas.width) {
        this.cx += this.xVel;
    }
};

// ================================================
//             Render Function
// ================================================

Bat.prototype.render = function (ctx) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Lives: " + this.lives, 0, 15);
    ctx.fillText("Score: " + this.score, g_canvas.width / 2 - 40, 15);
    if (this.lives === -1) {
        ctx.fillText("You lost! ",
        g_canvas.width / 2 - 30, g_canvas.height / 2);
        ctx.fillText("You score: " + this.score,
        g_canvas.width / 2 - 50, g_canvas.height / 2 + 30);
    }
    ctx.fillRect(this.cx - this.halfWidth,
                this.cy - this.halfHeight,
                this.halfWidth * 2,
                this.halfHeight * 2);
};

// ================================================
//             Collition Function
// ================================================

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
