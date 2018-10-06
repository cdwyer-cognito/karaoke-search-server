onload = function(){
    document.getElementById("singer").addEventListener("keydown", function(event){
        if (event.keyCode == 13 || event.which == 13){
            event.preventDefault();
            clickedSubmit();
        }
    });
}

clickedBack = function() {
    window.history.back();
}

clickedSubmit = async function(){

    const singer = document.getElementById("singer").value;

    if (singer.length < 2 ) {
        alert("Please enter Your Name");  

    } else {

        let dataObj = JSON.parse( document.getElementById("jsonObj").value );
        let url = "/requests/new-request"

        dataObj["Singer"] = singer;

        fetch(url, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8"
            },
            body: JSON.stringify(dataObj)
        })
        .then( res => {
            if ( res.status === 201 ) {
                console.log(res);
                res.json()
                .then(response => {
                    window.location.href = "/requests/new-request/thank-you/" + response.Request.GUID;
                })
                .catch(err => {
                    console.log(err);
                    alert("Request Failed, please try again");
                });
            } else {
                alert("Request Failed, please try again");
            }
        })
        .catch(err => console.log(err));
   }
}