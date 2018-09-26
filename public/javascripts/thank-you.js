onload = function(){
    console.log("function called");

    let timeleft = 10;
    let downloadTimer = setInterval(function(){
        timeleft--;
        console.log(timeleft);
        
        document.getElementById("countdown").innerHTML = "Returning to the Main Menu in: " + timeleft;
        
        if ( timeleft <= 0 ) {
            console.log("Timer expired");
            clearInterval(downloadTimer);
            window.location.href = "/search/menu";
        }
    },1000);

}