clickBack = function(){
    window.location.href = "/search/menu";
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
}