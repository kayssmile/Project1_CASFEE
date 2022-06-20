
/* Project : REST - API 
-------------------------------------------------------------- */
/*  Dependencies                                                                                                                                                                         Head Heart Web <3 Consult your WebDoc about Middleware, Margin and Padding 
-------------------------------------------------------------- */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();

import {todo_Routes} from './routes/todo-routes.js';
import * as rest_Controllers from './controller/rest-controllers.js';

/* Main 
-------------------------------------------------------------- */

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(todo_Routes);
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

/* Server Application 
-------------------------------------------------------------- */

const hostname = '127.0.0.1';
const port = 3001;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


