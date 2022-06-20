/*  Model : Rendering
-------------------------------------------------------------- */

function renderList(todos) {
  let liste = document.querySelector(".list");
  liste.innerHTML = "";
  console.log(todos);
  if (todos.length > 0) {
    let counter = 1;
    for (let todo of todos) {
      let checked = "";
      if (todo.Completed == 1) {
        checked = "checked";
      }
      const element = document.createElement("li");
      element.setAttribute("data-id", todo.id);
      element.classList.add("list__item");
      element.innerHTML = `
            <p class="list__item--title">#<span class="list__item--id">${counter}</span>${todo.Title}</p>
            <p class="list__item--description">${todo.Entry}</p>
            <div class="list__item--importance">
                <p class="list__item--text">Importance: </p>
                ${createImportance(todo.Importance)}
            </div>
            <p class="list__item--text">Erledigen bis: ${createDate(todo.Due)}</p>
            <div class="list__item--completed">
                <label for="completed">Completed</label>
                <input class="list__item--completedinput" type="checkbox" id="completed" name="completed" ${checked} >
            </div>
            <button class="list__item--btn1">Edit</button>
            <button class="list__item--btn2">Delete</button> 
            `;
      liste.appendChild(element);
      counter++;
    }
  } else {
    const element = document.createElement("li");
    element.classList.add("list__empty");
    element.innerHTML =
      '<p class="list__empty--text">Keine TODOS vorhanden</p>';
    liste.appendChild(element);
  }
  if (document.querySelector(".header").dataset.mood === "night") {
    night_mood();
  } else {
    day_mood();
  }
}

function createDate(todoDue) {
  let due_arr = todoDue.split("-");
  return `${due_arr[2]}.${due_arr[1]}.${due_arr[0]}`;
}

function createImportance(importance) {
  var importanceHtml = "";
  for (let x = 0; x < importance; x++) {
    importanceHtml += '<p class="lit__item--import">*</p>';
  }
  return importanceHtml;
}

function init() {
  document.querySelector(".checkbyopen").checked = false;
  document.querySelector(".checkcompleted").checked = false;
}

function night_mood() {
  document.querySelector(".header__moon").style.display = "none";
  document.querySelector(".header__sun").style.display = "inline-block";
  document.querySelector(".header").style.backgroundColor = "rgb(0, 0, 0)";
  document.querySelector(".header__text").style.color = "white";
  document.querySelector(".todolist__box--title").style.color = "white";
  document.querySelector("body").classList.add("night");
  document.querySelector(".new").style.backgroundColor = "rgb(14, 126, 230)";
  document.querySelector(".new").style.border = "1px rgb(0, 0, 0) solid";
  document.querySelector(".alert").classList.add("bynight");
  if (document.querySelector(".list__empty")) {
    document.querySelector(".list__empty").classList.remove("byday");
    document.querySelector(".list__empty").classList.add("bynight");
  }
  let transparents = document.querySelectorAll(".transparent");
  for (let transparent of transparents) {
    transparent.classList.add("night");
  }
  let items = document.querySelectorAll(".list__item");
  for (let item of items) {
    item.style.backgroundColor = "rgb(14, 126, 230)";
  }
  let filter_elements = document.querySelectorAll(".filter__select--btn");
  for (let filter_element of filter_elements) {
    filter_element.classList.remove("byday");
    filter_element.classList.add("bynight");
  }
}

function day_mood() {
  document.querySelector(".header__moon").style.display = "inline-block";
  document.querySelector(".header__sun").style.display = "none";
  document.querySelector(".header").style.backgroundColor = "rgb(251, 226, 2)";
  document.querySelector(".header__text").style.color = "black";
  document.querySelector(".todolist__box--title").style.color = "black";
  document.querySelector("body").classList.remove("night");
  document.querySelector(".new").style = "";
  document.querySelector(".alert").classList.remove("bynight");
  if (document.querySelector(".list__empty")) {
    document.querySelector(".list__empty").classList.remove("bynight");
    document.querySelector(".list__empty").classList.add("byday");
  }
  let transparents = document.querySelectorAll(".transparent");
  for (let transparent of transparents) {
    transparent.classList.remove("night");
  }
  let items = document.querySelectorAll(".list__item");
  for (let item of items) {
    item.style = "";
  }
  let filter_elements = document.querySelectorAll(".filter__select--btn");
  for (let filter_element of filter_elements) {
    filter_element.classList.remove("bynight");
    filter_element.classList.add("byday");
  }
}

export { renderList, night_mood, day_mood, init };
