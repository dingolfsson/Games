// Function:  Ball (constructor)
// Parameter: descr
// Action:    Creates balls with given values
function Ball(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// ================================================
//              Audio Files for Ball
// ================================================

var hitSound = new Audio('media/Audio/cratepop.wav');

// ================================================
//              Update Function
// ================================================

Ball.prototype.update = function (du) {

    var prevX = this.cx;
    var prevY = this.cy;
    var nextX = prevX + this.xVel * du;
    var nextY = prevY + this.yVel * du;

    // Simple Bat Collition
    if (g_bat.collidesWith(prevX, prevY, nextX, nextY, this.radius)) {
        this.yVel *= -1;
    }

    // TOP / BOTTOM
    if (nextY - (Math.floor(this.yVel) / 2) <= this.radius ||
        (nextY > g_canvas.height - this.radius))
    {
        // Bullets 'dissapear', in retrospect, could have used
        // Splice
        if (this.name === 'bullet') {
            this.yVel = 0;
            this.radius = 0;
        }
        // If ball hits bottom, reduces lifes
        // And if the lives are -1, the game quits
        if (nextY > g_canvas.height - this.radius) {
            g_bat.lives--;
            (g_bat.lives === -1) && (g_keys[KEY_QUIT] = true);
        }
        this.yVel *= -1;
    }

    // Sides
    if (nextX - (Math.floor(this.xVel) / 2) <= this.radius ||
        nextX > g_canvas.width - this.radius)
    {
        this.xVel *= -1;
    }

    // This was stupid tricky
    // And didn't really end up working as I hoped
    // But it works, kindof..
    for(var i = 0; i < g_brick.length; i++){
        if (g_brick[i].collidesWithY(prevX, prevY, nextX, nextY, this.radius)){
            if (prevY > nextY) {
                hitSound.play();
                this.yVel *= -1;
            } else {
                hitSound.play();
                this.xVel *= -1;
            }
            // Bullets "die" on impact
            if (this.name === 'bullet') {
                this.yVel = 0;
                this.radius = 0;
            }
        }
        if (g_brick[i].collidesWithX(prevX, prevY, nextX, nextY, this.radius)){
            if (prevX > nextX) {
                hitSound.play();
                this.xVel *= -1;
            }
            // Bullets "die" on impact
            if (this.name === 'bullet') {
                this.yVel = 0;
                this.radius = 0;
            }
        }

    }
    // Border Collition
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;
}

// ================================================
//              Render Function
// ================================================

Ball.prototype.render = function (ctx) {
    fillCircle(ctx, this.cx, this.cy, this.radius);
}
