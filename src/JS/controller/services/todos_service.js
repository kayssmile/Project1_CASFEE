/* TODOS - Services
-------------------------------------------------------------- */

import * as Storage_service from "../../model/data/storage_service.js";

var todos = [];
var todos_listed = [];

async function init_storage() {
  todos = await Storage_service.rest_api({
    data: 0,
    URL: "http://127.0.0.1:3001/get_todos",
    Method: "GET",
  });
}

function get_todos() {
  todos.sort(function (a, b) {
    return a.id - b.id;
  });
  todos_listed = todos;
  return todos;
}

async function new_todo(todo) {
  todos.push(todo);
  await Storage_service.rest_api({
    data: todo,
    URL: "http://127.0.0.1:3001/new_todo",
    Method: "PUT",
  });
}

async function remove_todo(Id) {
  todos.splice(getIndex_todo(Id), 1);
  await Storage_service.rest_api({
    data: { todo_id: Id },
    URL: `http://127.0.0.1:3001/delete/todo/${Id}`,
    Method: "DELETE",
  });
}

function getIndex_todo(ID) {
  for (let todo of todos) {
    if (todo.id == ID) {
      return todos.indexOf(todo);
    }
  }
}

function sort_name() {
  todos_listed = todos;
  todos_listed.sort(function (a, b) {
    if (a.Title < b.Title) {
      return -1;
    }
    if (a.Title > b.Title) {
      return 1;
    }
    return 0;
  });
  return todos_listed;
}

function sort_byDue() {
  todos_listed = todos;
  todos_listed.map((todo) => {
    todo.Duevalue = new Date(todo.Due);
    todo.Duevalue = todo.Duevalue.getTime() / 1000;
  });
  todos_listed.sort((a, b) => {
    return a.Duevalue - b.Duevalue;
  });
  return todos_listed;
}

function sort_bycreation() {
  todos_listed = todos;
  todos_listed.map((todo) => {
    todo.Created = new Date(todo.Created);
    todo.Created = todo.Created.getTime() / 1000;
  });
  todos_listed.sort((a, b) => {
    return a.Created - b.Created;
  });
  return todos_listed;
}

function sort_byImportance() {
  todos_listed = todos;
  todos_listed.sort(function (a, b) {
    return b.Importance - a.Importance;
  });
  return todos_listed;
}

function filter_completed() {
  let arr_filtered = todos.filter((arr) => {
    return arr.Completed == 0;
  });
  return arr_filtered;
}

function filter_open() {
  let arr_filtered = todos.filter((arr) => {
    return arr.Completed == 1;
  });
  return arr_filtered;
}

export {
  init_storage,
  get_todos,
  remove_todo,
  new_todo,
  sort_name,
  sort_byDue,
  sort_bycreation,
  sort_byImportance,
  filter_completed,
  filter_open,
};
