onload = async function(){
    const myIp = await getLocalIP();
    sendPing(myIp);
    
    const pingTime = 30;
    let pingTimeleft = pingTime;
    setInterval(function(){
        pingTimeleft--;
        
        if ( pingTimeleft <= 0 ) {
            console.log("Sending ping to Server")
            sendPing(myIp);
            pingTimeleft = pingTime
        }
    },1000);
}

sendPing = function( myIp ){
    fetch('/admin/ping', {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json; charset=utf-8"
        },
        body: JSON.stringify( {ip: myIp, dateTime: new Date() } )
    })
    .then(res => {
        if ( res.status === 200 ) {
            console.log("Ping successful");
        } else {
            console.log("Ping Failed error code: " + res.status);
        }
    })
    .catch(err => console.log(err));

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