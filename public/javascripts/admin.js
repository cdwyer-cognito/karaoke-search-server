onload = function(){

    getLocalIP()
    .then( function(ip){
        document.getElementById("ipAddress").value = ip;
    })
    .catch(err => console.log(err));
    getConnectedClients();

    let timeleft = 30;
    setInterval(function(){
        timeleft--;

        if ( timeleft <= 0 ) {
            console.log("Requesting connected clients Status")
            getConnectedClients();
            timeleft = 30
        }
    },1000);


}

getConnectedClients = function(){

    fetch('/admin/clientsState', {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Accept": "application/json; charset=utf-8"
        },
    })
    .then(res => { 
        if ( res.status === 200 ) {
            res.json()
            .then( response => {
                console.log(response);
                let htmlString = '<table class="order-table table"><thead><tr><th>IP Address</th><th>State</th><th>Last Ping</th></tr></thead><tbody>';

                for ( let client of response.clients ){
                    htmlString += '<tr><td>';
                    htmlString += '<input type=\"text\" name=\"' + client[0] + '\" class=\"readOnlyText\" value=\"' + client[0] + '\" readonly >';
                    htmlString += '</td><td>'
                    htmlString += '<img src=\"/images/' + client[1] + '.png\" class=\"centerImg\"';
                    htmlString += '</td><td>';
                    htmlString += '<input type=\"text\" name=\"' + client[2] + '\" class=\"readOnlyText\" value=\"' + client[2] + '\" readonly >'; 
                    htmlString += '</td></tr>';
                }

                htmlString += '</tbody></table>';
                document.getElementById("clients").innerHTML = htmlString;
            })
            .catch(err => console.log(err));

        }



    })
    .catch(res => console.log(err) );


}

postMessage = async function(url){
    let res;
    let ip = document.getElementById("ipAddress").value;
    console.log(ip);
    let bodyObj = { localIp: ip };
    await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(bodyObj)
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
        } else {
            alert("Failed - Unauthorised");
        }
    }

}

getLocalIP = function() {
    return new Promise(function(resolve, reject) {
      // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
      var RTCPeerConnection = /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
  
      if (!RTCPeerConnection) {
        reject('Your browser does not support this API');
      }
      
      var rtc = new RTCPeerConnection({iceServers:[]});
      var addrs = {};
      addrs["0.0.0.0"] = false;
      
      function grepSDP(sdp) {
          var hosts = [];
          var finalIP = '';
          sdp.split('\r\n').forEach(function (line) { // c.f. http://tools.ietf.org/html/rfc4566#page-39
              if (~line.indexOf("a=candidate")) {     // http://tools.ietf.org/html/rfc4566#section-5.13
                  var parts = line.split(' '),        // http://tools.ietf.org/html/rfc5245#section-15.1
                      addr = parts[4],
                      type = parts[7];
                  if (type === 'host') {
                      finalIP = addr;
                  }
              } else if (~line.indexOf("c=")) {       // http://tools.ietf.org/html/rfc4566#section-5.7
                  var parts = line.split(' '),
                      addr = parts[2];
                  finalIP = addr;
              }
          });
          return finalIP;
      }
      
      if (1 || window.mozRTCPeerConnection) {      // FF [and now Chrome!] needs a channel/stream to proceed
          rtc.createDataChannel('', {reliable:false});
      };
      
      rtc.onicecandidate = function (evt) {
          // convert the candidate to SDP so we can run it through our general parser
          // see https://twitter.com/lancestout/status/525796175425720320 for details
          if (evt.candidate) {
            var addr = grepSDP("a="+evt.candidate.candidate);
            resolve(addr);
          }
      };
      rtc.createOffer(function (offerDesc) {
          rtc.setLocalDescription(offerDesc);
      }, function (e) { console.warn("offer failed", e); });
    });
  }

dropRequests = async function(){
    console.log("Drop Requests Db");
    if ( confirm("Are You Sure You Want to drop the Requests Db?") ) {
        let response = await postMessage("/admin/drop-requests");

        if ( response.status === 200 ) {
            alert("Requests Database Dropped");
        } else {
            alert("Failed - Unauthorised");
        }
    }

}


navMainMenu = function(){
    window.location.href = "/search/menu";
}

navRequestsMenu = function(){
    window.location.href = "/requests";
}