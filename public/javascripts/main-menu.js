searchMenu = function( endpoint ) {
    console.log("Clicked button " + endpoint);
    window.location.href = endpoint;
}

clickSearch = function(){

    const search = document.getElementById("search").value
    let field;

    if (search.length < 2 ) {
        window.alert("Plese enter 2 or more characters");  
    } else {
        

        if ( document.getElementById("switch_3_left").checked ) {
            field = "artist";
        } else if (document.getElementById("switch_3_center").checked ) {
            field = "title";
        } else if (document.getElementById("switch_3_right").checked ) {
            field = "all";
        }

        const url = "/search/results/" + field + "/contains/" + search;
        console.log("Sending request to " + encodeURI(url) );
        
        window.location.href = url;        
        
    }

}