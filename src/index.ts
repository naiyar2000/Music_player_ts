
const songDetails = [
    'Dancing_On_My_Own',
    'Insomnia',
    'Say_Something',
    'Thunder'
]

const audio = (document.getElementById('audio') as HTMLAudioElement);
const play= document.getElementById('play') as any;
const prev= document.getElementById('prev') as HTMLElement;
const next= document.getElementById('next') as HTMLElement;
const title = document.getElementById('title') as HTMLElement;
const cover = document.getElementById('cover') as HTMLImageElement;
const music_container = document.getElementById('music_container') as HTMLElement;
const progress_bar = document.getElementById('progress-bar') as HTMLElement;



// class playList {
//     this.genre
// }
console.log('hello')
let songIndex: number  = 0;

loadSong(songDetails[songIndex]);

function loadSong(song: string) {
    
    title.innerText = song;
    audio.src = `../audio/${song}.mp3`;
    cover.src = `../img/${song}.jpg`;
}

function playSong() {
    music_container.classList.add('play');
    play.querySelector('i.far').classList.remove('fa-play-circle');
    play.querySelector('i.far').classList.add('fa-pause-circle');
    audio.play();
}

function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songDetails.length - 1;
    }

    loadSong(songDetails[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;

    if(songIndex > songDetails.length - 1) {
        songIndex = 0;
    }

    loadSong(songDetails[songIndex]);
    playSong();
}


function pauseSong() {
    music_container.classList.remove('play');
    play.querySelector('i.far').classList.add('fa-play-circle');
    play.querySelector('i.far').classList.remove('fa-pause-circle');
    audio.pause ();
}

function updateProgress(e: any) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) *100;
    progress_bar.style.width = `${progressPercent}%`;
    progress_bar.setAttribute("aria-valuenow", `${progressPercent}`);
}

play.addEventListener('click', () => {
    const isPlaying = music_container.classList.contains('play');

    if(isPlaying) {
        pauseSong();
    }else{
        playSong();
    }
    
})

prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);