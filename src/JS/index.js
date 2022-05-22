/*  Todo_CASFEE : Home Application
--------------------------------------------------------------*/
/*  Imports
--------------------------------------------------------------*/

import CSS from "../Styles/Stylesheet.scss";
import * as Tools from "./Tools.js";


/*  App
--------------------------------------------------------------*/

async function app(){
 //   console.log(Tools.createImportance("3"));
    Tools.renderList()
    window.addEventListener("click", Tools.delegation_home);
    console.log("hellou");

}

app();
