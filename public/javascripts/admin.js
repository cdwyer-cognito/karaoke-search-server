postMessage = async function(url){

    fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: "{}"
    })
    .then(function(message){
        console.log(message);
    })
    .catch(err => console.log(err));

}

reloadLibrary = function(){
    console.log("Reload Library Db");
    if ( confirm("Are You Sure You Want to Load / Reload the Karaoke Library?") ) {
        postMessage("/admin/load-library");
    }

}

dropRequests = function(){
    console.log("Drop Requests Db");
    if ( confirm("Are You Sure You Want to drop the Drop the Requests Db?") ) {
        postMessage("/admin/drop-requests");
    }

}


navMainMenu = function(){
    window.location.href = "/search/menu";
}

navRequestsMenu = function(){



}