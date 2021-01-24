const clockContainer = document.querySelector(".js-clock"),
clockTitle = clockContainer.querySelector("h1");

function getTime(){
  const date = new Date(); //유튜브 클론 코딩 강의에서 다루는 부분? js의 핵심
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clockTitle.innerText= `${hours < 10 ? `0${hours}` : hours }:${minutes < 10 ? `0${minutes}` : minutes }:${seconds < 10 ? `0${seconds}` : seconds }`;
}

function init(){
  getTime();
  setInterval(getTime, 1000);
  // 1초마다 getTime 함수 호출
}

init();
