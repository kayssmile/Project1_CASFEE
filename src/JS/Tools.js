/* Project : Tools
-------------------------------------------------------------- */
/* Tools : Dependencies                                                                                                                                                                         Head Heart Web <3 Consult your WebDoc about Middleware, Margin and Padding 
-------------------------------------------------------------- */
 
// import { GraphQLClient, gql } from 'graphql-request';

/* Tools: Imports, Declarations, Selectors
-------------------------------------------------------------- */

import * as todo_tools from "./TODO.js";

// var new_todo_flag = 0;
var filter_flag = 0;

var ongoing = false;
var counter = 10;



/* TODOS
-------------------------------------------------------------- */

var todos = [
    {id: 1, Title: "Hausaufgaben", Entry: "Hausaufgaben Vorlesung vom 1.6.2022", Importance: "4", Due: "20.06.2022", Completed: "0"},
    {id: 2, Title: "JavaScript", Entry: "Hausaufgaben Vorlesung vom 2.6.2022", Importance: "3", Due: "16.06.2022", Completed: "1"},
    {id: 3, Title: "OOP/OOD", Entry: "Hausaufgaben Vorlesung vom 3.6.2022", Importance: "2", Due: "21.06.2022", Completed: "0"},
    {id: 4, Title: "CSS3", Entry: "Hausaufgaben Vorlesung vom 4.6.2022", Importance: "5", Due: "2.10.2022", Completed: "0"},    
    {id: 5, Title: "Angular", Entry: "Hausaufgaben Vorlesung vom 5.6.2022", Importance: "1", Due: "7.09.2022", Completed: "1"},
    {id: 6, Title: "React", Entry: "Hausaufgaben Vorlesung vom 11.6.2022", Importance: "1", Due: "11.08.2022", Completed: "1"},
    {id: 7, Title: "Projekt2", Entry: "Hausaufgaben Vorlesung vom 12.6.2022", Importance: "0", Due: "26.07.2022", Completed: "0"}
];



/*  Home : Rendering
-------------------------------------------------------------- */



function createImportance(importance){
        var importanceHtml = "";
        for(let x = 0; x < importance; x++){
            importanceHtml += '<p class="lit__item--import">*</p>';    
        }
        return importanceHtml;
}

function renderList(data){
    let liste = document.querySelector(".list");
    liste.innerHTML = "";

    for(let todo of todos){
        if(todo.Completed == 1){todo.Completed = "checked";}else{todo.Completed = "";}      
        const element = document.createElement("li");
        element.setAttribute("data-id", todo.id);
        element.classList.add("list__item");
        element.innerHTML = `
        <p class="list__item--title"><span class="list__item--id">#${todo.id}</span>${todo.Title}</p>
        <p class="list__item--description">${todo.Entry}</p>
    
        <div class="list__item--importance">
            <p class="list__item--text">Importance: </p>
            ${createImportance(todo.Importance)}
        </div>
        <p class="list__item--text">Erledigen bis: ${todo.Due}</p>
        <div class="list__item--completed">
            <label for="completed">Completed</label>
            <input class="list__item--completedinput" type="checkbox" id="completed" name="completed" ${todo.Completed}>
        </div>
        <button class="list__item--btn1">Edit</button>
        <button class="list__item--btn2">Delete</button> 
    `;
        liste.appendChild(element);
    }
}



/* Home : Delegation
-------------------------------------------------------------- */

function delegation_home(event){

    let element = event.target;
    console.log(element);

    if(element.matches(".header__moon") || element.matches(".header__moonpath")){
        document.querySelector(".header__moon").style.display = "none";
        document.querySelector(".header__sun").style.display = "inline-block";
        document.querySelector(".header").style.backgroundColor = "rgb(0, 0, 0)";
        document.querySelector(".header__text").style.color = "white";

    }
    if(element.matches(".header__sun") || element.matches(".header__sunpath")){
        document.querySelector(".header__moon").style.display = "inline-block";
        document.querySelector(".header__sun").style.display = "none";
        
        document.querySelector(".header").style.backgroundColor = "rgb(251, 226, 2)";
        document.querySelector(".header__text").style.color = "black";
    }
    if(element.matches(".newtodo__btn")){
        document.querySelector("main").classList.add("none");
        document.querySelector(".new").classList.add("flex");
        document.querySelector(".new__function").textContent = "New TODO ";
        todos.push(todo_tools.delegation_TODO(1));
        renderList();
        /* 
        setTimeout(() => {
             ongoing = false;
             document.querySelector("main").style.display = "none";
            }, 1000);  
        ongoing = true;
        let selektor = document.querySelector("main");
        countUp(selektor);
*/
    }
    if(element.matches(".filter__btn") || element.matches(".filter__btn--text") || element.matches(".filter__btn--svg") || element.matches(".filter__btn--svgpath")){
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
    if(element.matches(".list__item--btn1")){
        document.querySelector("main").classList.add("none");
        document.querySelector(".new").classList.add("flex");
        document.querySelector(".new__function").textContent = "Edit TODO ";
        let indexTodo = getIndex_todo(event.target.parentNode.dataset.id);
        todo_tools.delegation_TODO(0, indexTodo, todos);
        
    
    }
    if(element.matches(".list__item--btn2")){
        let todoId = event.target.parentNode.dataset.id;
        todos.splice(getIndex_todo(todoId), 1); 
        renderList();
    }
       
        
       
    
}


/*  Home : Functions
-------------------------------------------------------------- */

function getIndex_todo(ID){
    for(let todo of todos){
        if(todo.id == ID){
            return todos.indexOf(todo); 
        }
    }
}



function countUp(selektor){

    if(ongoing){
        counter--;
        console.log(counter);
       // selektor.style.opacity = `0.${counter}`;
        console.log(`0.${counter}`);
        console.log(selektor);
        setTimeout(countUp(selektor), 100);
    }
}






export {delegation_home, renderList, };


