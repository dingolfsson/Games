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

// ================================================
//              User Key Functions
// A => Left
// D => Right
// SpaceBar => Tommy Gun
// Enter => Cheat Prompter
// ================================================
var KEY_A = 'A'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);
var KEY_SPACE = ' '.charCodeAt(0);
var KEY_ENTER = 13;
var g_keys = [];

// ================================================
//                User Score
// ================================================

var score = 0;

// ================================================
//             Create the Paddle
//      (can be made an array to allow 2P)
// ================================================
var g_bat = new Bat({
    cx : g_canvas.width / 2,
    cy : g_canvas.height - 25,
    xVel : 5,
    lives : 3,

    GO_LEFT   : KEY_A,
    GO_RIGHT  : KEY_D,
    GO_SPACE  : KEY_SPACE
});

// ================================================
//            Create the Ball(s)
//     The Idea was to Create Many Balls Powerup
// ================================================

var g_ball = [];
g_ball[0] = new Ball({
    cx: 200,
    cy: 200,
    xVel: 5,
    yVel: 4,
    radius: 6
});

// ================================================
//            Create the Bricks Array
//       Better explaination why I went within
//          1D array instead of 2D array
// ================================================

var bricksID = 0;
var g_brick = [];
var rows = 10;
var cols = 12;

// ================================================
//            Color Scheme for Bricks
// ================================================
var brickColors = ["#D35F5F",
"#D39061", "#CEC35F", "#A0CC5F", "#5EC96B", "#5EC9AC",
"#5CA8C4", "#5962BF", "#8558BC", "#BC58B4", "#BA5773",
"#4EE06E", "#E2D66A","#CE77D8", "#7AAADD"]

// Bricks initilized (Array)
// I used a single dimensional array for few reasons
// 1. I forgot a if statement for the collition so I had to
//  write the 60% code again.. funtimes.
// 2. I have a 2D 'properties' on the single dimensional Array
// 3. I had my midterms last week, I got in total 2 days to write the
//    entire thing, I wrote what I knew would work flawlessly-ish.
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
    };
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
