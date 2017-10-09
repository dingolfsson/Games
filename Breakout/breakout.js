/*

Supporting timer-events (via setInterval) *and* frame-events (via requestAnimationFrame)
adds significant complexity to the the code.

I can simplify things a little by focusing on the latter case only (which is the
superior mechanism of the two), so let's try doing that...

The "MAINLOOP" code, inside g_main, is much simplified as a result.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var KEY_A = 'A'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);
var KEY_SPACE = ' '.charCodeAt(0);
var g_keys = [];

// Bat (paddle) initilized
var g_bat = new Bat({
    cx : g_canvas.width / 2,
    cy : g_canvas.height - 25,
    xVel : 5,
    lives : 3,

    GO_LEFT   : KEY_A,
    GO_RIGHT  : KEY_D,
    GO_GOGADET: KEY_SPACE
});

var g_ballCount = 0;
var g_ball = [];
g_ball[0] = new Ball({
    cx: 100,
    cy: 400,
    xVel: 5,
    yVel: 4,
    radius: 6
});

var bricksID = 0;
var g_brick = [];
var rows = 10;
var cols = 12;
var brickColors = ["#D35F5F",
"#D39061", "#CEC35F", "#A0CC5F", "#5EC96B", "#5EC9AC",
"#5CA8C4", "#5962BF", "#8558BC", "#BC58B4", "#BA5773",
"#4EE06E", "#E2D66A","#CE77D8", "#7AAADD"]

// Bricks initilized (Array)
for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
        var hitpoints = Math.floor(Math.random() * 0 + 1);
        var hitpoints = 1;
        g_brick[bricksID] = new Brick({
            cx: 25+(j*50),
            cy: 30+(18*i),
            hp: hitpoints,
            color: brickColors[i],
            powerup: Math.floor(Math.random() * 10 + 1),
            alive: true,
            id: bricksID,
            arr: [i, j]
        });
        bricksID++;
    }
}
// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    g_bat.update(du);
    for (var i = 0; i < g_ball.length; i++) {
        g_ball[i].update(du);
    }
    for (var i = 0; i < g_brick.length; i++) {
        g_brick[i].update(du);
    }
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {
    g_bat.render(ctx);
    for (var i = 0; i < g_ball.length; i++) {
        g_ball[i].render(ctx);
    }
    for (var j = 0; j < g_brick.length; j++) {
        if (g_brick[j].alive) {
            g_brick[j].render(ctx);
        }
    }
}

// Kick it off
g_main.init();
