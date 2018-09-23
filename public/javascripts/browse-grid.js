clickBack = function(){
    window.location.href = "/search/menu";
}

clickButton = function(selection){
    console.log("User Selected " + selection);

    const pageTitle = document.title;

    console.log("Page title read as " + pageTitle);
    let url;

    if( pageTitle === "Browse by Title" ) {
        url = "/search/browse/bytitle/find/" + selection;
    } else if ( pageTitle === "Browse by Artist" ) {
        url = "/search/browse/byartist/find/" + selection;
    }

    console.log("GET " + url);

    fetch(url)
    .catch(err => console.log(err));
}