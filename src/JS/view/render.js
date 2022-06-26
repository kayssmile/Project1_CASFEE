/*  TODO - APP : Model 
-------------------------------------------------------------- */

import * as storage_service from "../model/data/storage_service.js";

/*  Model : Rendering
-------------------------------------------------------------- */

function renderList(todos) {
  let liste = document.querySelector(".list");
  liste.innerHTML = "";
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
                <input class="list__item--completedinput" type="checkbox" id="completed" name="completed" ${checked} disabled>
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
  document.querySelector(".header").dataset.mood = storage_service.ChecklocalStorage();
}

function night_mood() {
  document.querySelector(".header__moon").classList.add("none");
  document.querySelector(".header__sun").classList.add("flex");
  document.querySelector(".header").classList.add("backBlack");
  document.querySelector(".header__text").classList.add("white");
  document.querySelector(".todolist__box--title").classList.add("white");
  document.querySelector("body").classList.add("night");
  document.querySelector(".new").classList.add("new_night");
  document.querySelector(".alert").classList.add("bynight_important");
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
    item.classList.add("bynight_important");//
  }
  let filter_elements = document.querySelectorAll(".filter__select--btn");
  for (let filter_element of filter_elements) {
    filter_element.classList.remove("byday");
    filter_element.classList.add("bynight");
  }
}

function day_mood() {
  document.querySelector(".header__moon").classList.remove("none");
  document.querySelector(".header__sun").classList.remove("flex");
  document.querySelector(".header").classList.remove("backBlack");
  document.querySelector(".header__text").classList.remove("white");
  document.querySelector(".todolist__box--title").classList.remove("white");
  document.querySelector("body").classList.remove("night");
  document.querySelector(".new").classList.remove("new_night");
  document.querySelector(".alert").classList.remove("bynight_important");
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
    item.classList.remove("bynight_important");
  }
  let filter_elements = document.querySelectorAll(".filter__select--btn");
  for (let filter_element of filter_elements) {
    filter_element.classList.remove("bynight");
    filter_element.classList.add("byday");
  }
}

export { renderList, night_mood, day_mood, init };
