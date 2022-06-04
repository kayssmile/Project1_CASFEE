
/* New & Edit TODO
-------------------------------------------------------------- */

/* Imports, Declarations, Selectors
-------------------------------------------------------------- */

import * as todos from "./todos.js";
import * as Tools from "./Tools.js";

var title_input = document.querySelector(".new__title--input");
var importance_input = document.querySelector(".new__importance--input");
var due_input = document.querySelector(".new__due--input");
var complete_input = document.querySelector(".new__completed--input");
var description_input = document.querySelector(".new__description--input");
    
var id_selector = document.querySelector(".new__id");
    
    
var new_todo = {};
/*
const selectors = {
    title_input : document.querySelector(".new__title--input"),
    importance_input : document.querySelector(".new__importance--input"),
    due_input : document.querySelector(".new__due--input"),
    complete_input : document.querySelector(".new__completed--input"),
    description_input : document.querySelector(".new__description--input"),
    form_todo : document.querySelector(".new"),
    id_todo : document.querySelector(".new__id"),

    new_todo : function (){
        this.title_input.value;
        this.importance_input.value;
        this.due_input.value;
        this.complete_input.value;
        this.description_input.value;
    },
    delete : function (){
        this.title_input.value = "";
        this.importance_input.value = "";
        this.due_input.value = "";
        this.complete_input.value = "";
        this.description_input.value = "";
    },
    update : function(){
        todo.Title = this.title_input.value;
        todo.Entry = this.description_input.value;
        todo.Importance = new_todo.Importance;
        todo.Due = this.due_input.value;
        todo.Completed = this.description_input.value;
    }
}   */

    function delete_inputs(){
        title_input.value = "";
        importance_input.value = "";
        due_input.value = "";
        complete_input.value = "";
        description_input.value = "";
    }

function delegation_TODO(function_flag, todoId){
    
    if(function_flag){
        delete_inputs();
        document.querySelector(".create").classList.remove("none");
        document.querySelector(".update").classList.add("none");
    }else{
        document.querySelector(".create").classList.add("none");
        document.querySelector(".update").classList.remove("none");
        title_input.value =  todos.get_todos()[todoId-1].Title;
        importance_input.value = todos.get_todos()[todoId-1].Importance;
        due_input.value = todos.get_todos()[todoId-1].Due;
        if(todos.get_todos()[todoId-1].Completed == "1"){complete_input.checked = "true"}
        description_input.value = todos.get_todos()[todoId-1].Entry; 
    }
    document.querySelector(".new").addEventListener("click", () =>{   
        let element = event.target;
        if(element.matches(".create")){
            if(function_flag){
                new_todo.id = id_selector.innerText;
                new_todo.Title = title_input.value;
                new_todo.Entry = description_input.value
                new_todo.Importance = importance_input.value;
                new_todo.Due = due_input.value;
                new_todo.Completed = complete_input.value;
                new_todo.Created = new Date().toISOString().slice(0, 10);
                todos.new_todo(new_todo);
                document.querySelector("main").classList.remove("none");
                document.querySelector(".new").classList.remove("flex");
                Tools.renderList(todos.get_todos());
            }
        }
        if(element.matches(".update")){
            todos.get_todos()[todoId-1].Title = title_input.value;
            todos.get_todos()[todoId-1].Importance = importance_input.value;
            todos.get_todos()[todoId-1].Due = due_input.value;
            todos.get_todos()[todoId-1].Completed = complete_input.checked;
            todos.get_todos()[todoId-1].Entry = description_input.value;
        }
        if(element.matches(".delete")){
            delete_inputs();
        }     
        if(element.matches(".overview")){ 
            document.querySelector("main").classList.remove("none");
            document.querySelector(".new").classList.remove("flex");
            Tools.renderList(todos.get_todos());         
        }
    })
}


export {delegation_TODO};