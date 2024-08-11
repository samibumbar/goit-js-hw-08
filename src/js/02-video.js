// // scripts.js
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// Selectează iframe-ul și creează instanța playerului Vimeo
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

// Definește cheia pentru Local Storage
const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

// Salvarea timpului curent în Local Storage
player.on(
  'timeupdate',
  throttle(event => {
    localStorage.setItem(LOCAL_STORAGE_KEY, event.seconds);
  }, 1000)
);

// Setează timpul curent la ultima valoare salvată
const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedTime) {
  player.setCurrentTime(savedTime).catch(error => {
    console.error('Eroare la setarea timpului curent:', error);
  });
}

// Funcție pentru a centra iframe-ul
function centerIframe() {
  const iframe = document.querySelector('#vimeo-player');

  // Setează stilurile pentru a centra iframe-ul
  iframe.style.position = 'absolute';
  iframe.style.top = '50%';
  iframe.style.left = '50%';
  iframe.style.transform = 'translate(-50%, -50%)';

  iframe.style.width = '640px';
  iframe.style.height = '360px';
}

window.addEventListener('load', centerIframe);
