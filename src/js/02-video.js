import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

// Salvarea timpului curent în Local Storage, limitat la o dată pe secundă
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
