clickedBack = function() {
    window.history.back();
}

clickedSubmit = async function(){

    const singer = document.getElementById("singer").value;

    if (singer.length < 2 ) {
        alert("Plese enter Your Name");  
    } else {
        let dataObj = JSON.parse( document.getElementById("jsonObj").value );
        let url = "/requests/new-request"

        dataObj["Singer"] = singer;

        await fetch(url, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8"
            },
            body: JSON.stringify(dataObj)
        })
        .then( (res) => {
            if ( res.status === 200 ) {
                console.log(res);
                window.location.href = "/requests/new-request/thank-you";
            }
        })
        .catch(err => console.log(err));

    }

}