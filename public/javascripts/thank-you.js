onload = function(){
    let timeleft = 10;
    let downloadTimer = setInterval(function(){
        timeleft--;
    
        document.getElementById("countdown").innerHTML = "Returning to the Main Menu in: " + timeleft;
        
        if ( timeleft <= 0 ) {
            clearInterval(downloadTimer);
            window.location.href = "/search/menu";
        }
    },1000);
}