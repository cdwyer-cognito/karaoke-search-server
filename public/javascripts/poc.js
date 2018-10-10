onload = function(){
    let timeleft = 15;
    let downloadTimer = setInterval(function(){
        timeleft--;
        
        if ( timeleft <= 0 ) {
            clearInterval(downloadTimer);
            window.location.href = "/search/menu";
        }
    },990);
}

navMainMenu = function(){
    window.location.href = "/search/menu";
}