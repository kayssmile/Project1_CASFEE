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

function ChecklocalStorage() {
  let MOOD;
  if (localStorage.getItem("MOOD") && localStorage.getItem("MOOD") != "[]") {
    MOOD = JSON.parse(localStorage.getItem("MOOD"));
  } else {
    MOOD = "day";
  }
  return MOOD;
}

function setlocalStorage(State) {
  let mood_state = JSON.stringify(State);
  localStorage.setItem("MOOD", mood_state);
}

export { rest_api, ChecklocalStorage, setlocalStorage };
