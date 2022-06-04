/* TODOS
-------------------------------------------------------------- */




var todos = [
    {id: 1, Title: "Hausaufgaben", Entry: "Hausaufgaben Vorlesung vom 1.6.2022", Importance: "4", Due: "2023-05-21", Completed: "0", Created: "2002-05-22"},
    {id: 2, Title: "JavaScript", Entry: "Hausaufgaben Vorlesung vom 2.6.2022", Importance: "3", Due: "2018-06-22", Completed: "1", Created: "2005-05-23"},
    {id: 3, Title: "OOP/OOD", Entry: "Hausaufgaben Vorlesung vom 3.6.2022", Importance: "2", Due: "2019-01-01", Completed: "0", Created: "2006-05-24"},
    {id: 4, Title: "CSS3", Entry: "Hausaufgaben Vorlesung vom 4.6.2022", Importance: "5", Due: "2020-03-16", Completed: "0", Created: "2023-05-25"},    
    {id: 5, Title: "Angular", Entry: "Hausaufgaben Vorlesung vom 5.6.2022", Importance: "1", Due: "2021-06-11", Completed: "1", Created: "2012-05-26"},
    {id: 6, Title: "React", Entry: "Hausaufgaben Vorlesung vom 11.6.2022", Importance: "1", Due: "2022-08-01", Completed: "1", Created: "2020-05-27"},
    {id: 7, Title: "Projekt2", Entry: "Hausaufgaben Vorlesung vom 12.6.2022", Importance: "0", Due: "2022-09-09", Completed: "0", Created: "2022-05-28"}
];

var todos_listed = [];

function get_todos(){
    todos.sort(function(a, b){
        return a.id - b.id;
    });
    return todos;
}

function new_todo(todo){
    todos.push(todo);
}

function remove_todo(Id){
    todos.splice(getIndex_todo(Id), 1);
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