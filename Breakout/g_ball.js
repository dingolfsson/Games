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

    if (nextY - (Math.floor(this.yVel) / 2) <= this.radius ||
        (nextY > g_canvas.height - this.radius))
    {
            this.yVel *= -1;
    }

    if (nextX - (Math.floor(this.xVel) / 2) <= this.radius ||
        nextX > g_canvas.width - this.radius)
    {
        this.xVel *= -1;
    }


    for(var i = 0; i < g_brick.length; i++){

        if (g_brick[i].collidesWithY(prevX, prevY, nextX, nextY, this.radius)){
            console.log("Brick CY: " + g_brick[i].cy);
            if (prevY > nextY) {
                console.log("Bigger Prev = PrevY: " + prevY);
                console.log("Bigger Prev = NextY: " + nextY);
                this.yVel *= -1;
            } else {
                console.log("Bigger Next = PrevY: " + prevY);
                console.log("Bigger Next = NextY: " + nextY);
                this.xVel *= -1;
            }
        }
        if (g_brick[i].collidesWithX(prevX, prevY, nextX, nextY, this.radius)){
            console.log("Brick CX: " + g_brick[i].cx);
            if (prevX > nextX) {
                this.xVel *= -1;
            }
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
