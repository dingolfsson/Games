// "Crappy PONG" -- step by step
//
// Step 9: Homework
/*

// ===================================================
//
//                       HTML
//
// ===================================================


<canvas id="myCanvas" width="400" height="400" 
style="border:1px solid black;">
Sorry, your browser does not support the HTML5 canvas tag.
</canvas>
<canvas id="scoreCanvas" width="400" height="10" 
style="border:0px solid black;">
Sorry, your browser does not support the HTML5 canvas tag.
</canvas>
<!--<input name="keywords" type="text" id="keywords" size="5"> 

<progress id="pro" value="0" max="100"><div class="progress-bar">
<div>
<span style="width: 80%;">Progress: 80%</span>
</div>
</progress>-->

// ===================================================
//
//                       CSS
//
// ===================================================

*{
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-shadow:none;
text-rendering: optimizeLegibility;
}

// ===================================================
//
//              HOMEWORK REQUIREMENTS
//
// ===================================================

* DONE: Make the ball bounce off the left and right 
edges of the playfield, instead of "resetting".

* DONE: Add a scoring system! When the ball hits the
left edge, the right paddle earns a point, and
vice versa. Display each paddle's score, in
"bold 40px Arial", at the top of the playfield 

* DONE: Prevent the paddles from moving out of the
playfield, by having them "collide" with it.

* DONE (2/2) Let the user also move the paddles horizontally
i.e. left and right within 100 pixels of the edges,
using the 'A' and 'D' keys for the left paddle,
and   the 'J' and 'L' keys for the right paddle

* DONE: Add a second ball, with half the velocity 
of the first one.

// ===================================================
//
//                 EDITED / CHANGED
//
// ===================================================

* Global setup for easier modification on game.
* Collision improved: Balls collide exactly on edges and paddles.

// ===================================================
//
//                  ADDED / EXTRA
//
// ===================================================

* Cheat Codes (Homing Missle, Canon, Blind, Inverse, Mini me etc.)
* Cheat Codes also change the color scheme live
* Color Profiles
* Score Canvas
* More keys inputs
* Reset function (lazy)
* Winner Displayed at end
* Borders of Paddle 1 give various bounce
* BOOM function to remove weapons on hit (Missle/Cannon)

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

// ===================================================
//
//                  CANVASES
//
// ===================================================

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

var g_score = document.getElementById("scoreCanvas");
var g_scoreCtx = g_score.getContext("2d");

g_ctx.font = "bold 40px Arial";
g_ctx.textAlign = "center";

// ===================================================
//
//                  COLOR PROFILES
//      (Background / Player 1 / Player 2 / Balls)
//
// ===================================================

// Dark Gray - Pale Pink - Pale Blue - Pale Yellow
let pale = ["#333333", "#EDAFB8", "#95B8D1", "#E8DDB5"];
let retro = ["#E6E2D3", "#DAC292", "#B9936C", "#C4B7A6"];
let basic = ["#E6E6E6", "#297373", "#FF8552", "#39393A"];
let gimp = ["#ADD9F4", "#984447", "#476C9B", "#468C98"];
let pinky = ["#D81E5B", "#C6D8D3", "#FDF0D5", "#331832"];
let colorPalette = pale;
// TEST
function loadColors() {
    g_canvas.style.background = colorPalette[0];
    //
    let scoreScheme = g_scoreCtx.createLinearGradient(
        0, 0, g_canvas.width, g_score.height);
    
    scoreScheme.addColorStop(0, colorPalette[3]);
    scoreScheme.addColorStop(0.5, colorPalette[3]);
    scoreScheme.addColorStop(0.5,colorPalette[2]);
    scoreScheme.addColorStop(1, colorPalette[2]);

    g_scoreCtx.fillStyle = scoreScheme;

    g_paddle1.color = colorPalette[1];
    g_minime.color = colorPalette[1];
    g_score1.color = colorPalette[1];

    g_paddle2.color = colorPalette[2];
    g_score2.color = colorPalette[2];

    g_ball1.color = colorPalette[3];
    g_ball2.color = colorPalette[3];
}

// ===================================================
//
//            USER CUSTOMIZATION FOR GAME
//
// ===================================================

// How far paddles can go from "walls"
// Default: 100
// Description: Increment to increase distnace.
let LIMIT = 100;

// Default property values for paddles can be overwritten in constructor.
// Default: paddleWidth => 20, paddleHeight => 100.
// Description: Increment to make paddles larger.
let paddleWidth = 20;
let paddleHeight = 100;

// Default property values for paddle constructor.
// Default: 5
// Description: Modify the paddle speed
let paddleSpeed = 5;

// Default property values for Ball constructor.
// Default: 10
// Description: Increment to make ball larger
let ballRadius = 10;

// Main ball's values for X and Y speed.
// Default: ballSpeedX => 5, ballSpeedY => 4.
// Description: Increment values to speed up ball(s)
let ballSpeedX = 5;
let ballSpeedY = 4;

// Seconds ball's speed is multiplied by Main ball's speed
// Default: 0.5
// Description: // 0.5 => Half the speed, 2 => Twice the speed
let ballSpeedSlower = 0.5;

// Annoying, eh? Feel free to remove the prompt and just manually
// set the default score.
let maxScore = parseInt(prompt("How many points points for a win?", 50), 10);

// ==================================
//         KEYBOARD HANDLING
// ==================================

var g_keys = [];
var g_isUpdatePaused = false;

// Create variable for keys which have actions
let KEY_W, KEY_S, KEY_A, KEY_D, 
    KEY_I, KEY_K, KEY_J, KEY_L,
    KEY_PAUSE, KEY_STEP, KEY_QUIT,
    KEY_RESET, KEY_ENTER, KEY_BACKSP,
    KEY_RSHIFT;

// Function: initActionKeys
// Action:   Initilizes keys which have actions
function initActionKeys() {
    // Player 1 keys set
    KEY_W = 'W'.charCodeAt(0); // UP
    KEY_S = 'S'.charCodeAt(0); // DOWN
    KEY_A = 'A'.charCodeAt(0); // LEFT
    KEY_D = 'D'.charCodeAt(0); // RIGHT
    
    // Player 2 keys set
    KEY_I = 'I'.charCodeAt(0); // UP
    KEY_K = 'K'.charCodeAt(0); // DOWN
    KEY_J = 'J'.charCodeAt(0); // LEFT
    KEY_L = 'L'.charCodeAt(0); // RIGHT

    // Utilities
    KEY_PAUSE = 'P'.charCodeAt(0);  // TOGGLE PAUSE
    KEY_STEP  = 'O'.charCodeAt(0);  // STEP EACH FRAME
    KEY_QUIT  = 'Q'.charCodeAt(0);  // QUIT
    KEY_RESET = 'R'.charCodeAt(0);  // RESET
    KEY_BACKSP = 8;
    KEY_RSHIFT = 16;
    KEY_ENTER = 13;
}
initActionKeys();

// Function:  handleKeydown
// Parameter: evt
// Action:    When keys are pressed they become true
function handleKeydown(evt) {
    g_keys[evt.keyCode] = true;
    (g_keys[KEY_RESET] && requestedReset());
    //(g_keys[KEY_ENTER] && infoPage());
    (g_keys[KEY_ENTER] && enterCheat());
}

// Function:  handleKeyup
// Parameter: evt
// Action:    When keys are released they become false (default)
function handleKeyup(evt) {
    g_keys[evt.keyCode] = false;
    gatherInputs(String.fromCharCode(evt.keyCode));
}

// Function:  enterCheat
// Action:    Prompts user for cheatcodes
function enterCheat() {
    var x = prompt("Enter cheat (or color profiles)", "");
    (x !== null && cheatMaster(x.toUpperCase()));
    // Enter promts the users and accepts the inputs
    // So I had to manually "up" enter to avoid infinite prompts
    handleKeyup(KEY_ENTER);
}

// Function:  eatKey
// Parameter: keyCode
// Action:    Toggle for key (keyCode)
function eatKey(keyCode) {
    var isDown = g_keys[keyCode];
    g_keys[keyCode] = false;
    return isDown;
}

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);

// ==================================
//           Constructors
// ==================================

// Function:  ScoreBar (constructor)
// Parameter: descr
// Action:    ScoreBars that update with score
function ScoreBar(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Function:  Paddle (constructor)
// Parameter: descr
// Action:    Creates paddle with given values
function Paddle(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Function:  Ball (constructor)
// Parameter: descr
// Action:    Creates balls with given values
function Ball(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// ==================================
//          ScoreBar STUFF
// ==================================

ScoreBar.prototype.width = g_score.width / 2;
ScoreBar.prototype.height = g_score.height;
ScoreBar.prototype.color;

var g_score1 = new ScoreBar({
    cx : 0,
    cy : 0,
    size : 0
});

var g_score2 = new ScoreBar({
    cx : g_score.width,
    cy : 0,
    size : 0
});

ScoreBar.prototype.update = function () { 
    g_score1.size = g_paddle1.score * ((g_score.width / 2) / maxScore);
    g_score2.size = -(g_paddle2.score * (g_score.width / 2) / maxScore);
};

ScoreBar.prototype.render = function (g_scoreCtx) {
    g_scoreCtx.fillStyle = this.color;
    g_scoreCtx.fillRect(this.cx, this.cy, this.size, this.height);
    g_scoreCtx.font = "20px Arial";
    g_scoreCtx.fillStyle = "white";
    g_scoreCtx.fillText("P1", 0, 15);
    g_scoreCtx.fillText("P2", 375, 15);
};

// ==================================
//           PADDLE STUFF
// ==================================

Paddle.prototype.halfWidth = paddleWidth / 2;
Paddle.prototype.halfHeight = paddleHeight / 2;
Paddle.prototype.color;
Paddle.prototype.score = 0;

// Paddle 1 properties
var g_paddle1 = new Paddle({
    cx : 30,
    cy : 100,
    miX : g_canvas.width - g_canvas.width,
    maX : LIMIT,
    speed : paddleSpeed,
    
    GO_UP   : KEY_W,
    GO_DOWN : KEY_S,
    GO_LEFT : KEY_A,
    GO_RIGHT : KEY_D
});

// Paddle 2 properties
var g_paddle2 = new Paddle({
    cx : 370,
    cy : 300,
    miX : g_canvas.width - LIMIT,
    maX : g_canvas.width,
    speed : paddleSpeed,
    
    GO_UP   : KEY_I,
    GO_DOWN : KEY_K,
    GO_LEFT : KEY_J,
    GO_RIGHT : KEY_L
});

var g_minime = new Paddle({
    cx : -20,
    cy : -20,
    miX : g_canvas.width - g_canvas.width,
    maX : LIMIT,
    speed : paddleSpeed * 2
});

// Function:  Paddle.prototype.update
// Action:    Moves Paddles U / D / L / R
//            within limits and boarders
Paddle.prototype.update = function () {
    if (g_keys[this.GO_UP] && this.cy >= this.halfHeight) {
        this.cy -= this.speed;
    } else if (g_keys[this.GO_DOWN] && this.cy + this.halfHeight <= g_canvas.height) {
        this.cy += this.speed;
    }
    if (g_keys[this.GO_LEFT] && this.cx - this.halfWidth > this.miX) {
        this.cx -= this.speed;
    } else if (g_keys[this.GO_RIGHT] && (this.cx + this.halfWidth < (this.maX))) {
        this.cx += this.speed;
    }
};

// Function:  Paddle.prototype.render
// Action:    Randers paddles
Paddle.prototype.render = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.cx - this.halfWidth,
                this.cy - this.halfHeight,
                this.halfWidth * 2,
                this.halfHeight * 2);
};

// Function:  Paddle.prototype.collidesWith
// Action:    If anythings collides with paddles
//            Collides => True | Collides => False
Paddle.prototype.collidesWith = function (prevX, prevY, nextX, nextY, r) {
    // This fixes the collision (for the most part anyway)
    let xLeftEdge = this.cx - (this.halfWidth / 2);
    let xRightEdge = this.cx + (this.halfWidth / 2);
    let yUpperEdge = this.cy - (this.halfHeight / 2);
    let yLowerEdge = this.cy + (this.halfHeight / 2)
    // Check X coords
    if ((nextX - r <= xRightEdge && prevX - r >= xRightEdge) ||
        (nextX + r >= xLeftEdge && prevX + r <= xLeftEdge)) {
        // Check Y coords
        if ((nextY + r >= this.cy - this.halfHeight) &&
            (nextY - r <= this.cy + this.halfHeight)) {
            // It's a hit! (Ball colides with paddle)
            return true;
        }
    }
    // No collision
    return false;
};

// ==================================
//            BALL STUFF
// ==================================

Ball.prototype.radius = ballRadius;
Ball.prototype.color = colorPalette[3];

// Ball 1 properties
var g_ball1 = new Ball ({
    type: 'ball',
    cx: 50,
    cy: 198,

    xVel: ballSpeedX,
    yVel: ballSpeedY
});

// Ball 2 properties
var g_ball2 = new Ball ({
    type: 'ball',
    cx: 250,
    cy: 200,

    xVel: ballSpeedX * ballSpeedSlower,
    yVel: ballSpeedY * ballSpeedSlower
});

var g_cannon = new Ball ({
    type: 'weapon',
    desc: 'cannon',
    cx: g_paddle1.cx,
    cy: g_paddle1.cy,
    radius: 0,

    xVel: 0,
    yVel: 0
});

var g_missle = new Ball ({
    type: 'weapon',
    desc: 'missle',
    cx: g_paddle1.cx,
    cy: g_paddle1.cy,
    radius: 0,

    xVel: 0,
    yVel: 2
});

// Draw ball
Ball.prototype.render = function (ctx) {
    ctx.fillStyle = this.color;
    fillCircle(ctx, this.cx, this.cy, this.radius);
};

Ball.prototype.update = function () {
    // Temporarily remember old position
    var prevX = this.cx;
    var prevY = this.cy;
    // Get next position
    var nextX = prevX + this.xVel;
    var nextY = prevY + this.yVel;

    g_minime.cy = g_ball1.cy;
    // If a 'weapon' is activated
    if (this.type == 'weapon') {
        // If they hit paddle 2 the shrink it
        // Making it 'virtually' none and the weapon dissapears
        if (g_paddle2.collidesWith(prevX, prevY, nextX, nextY, this.radius)) {
            g_paddle2.halfHeight = 0;
            g_paddle2.halfWidth = 0;
            this.boom();
        }
        // If it's a missle, it chases paddle 2 and dissapears
        if (this.desc == 'missle') {
            (this.cy < g_paddle2.cy) ? this.cy += 2 : this.cy -= 2;
            if (this.cx + this.radius == g_canvas.width) {
                this.boom();
            }
        }
        // If a weapon hits the wall behind paddle 2 it dissapears
        if (nextX >= g_canvas.width - this.radius / 2) {
            this.boom();
        }
    }

    // PADDLE BOUNCE
    // PADDLE 1 || PADDLE 2
    if (g_paddle1.collidesWith(prevX, prevY, nextX, nextY, this.radius) ||
        g_paddle2.collidesWith(prevX, prevY, nextX, nextY, this.radius))
    {
        let xPaddleLow = ((this.cx >= g_paddle1.cx + (g_paddle1.halfWidth / 2)) && 
                  (this.cx - 20 <= g_paddle1.cx + (g_paddle1.halfWidth / 2)));

        let yLR = (this.cy > g_paddle1.cy + (g_paddle1.halfHeight / 2)) && 
                  (this.cy - 20 < g_paddle1.cy + (g_paddle1.halfHeight / 2));

        let yLL = (this.cy < g_paddle1.cy - (g_paddle1.halfHeight / 2)) && 
                  (this.cy > 20 - g_paddle1.cx - (g_paddle1.halfHeight / 2));

        // Paddle 1 has special bounce features
        // Very top and bottom of it make the ball
        // Go completely the other way
        if ((xPaddleLow && (yLR || yLL))) { this.yVel *= -1; }
        this.xVel *= -1;   
    }

    if (g_minime.collidesWith(prevX, prevY, nextX, nextY, this.radius)) {
        this.xVel *= -1;
    }

    // EDGE BOUNCE
    // TOP || BOTTOM
    if (nextY - (Math.floor(this.yVel) / 2) <= this.radius ||
        (nextY > g_canvas.height - this.radius)) 
    {
            this.yVel *= -1;
    }
    // EDGE BOUNCE
    // LEFT || RIGHT
    if (nextX - (Math.floor(this.xVel) / 2) <= this.radius || 
        nextX > g_canvas.width - this.radius)
    {
        this.xVel *= -1;
    }

    // Ball collides with right edge, increment Paddle 1 score by 1
    (this.cx >= g_canvas.width - this.radius) && g_paddle1.score++;
    // Player 1 wins if the score reaches limit
    (g_paddle1.score === maxScore) && (g_keys[KEY_QUIT] = true);

    // Ball collides with right left, increment Paddle 2 score by 1
    (this.cx <= this.radius) && g_paddle2.score++;
    // Player 2 wins if the score reaches limit

    (g_paddle2.score === maxScore) && (g_keys[KEY_QUIT] = true);
    // Reset if we fall off the left or right edges
    // ...by more than some arbitrary `margin`
    //
    var margin = 4 * this.radius;
    if (nextX < -margin || 
        nextX > g_canvas.width + margin) {
        this.reset();
    }

    // Missle chases player 2
    if (this.type != 'missle') {
        this.cx += this.xVel;
        this.cy += this.yVel;
    }
};

Ball.prototype.reset = function () {
    this.cx = 300;
    this.cy = 100;
    this.xVel = -5;
    this.yVel = 4;
};

Ball.prototype.boom = function () {
    this.radius = 0;
    this.cx = g_paddle1.cx;
    this.cy = g_paddle1.cy;
    this.xVel = 0;
    this.yVel = 0;
};

// ==================================
//              UTILS
// ==================================

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function fillCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

// ==================================
//          GATHER INPUTS
// ==================================

// Store all inputs to a string
let gatherInp = "";

// Function:  gatherInputs
// Parameter: inp
// Action:    Put inputs into gatherInp and the latest 4 inputs to cheatMaster
function gatherInputs(inp) {
    (inp != undefined) && (gatherInp += inp);
    (inp != undefined) && cheatMaster(gatherInp.substring(gatherInp.length - 4));
}

// ==================================
//         UPDATE SIMULATION
// ==================================

function updateSimulation() {
    if (shouldSkipUpdate()) return;
    g_ball1.update();
    g_ball2.update();
    g_cannon.update();
    g_missle.update();
    g_paddle1.update();
    g_paddle2.update();
    g_minime.update();
    g_score1.update();
    g_score2.update();
}

// Function: shouldSkipUpdate
// Action:   Pause Game
function shouldSkipUpdate() {
    if (eatKey(KEY_PAUSE)) {
        g_isUpdatePaused = !g_isUpdatePaused;
    }
    return g_isUpdatePaused && !eatKey(KEY_STEP);    
}

// ==================================
//         RENDER SIMULATION
// ==================================

function renderSimulation(ctx) {
    clearCanvas(ctx);
    g_ball1.render(ctx);
    g_ball2.render(ctx);
    g_cannon.render(ctx);
    g_missle.render(ctx);
    g_paddle1.render(ctx);
    g_paddle2.render(ctx);
    g_minime.render(ctx);
    g_score1.render(g_scoreCtx);
    g_score2.render(g_scoreCtx);
    g_ctx.fillStyle = colorPalette[1];
    g_ctx.fillText(g_paddle1.score, 100, 100);
    g_ctx.fillStyle = colorPalette[2];
    g_ctx.fillText(g_paddle2.score, 300, 100);
}

// ==================================
//          MEGA CHEATS
// ==================================

function initCannon() {
    g_cannon.cx = g_paddle1.cx;
    g_cannon.cy = g_paddle1.cy;
    g_cannon.radius = 10;
    
    g_cannon.xVel = 5;
    g_cannon.yVel = 0
}

function initMissle() {
    g_missle.cx = g_paddle1.cx;
    g_missle.cy = g_paddle1.cy;
    g_missle.radius = 10;

    g_missle.xVel = 2;
    g_missle.yVel = 0
}

function inverseMove() {
    g_paddle2.GO_DOWN = KEY_I;
    g_paddle2.GO_UP = KEY_K;
    g_paddle2.GO_LEFT = KEY_L;
    g_paddle2.GO_RIGHT = KEY_J;
}

function theGogglesDoNothing() {
    g_paddle2.color = colorPalette[0];
}

function ohBehave() {
    g_minime.cx = 5;
    g_minime.halfHeight /= 2;
    g_minime.halfWidth /= 2;
    g_minime.color = g_paddle1.color;
}

function setColorProfile(color) {
    colorPalette = color;
    loadColors();
}

function cheatMaster(cS) {
    // Player 1 gets additional 10 points
    (cS === "PTEN") && (g_paddle1.score += 10);
    // Player 2 score inversed
    (cS === "NOOB") && (g_paddle2.score *= -1);
    // Player 2 vertical height reduced by half
    (cS === "MINI") && (g_paddle2.halfHeight /= 2);
    // Playe 1 vertical height is doubled
    (cS === "HUGE") && (g_paddle1.halfHeight *= 2);
    // Player 2 speed reduced by half
    (cS === "SLOW") && (g_paddle2.speed /= 2);
    // Player 2 speed doubled
    (cS === "FAST") && (g_paddle1.speed *= 2);
    // Player 2 moves are inversed
    (cS === "INVE" || cS === "INVERSE") && (inverseMove());
    // HOMING MISSLE - kills player 2 on impact
    (cS === "HMMS" || cS === "MISSLE") && (initMissle());
    // CANNON - kills player 2 on impact
    (cS === "BOOM") && (initCannon());
    // Player 1 Wins
    (cS === "IWIN") && (g_paddle1.score = maxScore);
    // Player 2 becomes invisible
    (cS === "MEYE" || cS === "MYEYES") && (theGogglesDoNothing());
    // Activates "Mini Me"
    (cS === "MINIME") && (ohBehave());
    // Color change
    (cS === "PALE") && setColorProfile(pale);
    (cS === "RETRO") && setColorProfile(retro);
    (cS === "BASIC") && setColorProfile(basic);
    (cS === "GIMP") && setColorProfile(gimp);
    (cS === "PINKY") && setColorProfile(pinky);
}

// ==================================
//             MAINLOOP
// ==================================

// Function: mainIter
// Action:   While users hasn't requested to quit the game
//           runs continuously, else stops game and calls gameWinner(). 
function mainIter() {
    if (!requestedQuit()) {
        gatherInputs();
        updateSimulation();
        renderSimulation(g_ctx);
    } else {
        gameWinner();
        window.clearInterval(intervalID);
    }
}

// Function: requestedQuit
// Action:   Stops game on request ('Q')
function requestedQuit() {
    return g_keys[KEY_QUIT];
}

// Function: gameWinner
// Action:   Prints winner on screen when game 'quits'
function gameWinner() {
    let winnerResult = (g_paddle1.score > g_paddle2.score ? 1 : 
     g_paddle1.score < g_paddle2.score ? 2 : 0);
    let winnerMessage = "Player " + winnerResult + " won!";
    if (winnerResult === 1) {
        g_ctx.fillStyle = colorPalette[1];
        g_ctx.fillText(winnerMessage, g_canvas.width/2, g_canvas.height/2);
    } else if (winnerResult === 2) {
        g_ctx.fillStyle = colorPalette[2];
        g_ctx.fillText(winnerMessage, g_canvas.width/2, g_canvas.height/2);
    } else {
        g_ctx.fillStyle = colorPalette[3];
        g_ctx.fillText("Tie", g_canvas.width/2, g_canvas.height/2);
    }
}

// Function: (lazy) requestedReset
// Action:   Reloads game on request ('R')
function requestedReset() {
    location.reload();
}

// Action:   Set 'timer' (refresh rate) for main function (mainIter)
var intervalID = window.setInterval(mainIter, 16.666);

// Action:   Sets focus on game when loaded
window.focus();
loadColors();