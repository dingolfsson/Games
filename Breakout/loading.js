// ================================================
//              Preload Screen
//          While the background audio is
//      downloading, don't start the game until
//           it's finished loading.
//          Shows rotation wheel While
//                 loading
// ================================================

var overlay = document.getElementById("overlay");
var audio = new Audio('https://notendur.hi.is/dai5/Breakout/media/Audio/EugeneTheDream-HitThatSuperMario.mp3');

window.addEventListener('load', function(){
  overlay.style.display = 'none';
})

// ================================================
//        Play the Background audio (once)
// ================================================

audio.play();
