function Powerups() {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Powerups.prototype.update = function (du) {
    if (this.active) {
        this.cy += this.yVel * du;
    }
};

Powerups.prototype.render = function (ctx) {

};

Powerups.prototype.hasPowerup = function (x, y, du) {

};

Powerups.prototype.MajorLazer = function () {
    if (eatKey(fire) && g_bat.MajorLazer) {
        console.log("MajorLazer");
    }
};

Powerups.prototype.TommyGun = function () {
    if (eatKey(fire) && g_bat.TommyGun) {
        console.log("Pew Pew!");
    }
};

Powerups.prototype.Bigger = function () {
    if (g_bat.bigger) {
        g_bat.halfWidth += 10;
    }
};

Powerups.prototype.Nuke = function () {
    if (g_bat.nuke) {
        console.log("Radio Active");
    }
};

Powerups.prototype.BrickDontStopme = function () {
    if (g_bat.bdsm) {
        console.log("Bricks dont stop me");
    }
};

Powerups.prototype.Hailmary = function () {
    if (g_bat.mary) {
        console.log("Come with me, HAIL MARY");
    }
};

Powerups.prototype.Meow = function () {
    if (g_bat.ninelives) {
        console.log("Meeow!");
    }
};

Powerups.prototype.OneUp = function () {
    if (g_bat.lives) {
        console.log("One up lives");
    }
};


Powerups.prototype.Extinction = function () {
    if (g_bat.extinction) {
        console.log("Asteroid falls from the sky, killing all");
    }
};
