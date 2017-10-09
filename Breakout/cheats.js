// If Enter is pressed at ANY time
// Cheat prompter appears
// (same with Spacebar)
window.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === KEY_ENTER) {
      enterCheat();
    }
    if (key === KEY_SPACE) {
        PewPew();
    }
});

// ================================================
//             Audio Files for Cheats
// ================================================

var batman = new Audio('media/Audio/im-batman.mp3');
var ballsofsteel = new Audio('media/Audio/ballsofsteel.mp3');
var drill = new Audio('media/Audio/drill.mp3');
var lazer = new Audio('media/Audio/lazer.mp3');

// ================================================
//               Cheat Prompter
//             Activated by Enter
// ================================================

function enterCheat() {
    var x = prompt("Enter cheat", "");
    (x !== null && cheatMaster(x.toUpperCase()));
    // Enter promts the users and accepts the inputs
    // So I had to manually "up" enter to avoid infinite prompts
    handleKeyup(KEY_ENTER);
}

// ================================================
//             Cheat Codes Function
//        Activate Cheat if Code is correct
// ================================================

function cheatMaster(code) {
    // Bat becomes bigger
    (code === "BIGGER") && (Bigger());
    // Batman has joined the game
    (code === "BATMAN") && (batman.play());
    // Activate hard mode
    (code === "HARDCORE") && (thisIsEasy());
    // Shoot bullts
    (code === "TOMMYGUN") && (PewPew());
    // Major Lazer
    (code === "LAZER") && (Lazer());
}

// ================================================
//                BIGGER CHEAT
//          Makes the Bat Twice as Big
//           And Doubles the Bat Speed
// ================================================

function Bigger() {
    g_bat.halfWidth *= 2;
    g_bat.xVel *= 2;
}

// ================================================
//                HARDCORE CHEAT
//            Halves the Size of Bat
//            Doubles Ball Speed X/Y
// ================================================

function thisIsEasy() {
    g_bat.halfWidth /= 2;
    g_ball[0].xVel *= 2;
    g_ball[0].yVel *= 2;
    ballsofsteel.play();
}

// ================================================
//                PEWPEW CHEAT
//             Activates Tommy Gun
//          Shoots 'bullets' from Bat
// ================================================

function PewPew() {
    drill.play();
    for (var i = 1; i < 10; i++) {
        g_ball[i] = new Ball({
            cx: g_bat.cx-5,
            cy: g_bat.cy-5 - i*10,
            xVel: 0,
            yVel: -10,
            radius: 3,
            name: 'bullet'
        });
    }
}

// ================================================
//                LAZER CHEAT
//             Activates LAZER BEAM
//           Shoots 'lazer' from Bat
// ================================================

function Lazer() {
    lazer.play();
    for (var i = 1; i < g_brick.length + 1; i++) {
        g_ball[i] = new Ball({
            cx: g_bat.cx-5,
            cy: g_bat.cy-5,
            xVel: 0,
            yVel: -1000,
            radius: 1,
            name: 'bullet'
        });
    }
}
