//Song details data
const songDetails = [
    {
        audiosrc: '../audio/Dancing_On_My_Own.mp3',
        imgsrc: '../img/Dancing_On_My_Own.jpg',
        name: 'Dancing_On_My_Own',
        artist: 'Calum Scott'
    },
    {
        audiosrc: '../audio/Insomnia.mp3',
        imgsrc: '../img/Insomnia.jpg',
        name: 'Insomnia',
        artist: 'Daya'
    },
    {
        audiosrc: '../audio/Say_Something.mp3',
        imgsrc: '../img/Say_Something.jpg',
        name: 'Say_Something',
        artist: 'Justin Timberlake'
    },
    {
        audiosrc: '../audio/Thunder.mp3',
        imgsrc: '../img/Thunder.jpg',
        name: 'Thunder',
        artist: 'Imagine Dragons'
    }
];
const audio = document.getElementById('audio');
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const music_container = document.getElementById('music_container');
const progress_container = document.getElementById('progress-container');
const progress_bar = document.getElementById('progress-bar');
const volume_container = document.getElementById('volume-container');
const voluem_bar = document.getElementById('volume-bar');
const muted = document.getElementById('mute');
let songIndex = 0;
let isMute = false;
loadSong(songDetails[songIndex]);
//Load the song to the audio player
function loadSong(song) {
    title.innerText = song.name;
    audio.src = `../audio/${song.audiosrc}`;
    cover.src = `../img/${song.imgsrc}`;
}
//Play the loaded song 
function playSong() {
    music_container.classList.add('play');
    play.querySelector('i.far').classList.remove('fa-play-circle');
    play.querySelector('i.far').classList.add('fa-pause-circle');
    audio.play();
}
//Play the previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songDetails.length - 1;
    }
    loadSong(songDetails[songIndex]);
    playSong();
}
//Play the next song
function nextSong() {
    songIndex++;
    if (songIndex > songDetails.length - 1) {
        songIndex = 0;
    }
    loadSong(songDetails[songIndex]);
    playSong();
}
//Pause the song
function pauseSong() {
    music_container.classList.remove('play');
    play.querySelector('i.far').classList.add('fa-play-circle');
    play.querySelector('i.far').classList.remove('fa-pause-circle');
    audio.pause();
}
//Update the progress bar of the playig song
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress_bar.style.width = `${progressPercent}%`;
    progress_bar.setAttribute("aria-valuenow", `${progressPercent}`);
}
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
function setMute() {
    if (!isMute) {
        audio.volume = 0.0;
        isMute = !isMute;
    }
    else {
        audio.volume = 1.0;
    }
}
//Events to manage the user interaction
play.addEventListener('click', () => {
    const isPlaying = music_container.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
});
//click events on previous and next version
prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);
//update the time progress bar
audio.addEventListener('timeupdate', updateProgress);
//update the volume progress bar
// audio.addEventListener('')
//click on progress bar
progress_container.addEventListener('click', setProgress);
//click on volume icon to mute
muted.addEventListener('click', setMute);
