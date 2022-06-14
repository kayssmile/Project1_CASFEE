
import * as db_service from "../services/db_service.js";



 var todos = [
    {id: 1, Title: "Hausaufgaben", Entry: "Hausaufgaben Vorlesung vom 1.6.2022", Importance: "4", Due: "2023-05-21", Completed: "0", Created: "2002-05-22"},
    {id: 2, Title: "JavaScript", Entry: "Hausaufgaben Vorlesung vom 2.6.2022", Importance: "3", Due: "2018-06-22", Completed: "1", Created: "2005-05-23"},
    {id: 3, Title: "OOP/OOD", Entry: "Hausaufgaben Vorlesung vom 3.6.2022", Importance: "2", Due: "2019-01-01", Completed: "0", Created: "2006-05-24"},
    {id: 4, Title: "CSS3", Entry: "Hausaufgaben Vorlesung vom 4.6.2022", Importance: "5", Due: "2020-03-16", Completed: "0", Created: "2023-05-25"},    
    {id: 5, Title: "Angular", Entry: "Hausaufgaben Vorlesung vom 5.6.2022", Importance: "1", Due: "2021-06-11", Completed: "1", Created: "2012-05-26"},
    {id: 6, Title: "React", Entry: "Hausaufgaben Vorlesung vom 11.6.2022", Importance: "1", Due: "2022-08-01", Completed: "1", Created: "2020-05-27"},
    {id: 7, Title: "Projekt2", Entry: "Hausaufgaben Vorlesung vom 12.6.2022", Importance: "0", Due: "2022-09-09", Completed: "0", Created: "2022-05-28"}
];


async function get_todos(req, res) {
    
    await db_service.storage.all(send_data);
    function send_data(todos){
        if(todos == "db_error"){
            res.status(500);
            res.end();
        }else{
            res.status(200);
            res.send(todos);
            res.end();
        }
    }
}

function new_todo(req, res) {
    if(!req.body){
        res.status(400);
        res.send({error: "No Content"});  
    }else{
        let result = db_service.storage.add(req.body);
        if(result === "failure"){
            res.status(500);
        }else{
            res.status(200);
        }
        res.end();
    }  
}

function update_todo(req, res) {
    if(!req.body){
        res.status(400);
        res.send({error: "No Content"});  
    }else{
        console.log(req.body);
        console.log(req.body.id);

        let result = db_service.storage.update(req.body.id, req.body);

        if(result === "failure"){
            res.status(500);
        }else{
            res.status(200);
        }
        res.end();
    }     
}

function delete_todo(req, res) {
    console.log("lets go");
    console.log(req.body);
    if(!req.body){
        res.status(400);
        res.send({error: "No Content"});  
    }else{
        console.log(req.body);
        console.log(typeof req.body);
        db_service.storage.delete(req.body);

        /* 
        if(result === "failure"){
            res.status(500);
        }else{
            res.status(200);
        }  */
        
        res.end();
    }    

}

function generateError(req, res, next) {
    next(new Error("Hier gibts ein Fehler!"));
}

function myDummyLogger(options) {
    options = options ? options : {};

    return function myInnerDummyLogger(req, res, next) {
        console.log(req.method + ":" + req.url);
        next();
    }
}

export { get_todos, new_todo, update_todo, delete_todo, generateError, myDummyLogger }