const songs=[
    {
        songname :"LOVER",
        artist : "Taylor Swift",
        coverphoto :"music1.jpg",
        audio:"lover.mp3",

    },
    {
        songname :"SNOWMAN",
        artist : "Sia",
        coverphoto :"music2.jpg",
        audio:"snowman.mp3"
    },
    {
        songname :"CALM DOWN",
        artist : "Selena Gomez",
        coverphoto :"music3.jpg",
        audio:"calm.mp3"
    },
    {
        songname :"APT",
        artist :"Rose & Bruno Mars",
        coverphoto :"apt.jpeg",
        audio:"apt.mp3"

    }

];
const audioPlayer = document.getElementById('audio-player');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');
const progressBar = document.getElementById('progress-bar');
const progressHandle = document.getElementById('progress-handle');
const icon=document.getElementById('play-icon');
let current=0;
function loadSong(){
    const singer=document.getElementById('singer');
    const song=document.getElementById('title');
    const cover=document.getElementById('cover-photo');
    const play=document.getElementById('play');
    const audioPlayer = document.getElementById('audio-player');
    const currentsong=songs[current];
    singer.textContent=currentsong.artist;
    song.textContent=currentsong.songname;
    cover.src=currentsong.coverphoto;
    icon.src="play-button.png";
    audioPlayer.src = currentsong.audio;
    progressBar.style.width='0%';
    progressHandle.style.left='0%';
    currentTimeEl.textContent='0.00';
    totalDurationEl.textContent='0.00';

}
document.getElementById('full-bar').addEventListener('click',(e)=>{
const fullBar=document.getElementById('full-bar');
const rect=fullBar.getBoundingClientRect();
const clickX= e.clientX -rect.left;
const width=rect.width;
const percent = clickX/width;
const newTime = percent * audioPlayer.duration;

audioPlayer.currentTime = newTime;

progressBar.style.width = `${percent * 100}%`;
progressHandle.style.left = `${percent * 100}%`;

audioPlayer.play();
icon.src = 'pause.png';
isPlaying = true;

})
function formatTime(time){
    const minutes=Math.floor(time/60);
    const seconds=Math.floor(time % 60).toString().padStart(2,'0');
    return `${minutes}:${seconds}`;
}
audioPlayer.addEventListener('timeupdate', () => {
    const current = audioPlayer.currentTime;
    const duration = audioPlayer.duration || 0;
    
    currentTimeEl.textContent = formatTime(current);
    totalDurationEl.textContent = formatTime(duration);

    const percent = (current / duration) * 100;
    progressBar.style.width = `${percent}%`;
    progressHandle.style.left = `${percent}%`;
    if(audioPlayer.ended){
        nextSong();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    loadSong();
});
function nextSong(){

    const singer=document.getElementById('singer');
    const song=document.getElementById('title');
    const cover=document.getElementById('cover-photo');
    const play=document.getElementById('play');
    const audioPlayer = document.getElementById('audio-player');
    const icon=document.getElementById('play-icon');
    const nextSong=songs[(current+1)%songs.length];
    singer.textContent=nextSong.artist;
    song.textContent=nextSong.songname;
    cover.src=nextSong.coverphoto;
    audioPlayer.src = nextSong.audio;
    current = (current + 1) % songs.length;
    
    audioPlayer.play();
    icon.src='pause.png';
    isPlaying=true;
    audioPlayer.currentTime = 0;
    
    
    
}

function previousSong(){

    const singer=document.getElementById('singer');
    const song=document.getElementById('title');
    const cover=document.getElementById('cover-photo');
    const play=document.getElementById('play');
    const audioPlayer = document.getElementById('audio-player');
    const icon=document.getElementById('play-icon');
    const prevSong=songs[(current - 1 + songs.length) % songs.length];
    singer.textContent=prevSong.artist;
    song.textContent=prevSong.songname;
    cover.src=prevSong.coverphoto;
    audioPlayer.src = prevSong.audio;
    current = (current + 1) % songs.length;
    audioPlayer.play();
    icon.src='pause.png';
    isPlaying=true;
}
document.getElementById('next').addEventListener('click',()=>{
    nextSong();
    
})
document.getElementById('prev').addEventListener('click',()=>{
    previousSong();
    
})

let isPlaying=false;

document.getElementById('play').addEventListener('click',()=>{
    const audioPlayer = document.getElementById('audio-player');
    const icon=document.getElementById('play-icon');
    if(!isPlaying){
    icon.src='pause.png';
    audioPlayer.play();
    isPlaying=true;
    }
    else {
        audioPlayer.pause();
        icon.src='play-button.png';
        isPlaying=false;
    }
})
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); 

        const audioPlayer = document.getElementById('audio-player');
        const icon = document.getElementById('play-icon');

        if (!isPlaying) {
            icon.src = 'pause.png';
            audioPlayer.play();
            isPlaying = true;
        } else {
            audioPlayer.pause();
            icon.src = 'play-button.png';
            isPlaying = false;
        }
    }
});

