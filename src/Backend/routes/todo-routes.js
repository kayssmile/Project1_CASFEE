


import express from 'express';
const router = express.Router();

import * as rest_Controllers from '../controller/rest-controllers.js';


/* Routing
-------------------------------------------------------------- */





// router.all("/*",  rest_Controllers.myDummyLogger);

router.get("/get_todos", rest_Controllers.get_todos);
router.get("/error", rest_Controllers.generateError);
router.post("/new_todo", rest_Controllers.new_todo);

router.post("/update_todo", rest_Controllers.update_todo);

router.post("/delete_todo", rest_Controllers.delete_todo);


// router.get("/orders", createOrder);
// router.post("/orders", createPizza);
// router.get("/orders/:id/", showOrder);
// router.delete("/orders/:id/", deleteOrder);





export const todo_Routes = router;



