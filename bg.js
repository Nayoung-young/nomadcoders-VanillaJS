const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber){

  if (imgNumber <= 4) {
    body.classList.add("darkFont");
  }

  const image = new Image();
  image.src = `images/${imgNumber}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function genRandom(){
  const number = Math.ceil(Math.random() * IMG_NUMBER); // 1~ 5
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
