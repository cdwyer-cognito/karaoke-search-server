onload = async function(){
    const jsonObj = JSON.parse(document.getElementById("jsonObjString").innerHTML);
    const stringElement = document.getElementById("string");
    const stringArray = [
        "Thank you " + jsonObj.Singer + ",",
        "your request of \"" + jsonObj.Title + "\" in the style of",
        "" + jsonObj.Artist + " has been submitted to the DJ.",
        "Keep listening and you will be",
        "called when it's your turn to sing",
        "Returning to Main Menu in . . ."
    ]


    
    for (let line of stringArray ) {
        console.log(line);

        stringElement.innerHTML = line;
        stringElement.setAttribute("data-text", line.split("&amp;").join("&"));

        await timer();

    }

    //navMainMenu();
}

timer = function(){

    return new Promise(function(resolve){
        let timeleft = 5;
        let downloadTimer = setInterval(function(){
            timeleft--;
                
            if ( timeleft <= 0 ) {
                clearInterval(downloadTimer);
                resolve();
            }

        },950);
    });
}

navMainMenu = function(){
    window.location.href = "/search/menu";
}