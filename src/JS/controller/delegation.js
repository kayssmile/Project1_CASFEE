/* TODO - APP : Controller 
-------------------------------------------------------------- */
import * as todo_tools from "./todo.js";
import * as todos_services from "../services/todos_service.js";
import * as render_services from "../view/render.js";
import * as storage_service from "../model/data/storage_service.js";

var filter_flag = 0;
var activ_filter = document.querySelector(".filter_activ");

/* Controller : Delegation
-------------------------------------------------------------- */

function delegation_home(event) {
  let element = event.target;
  let list = document.querySelector(".list");
  if (
    element.matches(".header__moon") ||
    element.matches(".header__moonpath")
  ) {
    render_services.night_mood();
    document.querySelector(".header").dataset.mood = "night";
    storage_service.setlocalStorage("night");
  }
  if (element.matches(".header__sun") || element.matches(".header__sunpath")) {
    render_services.day_mood();
    document.querySelector(".header").dataset.mood = "day";
    storage_service.setlocalStorage("day");
  }
  if (
    element.matches(".newtodo__btn") ||
    element.matches(".newtodo__btn--text")
  ) {
    document.querySelector("main").classList.add("none");
    document.querySelector(".new").classList.add("flex");
    let todo_id = todos_services.get_todos().length + 1;
    document.querySelector(".new__function").textContent =
      "New TODO #" + todo_id;
    todo_tools.delegation_TODO(1, todo_id);
  }
  if (
    element.matches(".filter__btn--cross") ||
    element.matches(".filter__btn--crosspath")
  ) {
    list.dataset.filter = "none";
    activ_filter.innerText = "None";
    render_services.init();
    render_services.renderList(todos_services.get_todos());
  }
  if (
    element.matches(".filter__btn--container") ||
    element.matches(".filter__btn") ||
    element.matches(".filter__btn--text") ||
    element.matches(".filter__btn--svg") ||
    element.matches(".filter__btn--svgpath") ||
    element.matches(".filter__container")
  ) {
    element = document.querySelector(".filter__select");
    if (filter_flag === 0) {
      document.querySelector(".filter__btn--svg").style.transform =
        "rotate(180deg)";
      element.style.marginTop = "10px";
      filter_flag = 1;
    } else {
      document.querySelector(".filter__btn--svg").style.transform =
        "rotate(0deg)";
      element.style.marginTop = null;
      filter_flag = 0;
    }
  }
  if (element.matches(".byname")) {
    list.dataset.filter = "byname";
    activ_filter.innerText = "Name";
    render_services.renderList(todos_services.sort_name());
  }
  if (element.matches(".bydue")) {
    list.dataset.filter = "bydue";
    activ_filter.innerText = "Due";
    render_services.renderList(todos_services.sort_byDue());
  }
  if (element.matches(".bycreation")) {
    list.dataset.filter = "bycreation";
    activ_filter.innerText = "Creation";
    render_services.renderList(todos_services.sort_bycreation());
  }
  if (element.matches(".byimportance")) {
    list.dataset.filter = "byimportance";
    activ_filter.innerText = "Importance";
    render_services.renderList(todos_services.sort_byImportance());
  }
  if (element.matches(".checkcompleted")) {
    if (document.querySelector(".checkcompleted").checked === true) {
      document.querySelector(".checkbyopen").disabled = true;
      render_services.renderList(todos_services.filter_completed());
    }
    if (document.querySelector(".checkcompleted").checked === false) {
      document.querySelector(".checkbyopen").disabled = false;
      render_services.renderList(todos_services.get_listed());
    }
  }
  if (element.matches(".checkbyopen")) {
    if (document.querySelector(".checkbyopen").checked === true) {
      document.querySelector(".checkcompleted").disabled = true;
      render_services.renderList(todos_services.filter_open());
    } else if (document.querySelector(".checkbyopen").checked === false) {
      document.querySelector(".checkcompleted").disabled = false;
      render_services.renderList(todos_services.get_listed());
    }
  }
  if (element.matches(".list__item--btn1")) {
    event.preventDefault();
    document.querySelector("main").classList.add("none");
    document.querySelector(".new").classList.add("flex");
    document.querySelector(".new__function").textContent =
      "Edit TODO #" +
      element.parentNode.firstElementChild.firstElementChild.innerText;
    let todo_id = element.parentNode.dataset.id;
    todo_tools.delegation_TODO(0, todo_id);
  }
  if (element.matches(".list__item--btn2")) {
    event.preventDefault();
    let todoId = event.target.parentNode.dataset.id;
    todos_services.remove_todo(todoId);
    if (list.dataset.filter === "none") {
      render_services.renderList(todos_services.get_todos());
    } else if (list.dataset.filter === "byname") {
      render_services.renderList(todos_services.sort_name());
    } else if (list.dataset.filter === "bydue") {
      render_services.renderList(todos_services.sort_byDue());
    } else if (list.dataset.filter === "bycreation") {
      render_services.renderList(todos_services.sort_bycreation());
    } else if (list.dataset.filter === "byimportance") {
      render_services.renderList(todos_services.sort_byImportance());
    }
  }
}

export { delegation_home };
