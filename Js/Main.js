// function fetchData(api_url) {
//   fetch(api_url)
//     .then((response) => {
//       let data = response.json();
//       return data;
//     })
//     .then((data) => setData(data));
// }
// fetchData("./Music_Api.json");

let preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  preloader.remove();
});

let array = [
  {
    id: 0,
    singer: "Khaled Mabrouki",
    music_name: "fade",
    music_url: "./Music/Music (1).mp3",
    image_url: "./Images/img (1).jpg",
  },
  {
    id: 1,
    singer: "Sarah Junior",
    music_name: "I Love Daddy",
    music_url: "./Music/Music (2).mp3",
    image_url: "./Images/img (2).jpg",
  },
  {
    id: 2,
    singer: "Ines Halal",
    music_name: "Walk Into Me",
    music_url: "./Music/Music (3).mp3",
    image_url: "./Images/img (3).jpg",
  },
  {
    id: 3,
    singer: "Kook Back",
    music_name: "Just Say It",
    music_url: "./Music/Music (4).mp3",
    image_url: "./Images/img (5).jpg",
  },
  {
    id: 4,
    singer: "Attica Dancing",
    music_name: "Dance With Me",
    music_url: "./Music/Music (5).mp3",
    image_url: "./Images/img (6).jpg",
  },
  {
    id: 5,
    singer: "Salmi Lizard",
    music_name: "Look At Me",
    music_url: "./Music/Music (6).mp3",
    image_url: "./Images/img (7).jpg",
  },
];

let timeOf = 0;

let errorTime = 3000;

let error = document.querySelector(".error p");

let player = document.querySelector(".player");

let img = document.querySelector(".cover img");
let musicName = document.querySelector(".info .title");
let singerName = document.querySelector(".info .singer");

let songSrc = document.querySelector(".music-element");

let Control_volume = document.querySelector(".volume-box");
let volume_sound = document.querySelector(".volume-range");

let seekBar = document.querySelector(".seekbar");
let durationHtml = document.querySelector(".duration");
let currentTime = document.querySelector(".current-time");

let rotateImage = document.querySelector(".cover");
let rotateImg = document.querySelector(".cover img");

function setData(data) {
  let singer = data[timeOf].singer;
  let music_name = data[timeOf].music_name;
  let music_url = data[timeOf].music_url;
  let image_url = data[timeOf].image_url;
  let music_id = data[timeOf].id;

  songSrc.src = music_url;
  img.src = image_url;
  musicName.innerHTML = music_name;
  singerName.innerHTML = singer;
  songSrc.id = music_id;

  dataLoad(songSrc);
}
setData(array);

function dataLoad(songSrc) {
  songSrc.onloadeddata = () => {
    let duration = songSrc.duration;
    seekBar.max = duration;
    let minutes = Math.round(parseInt(duration) % 60);
    let secondes = Math.round((parseInt(duration) / 60) % 60);
    durationHtml.innerHTML = `${secondes < 10 ? "0" + secondes : secondes} : ${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  };
}

let volumeControlBtn = document.querySelector(".volume-control");

function handleVolume() {
  Control_volume.classList.toggle("show");
  volumeControlBtn.classList.toggle("active");
}

function increaseVolume() {
  if (volume_sound.value === "100") {
    error.innerHTML = "The Sound Is Full, Please Stop Increasing";
    setTimeout(() => {
      error.innerHTML = "";
    }, errorTime);
  } else {
    error.innerHTML = "";
    volume_sound.value = parseInt(volume_sound.value) + 20;
    songSrc.volume = +volume_sound.value / 100;
    volume_sound.value++;
  }
}

function reduceVolume() {
  if (volume_sound.value === "0") {
    error.innerHTML = "The Sound Is Muted, Please Stop Lowering";
    setTimeout(() => {
      error.innerHTML = "";
    }, errorTime);
  } else {
    error.innerHTML = "";
    volume_sound.value = parseInt(volume_sound.value) - 20;
    songSrc.volume = +volume_sound.value / 100;
    volume_sound.value--;
  }
}

function handleSeekVolume() {
  songSrc.volume = +volume_sound.value / 100;
}

let play = document.querySelector(".play");
let pause = document.querySelector(".pause");

play.style.display = "none";

document.querySelector(":root").classList.add("pink");
function handlePlay() {
  rotateImage.classList.add("active-animation");
  rotateImg.style.animationPlayState = "unset";
  songSrc.play();
  play.style.display = "block";
  pause.style.display = "none";
}

function handlePause() {
  rotateImg.style.animationPlayState = "paused";
  songSrc.pause();
  pause.style.display = "block";
  play.style.display = "none";
}

songSrc.addEventListener(
  "timeupdate",
  () => (seekBar.value = songSrc.currentTime)
);

function handleSeekBar() {
  songSrc.currentTime = seekBar.value;
}

songSrc.addEventListener("timeupdate", () => {
  let minute = Math.round(parseInt(songSrc.currentTime) % 60);
  let seconde = Math.round((parseInt(songSrc.currentTime) / 60) % 60);
  currentTime.innerHTML = `${seconde < 10 ? "0" + seconde : seconde} : ${
    minute < 10 ? "0" + minute : minute
  }`;
});

let repeat = document.querySelector(".repeat");

function handleRepeat() {
  if (typeof songSrc.loop === "boolean") {
    repeat.classList.toggle("active");
    if (repeat.classList.contains("active")) {
      songSrc.loop = true;
    } else {
      songSrc.loop = false;
    }
  }
}

function next() {
  favorite.classList.remove("active");
  if (array.length - 1 === timeOf) {
    timeOf = 0;
    setData(array);
    handlePlay();
  } else {
    timeOf++;
    setData(array);
    handlePlay();
  }
}

function previous() {
  favorite.classList.remove("active");
  if (timeOf <= 0) {
    timeOf = array.length - 1;
    setData(array);
    handlePlay();
  } else {
    timeOf--;
    setData(array);
    handlePlay();
  }
}

songSrc.addEventListener("ended", () => {
  if (repeat.classList.contains("active")) {
    return;
  } else {
    next();
  }
});

let favorite = document.querySelector(".like");

function handleFavorite() {
  favorite.classList.toggle("active");
}

let colors = document.querySelectorAll(".colors li");

if (window.localStorage.getItem("mode")) {
  let mode = window.localStorage.getItem("mode");
  document.querySelector(":root").classList.add(mode);
  colors.forEach((el) => {
    if (el.dataset.color === mode) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

colors.forEach((el) => {
  el.addEventListener("click", () => {
    colors.forEach((ele) => {
      ele.classList.remove("active");
      document.querySelector(":root").className = "";
    });
    el.classList.add("active");
    document.querySelector(":root").classList.add(el.dataset.color);
    window.localStorage.setItem("mode", el.dataset.color);
  });
});
