/* Project : Tools
-------------------------------------------------------------- */
/* Tools : Dependencies                                                                                                                                                                         Head Heart Web <3 Consult your WebDoc about Middleware, Margin and Padding 
-------------------------------------------------------------- */
 
// import { GraphQLClient, gql } from 'graphql-request';

/* Tools: Imports, Declarations, Selectors
-------------------------------------------------------------- */

import * as todo_tools from "./TODO.js";
import * as todos from "./todos.js";


// var new_todo_flag = 0;
var filter_flag = 0;

var ongoing = false;
var counter = 10;
var color_flag = 0;

var activ_filter = document.querySelector(".filter_activ");

/* TODOS
-------------------------------------------------------------- */





/*  Home : Rendering
-------------------------------------------------------------- */

function createDate(todoDue){
    let due_arr = todoDue.split("-");
    return `${due_arr[2]}.${due_arr[1]}.${due_arr[0]}`;
}

function createImportance(importance){
        var importanceHtml = "";
        for(let x = 0; x < importance; x++){
            importanceHtml += '<p class="lit__item--import">*</p>';    
        }
        return importanceHtml;
}

function renderList(todos){

    let liste = document.querySelector(".list");
    liste.innerHTML = "";
    for(let todo of todos){
        let checked = "";
        if(todo.Completed == 1){checked = "checked";}      
        const element = document.createElement("li");
        element.setAttribute("data-id", todo.id);
        element.classList.add("list__item");
        element.innerHTML = `
        <p class="list__item--title">#<span class="list__item--id">${todo.id}</span>${todo.Title}</p>
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
    }
    if(color_flag){
        night_mood();
    }else{
        day_mood();
    }
}

/* Home : Delegation
-------------------------------------------------------------- */

function delegation_home(event){

    let element = event.target;
    console.log(element);
    let list = document.querySelector(".list");

    if(element.matches(".header__moon") || element.matches(".header__moonpath")){
        night_mood();
        color_flag = 1;
    }
    if(element.matches(".header__sun") || element.matches(".header__sunpath")){
        day_mood();
        color_flag = 0;
    }
    if(element.matches(".newtodo__btn")){
        document.querySelector("main").classList.add("none");
        document.querySelector(".new").classList.add("flex");
        document.querySelector(".new__function").textContent = "New TODO #";
        document.querySelector(".new__id").textContent = todos.get_todos().length+1;
        todo_tools.delegation_TODO(1,0);
    }
    if(element.matches(".filter__btn--cross") || element.matches(".filter__btn--crosspath")){
        list.dataset.filter = "none";
        activ_filter.innerText = "None";
        init();
        renderList(todos.get_todos());
    }
    if(element.matches(".filter__btn") || element.matches(".filter__btn--text") || element.matches(".filter__btn--svg") || element.matches(".filter__btn--svgpath") || element.matches(".filter__container")){
        if(element.matches(".filter__btn")){
            element = element.parentNode.children[1];
        }
        else if(element.matches(".filter__btn--text")){
            element = element.parentNode.parentNode.children[1];
        }
        else if(element.matches(".filter__btn--svg")){
            element = element.parentNode.parentNode.children[1];
        }
        else if(element.matches(".filter__btn--svgpath")){
            element = element.parentNode.parentNode.parentNode.children[1];
        }
        else if(element.matches(".filter__container")){
            element = element.parentNode.parentNode.children[1];
        }
        if(filter_flag === 0){
            document.querySelector(".filter__btn--svg").style.transform = "rotate(180deg)";
            element.style.marginTop = "10px";
            filter_flag = 1;
        }else{
            document.querySelector(".filter__btn--svg").style.transform = "rotate(0deg)";
            element.style.marginTop = null;
            filter_flag = 0;
        }
    }
    if(element.matches(".byname")){
        list.dataset.filter = "byname";
        activ_filter.innerText = "Name";  
        renderList(todos.sort_name());
    }
    if(element.matches(".bydue")){
        list.dataset.filter = "bydue";
        activ_filter.innerText = "Due";
        renderList(todos.sort_byDue());
    }
    if(element.matches(".bycreation")){
        list.dataset.filter = "bycreation";
        activ_filter.innerText = "Creation";
        renderList(todos.sort_bycreation());
    }
    if(element.matches(".byimportance")){
        list.dataset.filter = "byimportance";
        activ_filter.innerText = "Importance";
        renderList(todos.sort_byImportance());
    }
    if(element.matches(".checkcompleted")){
        if(document.querySelector(".checkcompleted").checked === true){
            document.querySelector(".checkbyopen").disabled = true;
            renderList(todos.filter_completed());  
        }
        if(document.querySelector(".checkcompleted").checked === false){
            document.querySelector(".checkbyopen").disabled = false;
            renderList(todos.get_todos());    
        }
    }
    if(element.matches(".checkbyopen")){
       
        if(document.querySelector(".checkbyopen").checked === true){
            document.querySelector(".checkcompleted").disabled = true;
            renderList(todos.filter_open());      
        }else if(document.querySelector(".checkbyopen").checked === false){
            document.querySelector(".checkcompleted").disabled = false;
            renderList(todos.get_todos());
        }
            
    }
    if(element.matches(".list__item--btn1")){
        document.querySelector("main").classList.add("none");
        document.querySelector(".new").classList.add("flex");
        let todo_id = element.parentNode.dataset.id;
        document.querySelector(".new__function").textContent = "Edit TODO #"+todo_id;
        todo_tools.delegation_TODO(0,todo_id);
    }
    if(element.matches(".list__item--btn2")){
        let todoId = event.target.parentNode.dataset.id;   
        todos.remove_todo(todoId);
        if(list.dataset.filter === "none"){
            renderList(todos.get_todos());
        }else if(list.dataset.filter === "byname"){
            renderList(todos.sort_name());
        }
        else if(list.dataset.filter === "bydue"){
            renderList(todos.sort_byDue());
        }
        else if(list.dataset.filter === "bycreation"){
            renderList(todos.sort_bycreation());
        }
        else if(list.dataset.filter === "byimportance"){
            renderList(todos.sort_byImportance());
        }

      //  if(document.querySelector(".checkbyopen").checked == true){}

        
     
        

    }

      
}


/*  Home : Functions
-------------------------------------------------------------- */

function init(){
    document.querySelector(".checkbyopen").checked = false;
    document.querySelector(".checkcompleted").checked = false
}

function night_mood(){
    document.querySelector(".header__moon").style.display = "none";
    document.querySelector(".header__sun").style.display = "inline-block";
    document.querySelector(".header").style.backgroundColor = "rgb(0, 0, 0)";
    document.querySelector(".header__text").style.color = "white";
    document.querySelector(".todolist__box--title").style.color = "white";
    document.querySelector("body").classList.add("night");
    document.querySelector(".new").style.backgroundColor = "rgb(14, 126, 230)";
    document.querySelector(".new").style.border = "1px rgb(0, 0, 0) solid";
    
    let transparents = document.querySelectorAll(".transparent");
    for(let transparent of transparents){
        transparent.classList.add("night");
    }
    let items = document.querySelectorAll(".list__item");
    for(let item of items){
        item.style.backgroundColor = "rgb(14, 126, 230)";
    }
    let filter_elements = document.querySelectorAll(".filter__select--btn");
    for(let filter_element of filter_elements){
        filter_element.classList.remove("byday");
        filter_element.classList.add("bynight");
    }
}

function day_mood(){
    document.querySelector(".header__moon").style.display = "inline-block";
    document.querySelector(".header__sun").style.display = "none";
    document.querySelector(".header").style.backgroundColor = "rgb(251, 226, 2)";
    document.querySelector(".header__text").style.color = "black";
    document.querySelector(".todolist__box--title").style.color = "black";
    document.querySelector("body").classList.remove("night");
    document.querySelector(".new").style = "";
    let transparents = document.querySelectorAll(".transparent");
    for(let transparent of transparents){
        transparent.classList.remove("night");
    }
    let items = document.querySelectorAll(".list__item");
    for(let item of items){
        item.style = "";
    }
    let filter_elements = document.querySelectorAll(".filter__select--btn");
    for(let filter_element of filter_elements){
        filter_element.classList.remove("bynight");
        filter_element.classList.add("byday");
    }
}


export {delegation_home, renderList, init};


