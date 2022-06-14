

var default_entries = [
    {id: 1, Title: "Hausaufgaben", Entry: "Hausaufgaben Vorlesung vom 1.6.2022", Importance: "4", Due: "2023-05-21", Completed: "0", Created: "2002-05-22"},
    {id: 2, Title: "JavaScript", Entry: "Hausaufgaben Vorlesung vom 2.6.2022", Importance: "3", Due: "2018-06-22", Completed: "1", Created: "2005-05-23"},
    {id: 3, Title: "OOP/OOD", Entry: "Hausaufgaben Vorlesung vom 3.6.2022", Importance: "2", Due: "2019-01-01", Completed: "0", Created: "2006-05-24"},
    {id: 4, Title: "CSS3", Entry: "Hausaufgaben Vorlesung vom 4.6.2022", Importance: "5", Due: "2020-03-16", Completed: "0", Created: "2023-05-25"},    
    {id: 5, Title: "Angular", Entry: "Hausaufgaben Vorlesung vom 5.6.2022", Importance: "1", Due: "2021-06-11", Completed: "1", Created: "2012-05-26"},
    {id: 6, Title: "React", Entry: "Hausaufgaben Vorlesung vom 11.6.2022", Importance: "1", Due: "2022-08-01", Completed: "1", Created: "2020-05-27"},
    {id: 7, Title: "Projekt2", Entry: "Hausaufgaben Vorlesung vom 12.6.2022", Importance: "0", Due: "2022-09-09", Completed: "0", Created: "2022-05-28"}
];



function ChecklocalStorage(){
    if(localStorage.getItem("TODOS") && localStorage.getItem("TODOS") != "[]"){
        let TODOS = JSON.parse((localStorage.getItem("TODOS")));
        return TODOS;
    }else{
        let default_obj = JSON.stringify(default_entries);
        localStorage.setItem("TODOS", default_obj);
        return default_entries;
    }   
}

function UpdatelocalStorage(todos){
    localStorage.setItem("TODOS", JSON.stringify(todos));
}

async function get_todos(){
    try{
        const response =  await fetch("http://127.0.0.1:3001/get_todos");
        if(response.status == 200){
            return response.json();    
        }
        else{
            console.log("Error");
        }
    }
    catch (error){
        console.log(`ServerProblem: ${error}`);
        return 0;
    }
}


async function new_todo(data){
    try{
        const response = await fetch("http://127.0.0.1:3001/new_todo",{
                        method: "POST",
                        headers: {
                                 "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
        return  await response.json();
    } 
    catch(error){
            console.log(error);
    }
}

async function update_todo(data){
    try{
        const response = await fetch("http://127.0.0.1:3001/update_todo",{
                        method: "POST",
                        headers: {
                                 "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
        return  await response.json();
    } 
    catch(error){
            console.log(error);
    }
}

async function delete_todo(todo_id){
    console.log(todo_id);
    try{
        const response = await fetch("http://127.0.0.1:3001/delete_todo",{
                        method: "POST",
                        headers: {
                                 "Content-Type": "application/json",
                        },
                        body: JSON.stringify(todo_id)
                    })
        return  await response.json();
    } 
    catch(error){
            console.log(error);
    }
}
  
/* 
    async function get_test(){
        var API_test = await start_rest();
        console.log(API_test);
    }
    
*/  
 
export {ChecklocalStorage, UpdatelocalStorage, get_todos, new_todo, update_todo, delete_todo}