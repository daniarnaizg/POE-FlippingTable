date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
$.getJSON('https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/GetCurrencyOverview?league=Delve&date=' + date, function(data) {

	var exPrice = Math.round(data['lines'][3]['chaosEquivalent']);
	var exIcon = data['currencyDetails'][1]['icon'];
	var cIcon = data['currencyDetails'][0]['icon'];

	  document.getElementById('exalted').innerHTML = "<span id='ex-bp'>1 <img src=" + exIcon + " alt='icon'> &#8594 " + exPrice + "<img src=" + cIcon + " alt='icon'></span>";

	  document.getElementById('currency').innerHTML = "<tr id='title'><th id='name'>&nbsp</th><th id='bp'>PRICE</th><th id='ratio'>RATIO</th><th id='profit'>PROFIT/EX</th></tr>"

	  for (var i = 0; i < data['lines'].length; i++) {

	  	try {

	  		var currencyId = data['lines'][i]['pay']['pay_currency_id'] - 1;
	  		var icon_index = data['currencyDetails'][currencyId]['icon'];

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

	  	document.getElementById('currency').innerHTML += "<tr id=" + id + "><th id='name'><img src=" + icon_index + " alt='icon'> " + name + "</th><th id='bp'>" + bp.toFixed(2) + "</th><th id='ratio'>" + ratio.toFixed(2) + "</th><th id='profit'>" + ppex.toFixed(2) + "</th></tr>"
	  }
});
