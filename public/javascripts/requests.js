(function(document) {
	'use strict';

	var LightTableFilter = (function(Arr) {

		var _input;

		function _onInputEvent(e) {
			_input = e.target;
			var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
			Arr.forEach.call(tables, function(table) {
				Arr.forEach.call(table.tBodies, function(tbody) {
					Arr.forEach.call(tbody.rows, _filter);
				});
			});
		}

		function _filter(row) {
			var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
			row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
		}

		return {
			init: function() {
				var inputs = document.getElementsByClassName('light-table-filter');
				Arr.forEach.call(inputs, function(input) {
					input.oninput = _onInputEvent;
				});
			}
		};
	})(Array.prototype);

	document.addEventListener('readystatechange', function() {
		if (document.readyState === 'complete') {
			LightTableFilter.init();
		}
	});

})(document);

// select row
let elements= document.getElementsByTagName('td');
for (let i=0; i<elements.length;i++) {
    (elements)[i].addEventListener("click", function(){
        let dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute("id", "dummy_id");
        document.getElementById("dummy_id").value = this.innerHTML;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
           
    });
}

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

onload = function(){
    let timeleft = 60;
    let refreshPage = setInterval(function(){
        document.getElementById("countdown").innerHTML = "Refreshing in: " + (timeleft < 10 ? "0" : "") + timeleft;
        timeleft--;
        if ( timeleft <= 0 ) {
            document.getElementById("countdown").innerHTML = "Refreshing in:now";
            clearInterval(refreshPage);
            location.reload(true);
        }
    },1000);

}

navMainMenu = function(){
    window.location.href = "/search/menu";
}

navAdminMenu = function(){
    window.location.href = "/admin";
}