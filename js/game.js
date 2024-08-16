let canvas;
let world;
let keyboard = new Keyboard();

/**
 * This function is used to initialize the game.
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  pauseGame();
}

/**
 * This event is used to add events for the specific buttons on desktop if they are pressed.
 */
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

/**
 * This event is used to add events for the specific buttons on desktop if they are released.
 */
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

/**
 * This function is used to set the state of the keyboard for mobile devices if the button is pressed.
 * @param {string} key - the name of the button.
 */
function setKeyTrue(key) {
  if (key == "RIGHT") {
    keyboard.RIGHT = true;
  } else if (key == "LEFT") {
    keyboard.LEFT = true;
  } else if (key == "UP") {
    keyboard.UP = true;
  } else if (key == "SPACE") {
    keyboard.SPACE = true;
  } else if (key == "D") {
    keyboard.D = true;
  }
}

/**
 * This function is used to set the state of the keyboard for mobile devices if the button is released.
 * 
 * @param {string} key - the name of the button. 
 */
function setKeyFalse(key) {
  if (key == "RIGHT") {
    keyboard.RIGHT = false;
  } else if (key == "LEFT") {
    keyboard.LEFT = false;
  } else if (key == "UP") {
    keyboard.UP = false;
  } else if (key == "SPACE") {
    keyboard.SPACE = false;
  } else if (key == "D") {
    keyboard.D = false;
  }
}

/**
 * This function is used to change the fullscreen icon.
 */
function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  openFullscreen(fullscreen);
  document.getElementById("fullscreenFalse").classList.add("d-none");
  document.getElementById("fullscreenTrue").classList.remove("d-none");
}

/**
 * This function is used to open the fullscreen mode.
 * 
 * @param {HTMLElement} elem - The element that should be in fullscreen mode.
 */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/**
 * This function is used to close the fullscreen mode and change the icon.
 */
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

/**
 * This function is used to disable the sound.
 */
function disableSound() {
  document.getElementById("enableSound").classList.remove("d-none");
  document.getElementById("disableSound").classList.add("d-none");
  world.character.musicEnabled = false;
  Object.values(world.character.audio_elements).forEach((element) => {
    if (element && typeof element.pause === 'function') {
      element.pause();
    }
  });
}

/**
 * This function is used to enable the sound.
 */
function enableSound() {
  document.getElementById("enableSound").classList.add("d-none");
  document.getElementById("disableSound").classList.remove("d-none");
  world.character.musicEnabled = true;
  world.playBackgroundMusic();
}

/**
 * This function is used to pause the game.
 */
function pauseGame() {
  document.getElementById("enableSound").classList.remove("d-none");
  document.getElementById("disableSound").classList.add("d-none");
  world.character.audio_elements.background_music.pause();
  document.getElementById('pauseGame').classList.add("d-none");
  document.getElementById('unpauseGame').classList.remove("d-none");
  setSpeedToZero();
}

/**
 * This function is used to unpause the game.
 */
function unpauseGame() {
  if (world.character.musicEnabled) {
    enableSound();
  }
  document.getElementById('pauseGame').classList.remove("d-none");
  document.getElementById('unpauseGame').classList.add("d-none");
  resetSpeed();
}

/**
 * This function is used to start the game.
 */
function startGame() {
  canvas.classList.remove('transparent');
  document.getElementById('panelUnderCanvas').classList.remove("transparent");
  document.getElementById("overlay").classList.add("d-none");
  enableSound();
  setTimeout(() => {
    unpauseGame();
  }, 500);

}

/**
 * This function is used to set the speed of the movable objects to zero.
 */
function setSpeedToZero() {
  world.character.pause();
  world.level.clouds.forEach((cloud) => {
    cloud.pause();
  });

  world.level.enemies.forEach((enemy) => {
    if (enemy !== world.class_endboss) {
      enemy.pause();
    } else if (enemy == world.class_endboss) {
      enemy.pauseGame();
    }
  });
}

/**
 * This function is used to set the speed of the movable objects to zero except the character.
 */
function setSpeedToZeroExceptCharacter() {
  world.level.clouds.forEach((cloud) => {
    cloud.pause();
  });
  world.level.enemies.forEach((enemy) => {
    if (enemy !== world.class_endboss) {
      enemy.pause();
    } else if (enemy == world.class_endboss) {
      enemy.pauseGame();
    }
  });
}

/**
 * This function is used to reset the speed of the movable objects.
 */
function resetSpeed() {
  world.character.unpause();
  world.level.clouds.forEach((cloud) => {
    cloud.unpause();
  })
  world.level.enemies.forEach((enemy) => {
    enemy.unpause();
  })
}

/**
 * This function is used to reset the speed of the movable objects except the character.
 */
function resetSpeedExceptCharacter() {
  world.level.clouds.forEach((cloud) => {
    cloud.unpause();
  })
  world.level.enemies.forEach((enemy) => {
    enemy.unpause();
  })
}

/**
 * This function is used to disable the sound on mobile devices.
 */
function disableSoundMobile() {
  document.getElementById("enableSoundMobile").classList.remove("d-none");
  document.getElementById("disableSoundMobile").classList.add("d-none");
  world.character.musicEnabled = false;
  Object.values(world.character.audio_elements).forEach((element) => {
    if (element && typeof element.pause === 'function') {
      element.pause();
    }
  });
}

/**
 * This function is used to enable the sound on mobile devices.
 */
function enableSoundMobile() {
  document.getElementById("enableSoundMobile").classList.add("d-none");
  document.getElementById("disableSoundMobile").classList.remove("d-none");
  world.character.musicEnabled = true;
  world.playBackgroundMusic();
}


/**
 * This function is used to pause the game on mobile devices.
 */
function pauseGameMobile() {
  document.getElementById("enableSoundMobile").classList.remove("d-none");
  document.getElementById("disableSoundMobile").classList.add("d-none");
  world.character.audio_elements.background_music.pause();
  document.getElementById('pauseGameMobile').classList.add("d-none");
  document.getElementById('unpauseGameMobile').classList.remove("d-none");
  setSpeedToZero();
}

/**
 * This function is used to unpause the game on mobile devices.
 */
function unpauseGameMobile() {
  if (world.character.musicEnabled) {
    enableSound();
  }
  document.getElementById('pauseGameMobile').classList.remove("d-none");
  document.getElementById('unpauseGameMobile').classList.add("d-none");
  resetSpeed();
}