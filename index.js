
//Song details data
var songDetails = [
    {
        audiosrc: 'Dancing_On_My_Own.mp3',
        imgsrc: 'Dancing_On_My_Own.jpg',
        name: 'Dancing_On_My_Own',
        artist: 'Calum Scott'
    },
    {
        audiosrc: 'Insomnia.mp3',
        imgsrc: 'Insomnia.jpg',
        name: 'Insomnia',
        artist: 'Daya'
    },
    {
        audiosrc: 'Say_Something.mp3',
        imgsrc: 'Say_Something.jpg',
        name: 'Say_Something',
        artist: 'Justin Timberlake'
    },
    {
        audiosrc: 'Thunder.mp3',
        imgsrc: 'Thunder.jpg',
        name: 'Thunder',
        artist: 'Imagine Dragons'
    }
];
var audio = document.getElementById('audio');
var play = document.getElementById('play');
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var title = document.getElementById('title');
var cover = document.getElementById('cover');
var music_container = document.getElementById('music_container');
var progress_container = document.getElementById('progress-container');
var progress_bar = document.getElementById('progress-bar');
var volume_container = document.getElementById('volume-container');
var voluem_bar = document.getElementById('volume-bar');
var muted = document.getElementById('mute');
var volume = document.getElementById('volume');
var songIndex = 0;
var isMute = false;
loadSong(songDetails[songIndex]);
//Load the song to the audio player
function loadSong(song) {
    // const p = document.createElement('p');
    // p.innerHTML = `${song.name} <a href='./audio/${song.audiosrc}' download><i class="fas fa-download ml-3" style="cursor: pointer"></i></a>`
    // title.appendChild(p);
    title.innerHTML = "<p>" + song.name + " <a href='./audio/" + song.audiosrc + "' download><i class=\"fas fa-download ml-3\" style=\"cursor: pointer\"></i></a></p>";
    audio.src = "./audio/" + song.audiosrc;
    cover.src = "./img/" + song.imgsrc;
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
    var _a = e.srcElement, duration = _a.duration, currentTime = _a.currentTime;
    var progressPercent = (currentTime / duration) * 100;
    progress_bar.style.width = progressPercent + "%";
    progress_bar.setAttribute("aria-valuenow", "" + progressPercent);
}
function setProgress(e) {
    var width = this.clientWidth;
    var clickX = e.offsetX;
    var duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
function setMute() {
    if (!isMute) {
        audio.volume = 0.0;
        volume.querySelector('i.fas').classList.add('fa-volume-mute');
        volume.querySelector('i.fas').classList.remove('fa-volume-up');
        isMute = !isMute;
    }
    else {
        audio.volume = 1.0;
        volume.querySelector('i.fas').classList.remove('fa-volume-mute');
        volume.querySelector('i.fas').classList.add('fa-volume-up');
        isMute = !isMute;
    }
}
function setVolume(e) {
    audio.volume = e.target.value;
}
//Events to manage the user interaction
play.addEventListener('click', function () {
    var isPlaying = music_container.classList.contains('play');
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
//set volume
voluem_bar.addEventListener('click', setVolume);
//song ends
audio.addEventListener('ended', nextSong);
