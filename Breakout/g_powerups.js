// This was entirely skipped
// I opted for cheat codes instead

// Function:  Powerups (constructor)
// Parameter: descr
// Action:    Creates balls with given values
function Powerups() {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// ================================================
//              Update Function
// ================================================

Powerups.prototype.update = function (du) {
    if (this.active) {
        this.cy += this.yVel * du;
    }
};

// ================================================
//             Render Function
// ================================================

Powerups.prototype.render = function (ctx) {

};

// ================================================
//             HasPowerUp Function
//       True if Bat Catches the Powerup
// ================================================

Powerups.prototype.hasPowerup = function (x, y, du) {

};

// ================================================
//               MajorLazer Function
//           If the power up is Major Lazer
//              Activate Lazer for Bat
// ================================================

Powerups.prototype.MajorLazer = function () {
    if (eatKey(fire) && g_bat.MajorLazer) {
        console.log("MajorLazer");
    }
};

// ================================================
//               TommyGun Function
//           If the power up is TommyGun
//              Activate TommyGun for Bat
// ================================================

Powerups.prototype.TommyGun = function () {
    if (eatKey(fire) && g_bat.TommyGun) {
        console.log("Pew Pew!");
    }
};

// ================================================
//               Bigger Function
//           If the power up is Bigger
//             Increase Bat Size by 10px
// ================================================

Powerups.prototype.Bigger = function () {
    if (g_bat.bigger) {
        g_bat.halfWidth += 10;
    }
};

// ================================================
//               Nuke Function
//           If the power up is Nuke
//             Bat can now use WMD
//      Active => Shoots Nuke at Bricks
//                Kills all within 50 px range
// ================================================

Powerups.prototype.Nuke = function () {
    if (g_bat.nuke) {
        console.log("Radio Active");
    }
};

// ================================================
//               BrickDontStopme Function
//           If the power up is BrickDontStopme
//              Ball goes through Bricks
// ================================================

Powerups.prototype.BrickDontStopme = function () {
    if (g_bat.bdsm) {
        console.log("Bricks dont stop me");
    }
};

// ================================================
//               Hailmary Function
//           If the power up is Hailmary
// Active => 20 'hails' (balls)
//           Fall from the 'sky' (top) and cause
//           1 damage to bricks (and then die)
// ================================================

Powerups.prototype.Hailmary = function () {
    if (g_bat.mary) {
        console.log("Come with me, HAIL MARY");
    }
};

// ================================================
//               Meow Function
//           If the power up is Meow
//         Bat gets 9 'mini' bricks behind
//       which have 1 hitpoint and give users
//                 9 'saves'
// ================================================

Powerups.prototype.Meow = function () {
    if (g_bat.ninelives) {
        console.log("Meeow!");
    }
};

// ================================================
//               OneUp Function
//           If the power up is OneUp
//             Bats get +1 lives
// ================================================

Powerups.prototype.OneUp = function () {
    if (g_bat.lives) {
        console.log("One up lives");
    }
};

// ================================================
//               Extinction Function
//           If the power up is Extinction
//         Asteroid falls from the sky ('top')
//           and kills all brick on contact
//              (can also kill Bat)
// ================================================

Powerups.prototype.Extinction = function () {
    if (g_bat.extinction) {
        console.log("Asteroid falls from the sky, killing all");
    }
};
