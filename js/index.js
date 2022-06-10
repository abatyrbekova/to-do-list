const toDoes = JSON.parse(window.localStorage.getItem("to-do")) || [];
const doneList = JSON.parse(window.localStorage.getItem("doneList")) || [];
const deletedList = JSON.parse(window.localStorage.getItem("deletedList")) || [];

const addToList = (e) => {
  e.preventDefault();
  let userData = document.querySelector("#user-data").value;

  if (userData !== "") {
    toDoes.push(userData);
    window.localStorage.setItem("to-do", JSON.stringify(toDoes));
    document.querySelector("#user-data").value = "";
    listToDoes()
  } else {
    document.querySelector("#user-data").placeholder =
      "You need to add something here 😎";
  }

  // show hide animation
  // const allAnims = document.getElementsByClassName("anim");
  // allAnims.forEach(anim => {anim.classList.add("hidden")});
  // document.querySelector(".boxing").classList.remove("hidden");
};

const listToDoes = () => {
  const ul = document.querySelector(".to-do ul");
  ul.innerHTML = "";
  toDoes.forEach((item, index) => {
    showItemToDo(item, index, ul)
  });
}

const showItemToDo = (item, index, ul) => {
  // step 1
  let newLi = document.createElement("li");
  // step 2
  let text = document.createTextNode(item);
  // step 3
  newLi.appendChild(text);

  const doneBtn = document.createElement("button");
  const delBtn = document.createElement("button");

  const imgCheck = document.createElement("img");
  imgCheck.src = "../images/green_check.svg.png";
  doneBtn.appendChild(imgCheck);

  const imgCross = document.createElement("img");
  imgCross.src = "../images/cross.png";
  delBtn.appendChild(imgCross);

  newLi.appendChild(doneBtn);
  newLi.appendChild(delBtn);
  ul.appendChild(newLi);
  doneBtn.addEventListener("click", () => moveToDone(item, index));
  delBtn.addEventListener("click", () => moveToDeleted(item, index));
}

const showItemDone = (item, index, ul) => {
  let newLi = document.createElement("li");
  let text = document.createTextNode(item);
  newLi.appendChild(text);

  const backBtn = document.createElement("button");
  const delBtn = document.createElement("button");

  const imgArrow = document.createElement("img");
  imgArrow.src = "../images/arrow-left.png";
  backBtn.appendChild(imgArrow);

  const imgCross = document.createElement("img");
  imgCross.src = "../images/cross.png";
  delBtn.appendChild(imgCross);

  newLi.appendChild(backBtn);
  newLi.appendChild(delBtn);
  ul.appendChild(newLi);
  backBtn.addEventListener("click", () => moveDoneBack(item, index));
  delBtn.addEventListener("click", () => removeDoneItem(index));
}

const showItemDeleted = (item, index, ul) => {
  let newLi = document.createElement("li");
  let text = document.createTextNode(item);
  newLi.appendChild(text);

  const backBtn = document.createElement("button");
  const delBtn = document.createElement("button");

  const imgArrow = document.createElement("img");
  imgArrow.src = "../images/arrow-left.png";
  backBtn.appendChild(imgArrow);

  const imgCross = document.createElement("img");
  imgCross.src = "../images/cross.png";
  delBtn.appendChild(imgCross);

  newLi.appendChild(backBtn);
  newLi.appendChild(delBtn);
  ul.appendChild(newLi);
  backBtn.addEventListener("click", () => moveDeletedBack(item, index));
  delBtn.addEventListener("click", () => removeDeletedItem(index));
}

const moveToDone = (item, index) => {
  toDoes.splice(index, 1)
  window.localStorage.setItem("to-do", JSON.stringify(toDoes));
  doneList.push(item)
  window.localStorage.setItem("doneList", JSON.stringify(doneList));
  listToDoes()
  handleDoneBtnClick()
}


// Showing the list of done items
const listDoneItems = () => {
  const ul = document.querySelector(".done-del ul");
  ul.innerHTML = "";
  doneList.forEach((item, index) => {
    showItemDone(item, index, ul)
  });
}


const moveToDeleted = (item, index) => {
  toDoes.splice(index, 1)
  window.localStorage.setItem("to-do", JSON.stringify(toDoes));
  deletedList.push(item)
  window.localStorage.setItem("deletedList", JSON.stringify(deletedList));
  listToDoes()
  handleDeletedBtnClick()
}


// Showing the list of deleted items
const listDeletedItems = () => {
  const ul = document.querySelector(".done-del ul");
  ul.innerHTML = "";
  deletedList.forEach((item, index) => {
    showItemDeleted(item, index, ul)
  });
}

const removeDoneItem = (index) => {
  doneList.splice(index, 1)
  window.localStorage.setItem("doneList", JSON.stringify(doneList));
  listDoneItems()
}

const moveDoneBack = (item, index) => {
  doneList.splice(index, 1)
  window.localStorage.setItem("doneList", JSON.stringify(doneList));
  toDoes.push(item)
  window.localStorage.setItem("to-do", JSON.stringify(toDoes));
  listToDoes()
  listDoneItems()
}

const removeDeletedItem = (index) => {
  deletedList.splice(index, 1)
  window.localStorage.setItem("deletedList", JSON.stringify(deletedList));
  listDeletedItems()
}

const moveDeletedBack = (item, index) => {
  deletedList.splice(index, 1)
  window.localStorage.setItem("deletedList", JSON.stringify(deletedList));
  toDoes.push(item)
  window.localStorage.setItem("to-do", JSON.stringify(toDoes));
  listToDoes()
  listDeletedItems()
}

const handleDeletedBtnClick = () => {
  listDeletedItems()
  document.querySelector(".done.btn").classList.remove("active");
  document.querySelector(".deleted.btn").classList.add("active");
}

const handleDoneBtnClick = () => {
  listDoneItems()
  document.querySelector(".done.btn").classList.add("active");
  document.querySelector(".deleted.btn").classList.remove("active");
}

document.querySelector(".done.btn").addEventListener("click", handleDoneBtnClick);
document.querySelector(".deleted.btn").addEventListener("click", handleDeletedBtnClick);
document.querySelector("form").addEventListener("submit", addToList);
listToDoes();
listDoneItems()