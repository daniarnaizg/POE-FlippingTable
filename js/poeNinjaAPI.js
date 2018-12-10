// date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
// $.getJSON('https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/GetCurrencyOverview?league=Delve&date=', function(data) {
$.getJSON('https://cors-escape.herokuapp.com/https://poe.ninja/api/data/GetCurrencyOverview?league=Betrayal&date=', function(data) {

	var exPrice = Math.round(data['lines'][4]['chaosEquivalent']);
	var exIcon = data['currencyDetails'][1]['icon'];
	var cIcon = data['currencyDetails'][0]['icon'];

	  // document.getElementById('exalted').innerHTML = "<span id='ex-bp'>1 <img src=" + exIcon + " alt='icon'> &#8594 " + exPrice + "<img src=" + cIcon + " alt='icon'></span>";
	  document.getElementById('exalted').innerHTML = "<tr id='title'><th id='exName'><img src=" + exIcon + " alt='icon'>Exalted Orb - </th><th id='exValue'>" + exPrice + " chaos</th></tr>"


	  document.getElementById('currency').innerHTML = "<tr><td id='ex'>&nbsp</td><td id='bp'>PRICE</td><td id='ratio'>RATIO</td><td id='profit'>PROFIT/EX</td></tr>"

	  for (var i = 0; i < data['lines'].length; i++) {

	  	try {

	  		var currencyId = data['lines'][i]['pay']['pay_currency_id'] - 1;
	  		var icon_index = data['currencyDetails'][currencyId]['icon'];

	  		var name = data['lines'][i]['currencyTypeName'];
		  	var bp = Math.round(data['lines'][i]['pay']['value'] * exPrice);
		  	var ratio = data['lines'][i]['receive']['value'];
		  	var ppex = bp * ratio - exPrice;

	  	} catch(err){
	  		console.log('Error con ' + name + '...');
	  		continue;
	  	}

	  	if ( name == 'Exalted Orb' || bp <= 0 || ppex > exPrice/3) {
	  		continue;
	  	}
	  						
	  	if (ppex > 0){
	  		var id = 'worth-yes';
	  	} else {
	  		var id = 'worth-no';
	  	}

	  	document.getElementById('currency').innerHTML += "<tr id=" + id + "><th id='name'><img src=" + icon_index + " alt='icon'> " + name + "</th><th id='bp'>" + bp + "</th><th id='ratio'>" + ratio.toFixed(2) + "</th><th id='profit'>" + ppex.toFixed(2) + "</th></tr>"
	  }
});
