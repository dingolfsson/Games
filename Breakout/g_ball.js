// Function:  Ball (constructor)
// Parameter: descr
// Action:    Creates balls with given values
function Ball(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}


Ball.prototype.update = function (du) {

    var prevX = this.cx;
    var prevY = this.cy;
    var nextX = prevX + this.xVel * du;
    var nextY = prevY + this.yVel * du;

    if (g_bat.collidesWith(prevX, prevY, nextX, nextY, this.radius)) {
        this.yVel *= -1;
    }

    if (nextY - this.radius < 0 ||                             // top edge
          (nextY > g_canvas.height)){
        this.yVel *= -1;
    }
    if(nextX - this.radius < 0 ||
        (nextX + this.radius > g_canvas.width)) {               // sides edge
        this.xVel *= -1;
    }

    for(var i=0; i<g_brick.length; i++){

        if (g_brick[i].collidesWithY(prevX, prevY, nextX, nextY, this.radius)){
            this.yVel *= -1;
            console.log(g_brick[i].hp);
            g_brick[i].alive = false;
            g_brick[i].disappearY = true;
        }
        if (g_brick[i].collidesWithX(prevX, prevY, nextX, nextY, this.radius)){
            this.yVel *= -1;
            g_brick[i].alive = false;
            g_brick[i].disappearX = true;
        }

    }
    // Border Collition
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;
}

// ================
// Reset
// ================

Ball.prototype.render = function (ctx) {
    fillCircle(ctx, this.cx, this.cy, this.radius);
}
