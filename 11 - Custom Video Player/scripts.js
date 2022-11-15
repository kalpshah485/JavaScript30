const player = document.querySelector('.player');
const video = player.querySelector('video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const fsButton = player.querySelector('#fs_button');
const ranges = player.querySelectorAll('.player__slider');

video.autoplay = true;

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function handleProgress() {
  progressBar.style.flexBasis = `${video.currentTime / video.duration * 100}%`
}

function handleRangeUpdate(e) {
  const { name, value } = e.target;
  video[name] = value;
  console.log(name, value);
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleFullScreen() {
  if (!document.webkitIsFullScreen) {
    video.requestFullscreen()
  }
}

video.addEventListener('click', togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);


toggle.addEventListener('click', togglePlay);

skipButtons.forEach(skipButton => {
  skipButton.addEventListener("click", skip)
})

let rangeMouseDown = false

ranges.forEach(range => {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("mousemove", (e) => rangeMouseDown && handleRangeUpdate(e));
  range.addEventListener("mousedown", () => rangeMouseDown = true);
  range.addEventListener("mouseup", () => rangeMouseDown = false);
})

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);

fsButton.addEventListener("click", handleFullScreen);