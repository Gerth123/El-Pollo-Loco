let canvas;
let world;
let keyboard = new Keyboard(); 

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
})

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})

function fullscreen() {
    let fullscreen = document.getElementById("fullscreen");
    openFullscreen(fullscreen);
    document.getElementById("fullscreenFalse").classList.add("d-none");
    document.getElementById("fullscreenTrue").classList.remove("d-none");
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    document.getElementById("fullscreenFalse").classList.remove("d-none");
    document.getElementById("fullscreenTrue").classList.add("d-none");
  }

  function disableSound() {
    document.getElementById("enableSound").classList.remove("d-none");
    document.getElementById("disableSound").classList.add("d-none");
  }

  function enableSound() {
    document.getElementById("enableSound").classList.add("d-none");
    document.getElementById("disableSound").classList.remove("d-none");
  }