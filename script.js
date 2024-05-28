console.log("Welcome to Spotify");

//Initialize the variable
let songIndex = 0;
let audioElement = new Audio("songs/jiya-laage-na.mp3");
let masterPlay = document.getElementById("master-play");
let myProgressBar = document.getElementById("my-progress-bar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("master-song-name");
let songItem = Array.from(document.getElementsByClassName("song-item"));

let songs = [
  {
    songName: "Jiya laage na",
    filePath: "songs/jiya-laage-na.mp3",
    coverPath: "covers/jiya-laage-na-cover.jpg",
  },
  {
    songName: "Relation",
    filePath: "songs/relation.mp3",
    coverPath: "covers/relation-cover.jpg",
  },
  {
    songName: "Tera chehra",
    filePath: "songs/tera-chehra.mp3",
    coverPath: "covers/tera-chehra-cover.jpg",
  },
  {
    songName: "Humsafar",
    filePath: "songs/humsafar.mp3",
    coverPath: "covers/humsafar-cover.jpg",
  },
  {
    songName: "Lamberghini",
    filePath: "songs/lamberghini.mp3",
    coverPath: "covers/lamberghini-cover.jpeg",
  },
  {
    songName: "Lehanga",
    filePath: "songs/lehanga.mp3",
    coverPath: "covers/lehanga-cover.jpg",
  },
  {
    songName: "Kyun",
    filePath: "songs/kyun.mp3",
    coverPath: "covers/kyun-cover.jpg",
  },
  {
    songName: "Namo namo",
    filePath: "songs/namo-namo.mp3",
    coverPath: "covers/namo-namo-cover.jpg",
  },
  {
    songName: "Qaafirana",
    filePath: "songs/qaafirana.mp3",
    coverPath: "covers/qaafirana-cover.jpg",
  },
  {
    songName: "Sanam teri kasam",
    filePath: "songs/sanam-teri-kasam.mp3",
    coverPath: "covers/sanam-teri-kasam-cover.jpg",
  },
];

songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("song-name")[0].innerText = songs[i].songName;
  // element.getElementsByClassName("time-stamp")[0].innerText =
  //   new Audio("songs/relation.mp3").duration || 0;
});

//Handle play/pause click
masterPlay.addEventListener("click", () => {
  let chhotaPlay = document.getElementById(songIndex);
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;

    chhotaPlay.classList.remove("fa-circle-play");
    chhotaPlay.classList.add("fa-circle-pause");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;

    chhotaPlay.classList.remove("fa-circle-pause");
    chhotaPlay.classList.add("fa-circle-play");
  }
});

function checkFull(curr, dur) {
  if (curr == dur) {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
    songIndex++;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;

    makeAllPlays();
    let chhotaPlay = document.getElementById(songIndex);
    chhotaPlay.classList.remove("fa-circle-play");
    chhotaPlay.classList.add("fa-circle-pause");
  }
}

//Listen to Events
audioElement.addEventListener("timeupdate", () => {
  //Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
  checkFull(audioElement.currentTime, audioElement.duration);
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("song-item-play")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("song-item-play")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      // console.log(e.target);
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audioElement.src = songs[songIndex].filePath;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      gif.style.opacity = 1;
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex > 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  // audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;

  makeAllPlays();
  let chhotaPlay = document.getElementById(songIndex);
  chhotaPlay.classList.remove("fa-circle-play");
  chhotaPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex < 0) {
    songIndex = 9;
  } else {
    songIndex -= 1;
  }
  // audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;

  makeAllPlays();
  let chhotaPlay = document.getElementById(songIndex);
  chhotaPlay.classList.remove("fa-circle-play");
  chhotaPlay.classList.add("fa-circle-pause");
});
