clickedCompleted = function(guid){
    console.log(guid);
    const jsonObj = {GUID: guid};

    fetch("/requests/completed", {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json; charset=utf-8"
        },
        body: JSON.stringify(jsonObj)
    })
    .then( (res) => {
        if ( res.status === 200 ) {
            location.reload(true);
        }
    })
    .catch(err => console.log(err));
}