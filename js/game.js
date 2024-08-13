let canvas;
let world;
let keyboard = new Keyboard();

function init() {
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
  world.character.musicEnabled = false;
  world.character.audio_elements.background_music.pause();
}

function enableSound() {
  document.getElementById("enableSound").classList.add("d-none");
  document.getElementById("disableSound").classList.remove("d-none");
  world.character.musicEnabled = true;
  world.playBackgroundMusic();
}



function pauseGame() {
  document.getElementById("enableSound").classList.remove("d-none");
  document.getElementById("disableSound").classList.add("d-none");
  world.character.audio_elements.background_music.pause();
  document.getElementById('pauseGame').classList.add("d-none");
  document.getElementById('unpauseGame').classList.remove("d-none");
  setSpeedToZero();
}

function unpauseGame() {
  if (world.character.musicEnabled) {
    enableSound();
  }
  document.getElementById('pauseGame').classList.remove("d-none");
  document.getElementById('unpauseGame').classList.add("d-none");
  resetSpeed();
}

function startGame() {
  document.getElementById("overlay").classList.add("d-none");
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  enableSound();
  setSpeedToZeroExceptCharacter();
  setTimeout(resetSpeedExceptCharacter(), 2000);
}

function setSpeedToZero() {
  world.character.pause();
  world.level.clouds.forEach((cloud) => {
    cloud.pause();
  });
  world.level.enemies.forEach((enemy) => {
    enemy.pause();
  });
}

function setSpeedToZeroExceptCharacter() {
  world.level.clouds.forEach((cloud) => {
    cloud.pause();
  });
  world.level.enemies.forEach((enemy) => {
    enemy.pause();
  });
}

function resetSpeed() {
  world.character.unpause();
  world.level.clouds.forEach((cloud) => {
    cloud.unpause();
  })
  world.level.enemies.forEach((enemy) => {
    enemy.unpause();
  })
}

function resetSpeedExceptCharacter() {
  world.level.clouds.forEach((cloud) => {
    cloud.unpause();
  })
  world.level.enemies.forEach((enemy) => {
    enemy.unpause();
  })
}

