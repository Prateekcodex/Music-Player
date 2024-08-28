
const carousel = [...document.querySelectorAll('.carousel img')];

let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active');
    if(carouselImageIndex >= carousel.length -1){
        carouselImageIndex = 0;
    } else{
        carouselImageIndex++;
    }
    carousel[carouselImageIndex].classList.toggle('active');
}

setInterval(() => {
    changeCarousel();
},3000);



const musicPlayerSection = document.querySelector('.music-player-section');

let clickCount = 1;

musicPlayerSection.addEventListener('click', () => {
    if(clickCount >= 2){
        musicPlayerSection.classList.add('active');
        clickCount = 1;
        return;
    }
    clickCount++;
    setTimeout(() => {
        clickCount = 1;
    }, 250);
});

const backToHomeBtn = document.querySelector('.music-player-section .back-btn');
backToHomeBtn.addEventListener('click', () => {
    musicPlayerSection.classList.remove('active');
});

const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.music-player-section .nav-btn');

navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active');
});

const backToMusicPlayer = document.querySelector('.playlist .back-btn');
backToMusicPlayer.addEventListener('click', () => {
    playlistSection.classList.remove('active');
});

let CurrentMusic = 0;
const music = document.querySelector('#audio-source');
const seekbar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime  = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

const queue = [...document.querySelectorAll('.queue')];

const forwardBtn = document.querySelector('i.fa-forward');
const backwardBtn = document.querySelector('i.fa-backward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const repeatBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');
const volumeSlider = document.querySelector('.volume-slider');

playBtn.addEventListener('click', () => {
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
});

pauseBtn.addEventListener('click', () => {
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
});

const setMusic = (i) => {
    seekbar.value = 0;
    let song = songs[i];
    CurrentMusic = i;

    music.src = song.path;

    songName.innerText = song.name;
    artistName.innerText = song.artist;
    coverImage.src = song.cover;

    setTimeout(() => {
        seekbar.max = music.duration;
        musicDuration.innerText = formatTime(music.duration);
    }, 300);
    currentMusicTime.innerText = '00 : 00';
    queue.forEach(item => item.classList.remove('active'));
    queue[CurrentMusic].classList.add('active');
};

setMusic(0);

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = '0' + min;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = '0' + sec;
    }
    return `${min} : ${sec}`;
};

setInterval(() => {
    seekbar.value = music.currentTime;
    currentMusicTime.innerText = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) === Math.floor(seekbar.max)){
        if(repeatBtn.className.includes('active')){
            setMusic(CurrentMusic);
            playBtn.click();
        } else {
            forwardBtn.click();
        }
    }
}, 500);

seekbar.addEventListener('change', () => {
    music.currentTime = seekbar.value;
});

forwardBtn.addEventListener('click', () => {
    if(CurrentMusic >= songs.length - 1){
        CurrentMusic = 0;
    } else {
        CurrentMusic++;
    }
    setMusic(CurrentMusic);
    playBtn.click();
});

backwardBtn.addEventListener('click', () => {
    if(CurrentMusic <= 0){
        CurrentMusic = songs.length - 1;
    } else {
        CurrentMusic--;
    }
    setMusic(CurrentMusic);
    playBtn.click();
});

repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
});

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
});

volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
});

queue.forEach((item, i) => {
    item.addEventListener('click', () => {
        setMusic(i);
        playBtn.click();
    });
});
