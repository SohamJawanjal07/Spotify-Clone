console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  {songName: "Warriyo - Mortals (feat, Laura Brehan)", filePath:"song/1.mp3", coverPath: "1.jpg"},
  {songName: "Cielo - Huma-Huma", filePath:"song/2.mp3", coverPath: "2.jpg"},
  {songName: "DEAF KEV - Invinciable", filePath:"song/3.mp3", coverPath: "3.jpg"},
  {songName: "Janji-Heroes-Tonighr-feat", filePath:"song/4.mp3", coverPath: "4.jpg"},
  {songName: "Rabba", filePath:"song/5.mp3", coverPath: "5.jpg"},
  {songName: "Sakhiyaan", filePath:"song/6.mp3", coverPath: "6.jpg"},
  {songName: "Bhula dena", filePath:"song/7.mp3", coverPath: "7.jpg"},
  {songName: "Tumhari Kasam", filePath:"song/8.mp3", coverPath: "8.jpg"}
];

// Populate song items
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
  }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset all play buttons
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
  });
};

// Individual song play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
  element.addEventListener('click', (e) => {
    makeAllPlays();
    songIndex = i;
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioElement.src = songs[songIndex].filePath;
    if (masterSongName) masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
  });
});

// Next button
document.getElementById('next').addEventListener('click', () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;
  if (masterSongName) masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = songs[songIndex].filePath;
  if (masterSongName) masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
});