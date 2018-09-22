date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
$.getJSON('https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/GetCurrencyOverview?league=Delve&date=' + date, function(data) {

	var exPrice = data['lines'][3]['chaosEquivalent'];

	  document.getElementById('exalted').innerHTML = "<span id='ex-bp'>1 Ex = " + exPrice + "</span> Chaos";

	  document.getElementById('currency').innerHTML = "<tr id='title'><th id='name'>&nbsp</th><th id='bp'>BUYING PRICE</th><th id='ratio'>RATIO</th><th id='profit'>PROFIT/EX</th></tr>"

	  for (var i = 0; i < data['lines'].length; i++) {

	  	try {

	  		var name = data['lines'][i]['currencyTypeName'];
		  	var bp = data['lines'][i]['pay']['value'] * exPrice;
		  	var ratio = data['lines'][i]['receive']['value'];
		  	var ppex = bp * ratio - exPrice;

	  	} catch(err){
	  		console.log('Error con ' + name + '...');
	  		continue;
	  	}
	  						
	  	if (ppex > 0){
	  		var id = 'worth-yes';
	  	} else {
	  		var id = 'worth-no';
	  	}

	  	document.getElementById('currency').innerHTML += "<tr id=" + id + "><th id='name'>" + name + "</th><th id='bp'>" + bp.toFixed(2) + "</th><th id='ratio'>" + ratio.toFixed(2) + "</th><th id='profit'>" + ppex.toFixed(2) + "</th></tr>"
	  }
});