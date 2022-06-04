/*  Todo_CASFEE : Home Application
--------------------------------------------------------------*/
/*  Imports
--------------------------------------------------------------*/

import CSS from "../Styles/Stylesheet.scss";
import * as Tools from "./Tools.js";
import * as todos from "./todos.js";


/*  App
--------------------------------------------------------------*/

async function app(){
 //   console.log(Tools.createImportance("3"));
    Tools.init();
    Tools.renderList(todos.get_todos());
    window.addEventListener("click", Tools.delegation_home);
   

}

app();
