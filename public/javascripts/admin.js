postMessage = async function(url){
    let res;
    await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: "{}"
    })
    .then(response => {res = response})
    .catch(err => console.log(err));

    return res;
}

reloadLibrary = async function(){
    console.log("Reload Library Db");
    if ( confirm("Are You Sure You Want to Load / Reload the Karaoke Library?") ) {
        let response = await postMessage("/admin/load-library");

        console.log(response);
        
        if ( response.status === 200 ) {
            alert("Karaoke Library Loaded");
        }
    }

}

dropRequests = async function(){
    console.log("Drop Requests Db");
    if ( confirm("Are You Sure You Want to drop the Requests Db?") ) {
        let response = await postMessage("/admin/drop-requests");

        if ( response.status === 200 ) {
            alert("Requests Database Dropped");
        }
    }

}


navMainMenu = function(){
    window.location.href = "/search/menu";
}

navRequestsMenu = function(){
    window.location.href = "/requests";
}