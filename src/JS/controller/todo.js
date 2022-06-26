/* New & Edit TODO
-------------------------------------------------------------- */

/* Imports, Declarations, Selectors
-------------------------------------------------------------- */

import * as todos_services from "../services/todos_service.js";
import * as render_services from "../view/render.js";
import * as storage_service from "../model/data/storage_service.js";

var title_input = document.querySelector(".new__title--input");
var importance_input = document.querySelector(".new__importance--input");
var due_input = document.querySelector(".new__due--input");
var complete_input = document.querySelector(".new__completed--input");
var description_input = document.querySelector(".new__description--input");

const error_box = document.querySelector(".alert");
const error_text = document.querySelector(".alert__text");

var new_todo = {};
var safety_flag = 0;

function delete_inputs() {
  title_input.value = "";
  importance_input.value = "";
  due_input.value = "";
  complete_input.value = "";
  description_input.value = "";
}

function check_inputs() {
  if (!title_input.value) {
    error_box.classList.add("flex");
    error_text.innerText = "Bitte gueltigen Titel eingeben";
    safety_flag = 1;
    return "1";
  }
  if (
    !importance_input.value ||
    importance_input.value > 5 ||
    importance_input.value < 1
  ) {
    error_box.classList.add("flex");
    error_text.innerText = "Bitte Gueltige Impotance eingeben Nummer 1 - 5";
    safety_flag = 1;
    return "1";
  }
  if (!due_input.value) {
    error_box.classList.add("flex");
    error_text.innerText = "Bitte Gueltiges Datum eingeben";
    safety_flag = 1;
    return "1";
  }
  return "0";
}

function delegation_TODO(function_flag, todoId) {
  if (function_flag) {
    delete_inputs();
    document.querySelector(".create").classList.remove("none");
    document.querySelector(".update").classList.add("none");
  } else {
    document.querySelector(".create").classList.add("none");
    document.querySelector(".update").classList.remove("none");
    for (let todo of todos_services.get_todos()) {
      if (todo.id == todoId) {
        title_input.value = todo.Title;
        importance_input.value = todo.Importance;
        due_input.value = todo.Due;
        complete_input.checked = todo.Completed;
        description_input.value = todo.Entry;
      }
    }
  }
  document.querySelector(".new").addEventListener("click", async (event) => {
    let element = event.target;
    if (element.matches(".create") && safety_flag === 0) {
      if (check_inputs() == 0) {
        if (function_flag) {
          new_todo = {};
          new_todo.id = todoId;
          new_todo.Title = title_input.value;
          new_todo.Entry = description_input.value;
          new_todo.Importance = importance_input.value;
          new_todo.Due = due_input.value;
          new_todo.Completed = complete_input.checked;
          new_todo.Created = new Date().toISOString().slice(0, 10);
          await todos_services.new_todo(new_todo);
          document.querySelector("main").classList.remove("none");
          document.querySelector(".new").classList.remove("flex");
          render_services.renderList(todos_services.get_todos());
        }
      }
    }
    if (element.matches(".update") && safety_flag === 0) {
      for (let todo of todos_services.get_todos()) {
        if (todo.id == todoId) {
          todo.Title = title_input.value;
          todo.Importance = importance_input.value;
          todo.Due = due_input.value;
          todo.Completed = complete_input.checked;
          todo.Entry = description_input.value;
          storage_service.rest_api({
            data: todo,
            URL: "http://127.0.0.1:3001/update_todo",
            Method: "PUT",
          });
        }
      }
    }
    if (element.matches(".delete") && safety_flag === 0) {
      delete_inputs();
    }
    if (element.matches(".overview") && safety_flag === 0) {
      document.querySelector("main").classList.remove("none");
      document.querySelector(".new").classList.remove("flex");
      render_services.renderList(todos_services.get_todos());
    }
    if (
      element.matches(".alert__btn") ||
      element.matches(".alert__btn--text")
    ) {
      safety_flag = 0;
      error_box.classList.remove("flex");
      error_text.innerText = "";
    }
  });
}

export { delegation_TODO };
