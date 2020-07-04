import { string } from "yargs";

// const songDetails = [
//     {
//         audiosrc: string,
//         imgsrc: string, 
//         name: string,
//         artist: string
//     }
// ]
const songDetails: {audiosrc: string, imgsrc: string, name: string, artist: string}[] = [
    {
        audiosrc: '../audio/Dancing_On_My_Own.mp3',
        imgsrc: '../img/Dancing_On_My_Own.jpg', 
        name:'Dancing_On_My_Own',
        artist: 'Calum Scott'
    },
    {
        audiosrc: '../audio/Insomnia.mp3',
        imgsrc: '../img/Insomnia.jpg', 
        name:'Insomnia',
        artist: 'Daya'
    },
    {
        audiosrc: '../audio/Say_Something.mp3',
        imgsrc: '../img/Say_Something.jpg', 
        name:'Say_Something',
        artist: 'Justin Timberlake'
    },
    {
        audiosrc: '../audio/Thunder.mp3',
        imgsrc: '../img/Thunder.jpg', 
        name:'Thunder',
        artist: 'Imagine Dragons'
    }
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

function loadSong(song: any) {
    
    title.innerText = song.name;
    audio.src = `../audio/${song.audiosrc}`;
    cover.src = `../img/${song.imgsrc}`;
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