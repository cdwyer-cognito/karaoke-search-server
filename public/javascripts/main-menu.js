searchMenu = function( endpoint ) {
    console.log("Clicked button " + endpoint);
    window.location.href = endpoint;

    let timeleft = 10;
    let downloadTimer = setInterval(function(){
        timeleft--;
        
        if ( timeleft <= 0 ) {
            console.log("timed out waiting for a response, retrying");
            clearInterval(downloadTimer);
            searchMenu(endpoint);
        }
    },1000);
}

clickSearch = function(){

    const search = document.getElementById("search").value
    let field;

    if (search.length < 2 ) {
       alert("Plese enter 2 or more characters");  
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

        let timeleft = 10;
        let downloadTimer = setInterval(function(){
            timeleft--;
           
            if ( timeleft <= 0 ) {
                console.log("timed out waiting for a response, retrying");
                clearInterval(downloadTimer);
                clickSearch();
            }
        },1000);
        
    }

}