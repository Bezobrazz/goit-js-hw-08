import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

const storedTime = localStorage.getItem('videoplayer-current-time');
if (storedTime) {
  player.setCurrentTime(parseFloat(storedTime));
}

const updatePlaybackTime = throttle(currentTime => {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

player.on('timeupdate', data => {
  const currentTime = data.seconds;
  updatePlaybackTime(currentTime);
  console.log('Time updated:', currentTime);
});
