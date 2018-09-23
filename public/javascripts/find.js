clickBack = function(){
    window.location.href = "/search/menu";
}

clickSearch = function(){

    const search = document.getElementById("search").value
    let field;

    if (search.length < 2 ) {
        window.alert("ALERT", "Plese enter 2 or more characters");  
    } else {
        

        if ( document.getElementById("switch_3_left").checked ) {
            field = "artist";
        } else if (document.getElementById("switch_3_center").checked ) {
            field = "title";
        } else if (document.getElementById("switch_3_right").checked ) {
            field = "all";
        }

        // TBD perfom get for /search/{{field}}/{{search}}
        
    }

}