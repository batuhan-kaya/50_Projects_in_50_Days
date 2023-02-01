const volume = document.getElementById("volume");
const rangeValue = document.querySelector(".rangeValue");

const sounds = [
  {
    sound: "kick",
    keyCode: 103,
    num: "7",
  },
  {
    sound: "crash-old",
    keyCode: 104,
    num: "8",
  },
  {
    sound: "house-kick",
    keyCode: 105,
    num: "9",
  },
  {
    sound: "crash",
    keyCode: 100,
    num: "4",
  },
  {
    sound: "high-hat",
    keyCode: 101,
    num: "5",
  },
  {
    sound: "oldschool-kick",
    keyCode: 102,
    num: "6",
  },
  {
    sound: "clap",
    keyCode: 97,
    num: "1",
  },
  {
    sound: "hi-hat",
    keyCode: 98,
    num: "2",
  },
  {
    sound: "shot-clap",
    keyCode: 99,
    num: "3",
  },
];

function audioElement(src) {
  if (getAudioElement() != null) {
    getAudioElement().remove();
  }

  let element = document.createElement("audio");
  element.src = `../09-Sound-Board/sounds/${src}.mp3`;
  element.id = "audio";
  element.volume = volume.value / 100;
  document.body.appendChild(element);
  return element;
}

function getAudioElement() {
  return document.getElementById("audio");
}

rangeValue.innerHTML = volume.value;

volume.addEventListener("input", (event) => {
  let volumeValue = event.target.value;
  rangeValue.innerHTML = volumeValue;
});

sounds.forEach((sound) => {
  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.textContent = sound.num;
  btn.id = `sound_${sound.keyCode}`;

  btn.onclick = () => {
    audioElement(sound.sound).play();
  };

  document.getElementById("buttons").appendChild(btn);
});

document.addEventListener("keydown", (e) => {
  audioElement(sounds.find((x) => x.keyCode == e.keyCode).sound).play();
  btnActive(e.which);
  console.log(e.which);
});

function btnActive(e) {
  const btnID = document.getElementById(`sound_${e}`);
  btnID.classList.add("keyboardEffect");

  setTimeout(() => {
    btnID.classList.remove("keyboardEffect");
  }, 100);
}
