clickBack = function(){
    window.location.href = "/search/menu";

    let timeleft = 10;
    let downloadTimer = setInterval(function(){
        timeleft--;
        
        if ( timeleft <= 0 ) {
            console.log("timed out waiting for a response, retrying");
            clearInterval(downloadTimer);
            clickBack();
        }
    },1000);
}

clickButton = function(selection){
    console.log("User Selected " + selection);

    const pageTitle = document.title;

    console.log("Page title read as " + pageTitle);

    let field;

    if ( pageTitle === "Browse by Title" ) {
        field = "title";
    } else if ( pageTitle === "Browse by Artist" ) {
        field = "artist";
    }

    const url = "/search/results/" + field + "/startswith/" + selection;

    window.location.href = url;

    let timeleft = 10;
    let downloadTimer = setInterval(function(){
        timeleft--;
        
        if ( timeleft <= 0 ) {
            console.log("timed out waiting for a response, retrying");
            clearInterval(downloadTimer);
            clickButton(selection);
        }
    },1000);
}