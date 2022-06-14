
/* Project : TODO - APP 
-------------------------------------------------------------- */
/*  Dependencies                                                                                                                                                                         Head Heart Web <3 Consult your WebDoc about Middleware, Margin and Padding 
-------------------------------------------------------------- */
import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from "method-override";
import cors from 'cors';



const app = express();
//const router = express.Router();

import {todo_Routes} from './routes/todo-routes.js';
import * as rest_Controllers from './controller/rest-controllers.js';


//import * as todos_Storage from './services/todo_storage.js';
//var test_db = {text1: "hallo kleiner wie gehts dir ich habe muehe mit dir"};
//todos_Storage.storage.add(test_db);



//todos_Storage.add_to_db(test_db);

/* Imports, Declarations, Selectors
-------------------------------------------------------------- */


// router.get("/get_todos", get_todos);

/* Main 
-------------------------------------------------------------- */

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride(methodOverrideFn));

app.use(rest_Controllers.myDummyLogger());

app.use(todo_Routes);

// app.use(express.static('./public'));

app.use(notFound);
app.use(errorHandler);


/* Middleware
-------------------------------------------------------------- */

function notFound(req, res, next) {
    res.setHeader("Content-Type", 'text/html');
    res.send(404, "Confound it all!  We could not find ye's page! ");
}

function errorHandler(err, req, res, next) {
    res.status(500).end(err.message);
}

function methodOverrideFn(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}

/* Server Application 
-------------------------------------------------------------- */

const hostname = '127.0.0.1';
const port = 3001;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


