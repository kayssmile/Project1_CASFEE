/* TODOS
-------------------------------------------------------------- */

/* TODOS: Imports, Declarations, Selectors
-------------------------------------------------------------- */

import * as Storage from "../../model/data/storage.js"


var todos = [];
var todos_listed = [];



/* TODOS: Application
-------------------------------------------------------------- */

todos = Storage.ChecklocalStorage();


function get_todos(){
    for(let x = 0; x < todos.length; x++){
        todos[x].id = x+1;
    }
    todos.sort(function(a, b){
        return a.id - b.id;
    });
    return todos;
}

function new_todo(todo){
    todos.push(todo);
    Storage.UpdatelocalStorage(todos);
}


function remove_todo(Id){
    todos.splice(getIndex_todo(Id), 1);
    Storage.UpdatelocalStorage(todos);
}



function getIndex_todo(ID){
    for(let todo of todos){
        if(todo.id == ID){
            return todos.indexOf(todo); 
        }
    }
}

function sort_name(){
    todos_listed = todos;
    todos_listed.sort(function(a, b){
        if(a.Title < b.Title) { return -1; }
        if(a.Title > b.Title) { return 1; }
        return 0;
    });
    return todos_listed;
}

function sort_byDue(){
    todos_listed = todos;
    todos_listed.map((todo) =>{
        todo.Duevalue =  new Date(todo.Due);
        todo.Duevalue =  todo.Duevalue.getTime() / 1000;
    });
    todos_listed.sort((a, b) =>{
        return a.Duevalue - b.Duevalue;
    });
    return todos_listed;
}

function sort_bycreation(){
    todos_listed = todos;
    todos_listed.map((todo) =>{
        todo.Created =  new Date(todo.Created);
        todo.Created =  todo.Created.getTime() / 1000;
    });
    todos_listed.sort((a, b) =>{
        return a.Created - b.Created;
    });
    return todos_listed;
}

function sort_byImportance(){
    todos_listed = todos;
    todos_listed.sort(function(a, b){
        return b.Importance - a.Importance;
    });
    return todos_listed;
}

function filter_completed(){
    let arr_filtered = todos.filter((arr) =>{
        return arr.Completed == 0;
    })
    return arr_filtered;

}

function filter_open(){
    let arr_filtered = todos.filter((arr) =>{
        return arr.Completed == 1;
    })
    return arr_filtered;
}


export {get_todos, remove_todo, new_todo, sort_name, sort_byDue, sort_bycreation, sort_byImportance, filter_completed, filter_open}