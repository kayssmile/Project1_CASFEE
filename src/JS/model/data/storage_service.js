/* Storage - Service (API)
-------------------------------------------------------------- */

async function rest_api(settings) {
  var response;
  try {
    if (settings.Method == "GET") {
      response = await fetch(`${settings.URL}`);
    } else {
      response = await fetch(`${settings.URL}`, {
        method: settings.Method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings.data),
      });
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

/* 
async function new_todo(data){
    console.log("lets go");
    console.log(data);
    try{
        const response = await fetch("http://127.0.0.1:3001/new_todo",{
                        method: "POST",
                        headers: {
                                 "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
     //   return  await response.json();
    } 
    catch(error){
            console.log(error);
    }
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





async function update_todo(data){

    try{
        const response = await fetch("http://127.0.0.1:3001/update_todo",{ // Put
                        method: "PUT",
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
*/
/* 

*/

/*
async function update_todo(data){

    try{
        const response = await fetch("http://127.0.0.1:3001/update_todo",{ // Put
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
   // ${todo_id.todo_id}
    try{
        const response = await fetch(`http://127.0.0.1:3001/del_todo`,{ // delete todos/:id //delete/todo/${todo_id.todo_id}
                        method: "POST",
                        headers: {
                                 "Content-Type": "application/json",
                        },
                        body: JSON.stringify(todo_id)
                    })
      //  console.log(response);           
        return  await response.json();
    } 
    catch(error){
            console.log(error);
    }
}
   */
/* 
async function del_todo(todo_id){
    // ${todo_id.todo_id}
     try{
         const response = await fetch(`http://127.0.0.1:3001/delete/todo/${todo_id.todo_id}`,{ // delete todos/:id //delete/todo/${todo_id.todo_id}
                         method: "DELETE",
                         headers: {
                                  "Content-Type": "application/json",
                         },
                         body: JSON.stringify(todo_id)
                     })
       //  console.log(response);           
         return  await response.json();
     } 
     catch(error){
             console.log(error);
     }
 }


    async function get_test(){
        var API_test = await start_rest();
        console.log(API_test);
    }
    
*/

export { rest_api };

// export {ChecklocalStorage, UpdatelocalStorage, get_todos, new_todo, update_todo, delete_todo, del_todo, rest_api}
