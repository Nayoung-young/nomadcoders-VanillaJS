const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event) {
  console.log("deleteToDo Starts!")
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
    }
  );
  console.log(`   toDos length: ${toDos.length}`);
  console.log(`   cleanToDos length: ${cleanToDos.length}`);

  console.log(`   toDos <= cleanToDos`);
  toDos = cleanToDos; //toDos should be 'let'

  saveToDos();

}

function saveToDos(){
  //console.log("saveToDos!");
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  //localStorage.setItem(TODOS_LS, toDos);
}

function paintToDo(text) {
  //console.log("paintToDo Start!");
  //document에 새로운 태그 li 생성
  const li = document.createElement("li");

  //delBtn, span 각각 만들고
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "Done!";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  //span: 문장 단위로 텍스트 영역 지정

  //만들어둔 span, delBtn을 li 안에 넣기
  li.appendChild(span);
  li.appendChild(delBtn);

  //li에게 id 추가
  li.id = newId;

  // 만든 li를 toDoList 안에 넣기
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };
  //console.log(`   toDoObj: ${toDoObj}`);
  toDos.push(toDoObj);
  //console.log(`   toDos: ${toDos}`);

  saveToDos();
  //console.log("paintToDo End!");
}

function handlSubmit(event) {
  //console.log("handleSubmit Start!");
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
  //console.log("handleSubmit End!");
}

function loadToDos() {
  //console.log("loadToDos Start!");
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    //console.log(typeof(loadedToDos)); //string
    const parsedToDos = JSON.parse(loadedToDos);
    //console.log(typeof(parsedToDos)); //object

    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text);//이때 toDo는 parameter, parsedToDos가 argument?
      }
    );
    //console.log(parsedToDos[0].text);
    //consol.log(parsedToDos[1].text);
    //console.dir(parsedToDos);
  }
  //console.log("loadToDos End!");
}

  function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handlSubmit);
  }

  init();
