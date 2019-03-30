// date = new Date().toJSON().slice(0,10).replace(/-/g,'-');

function Comparator(a, b) {
	if (a[4] < b[4]) return 1;
	if (a[4] > b[4]) return -1;
	return 0;
}

$.getJSON('https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/GetCurrencyOverview?league=Synthesis', function (data) {
	// $.getJSON('https://cors-escape.herokuapp.com/https://poe.ninja/api/data/GetCurrencyOverview?league=Synthesis', function(data) {

	var exPrice = Math.round(data['lines'][3]['chaosEquivalent']);
	var exIcon = data['currencyDetails'][1]['icon'];
	var cIcon = data['currencyDetails'][0]['icon'];

	// document.getElementById('exalted').innerHTML = "<span id='ex-bp'>1 <img src=" + exIcon + " alt='icon'> &#8594 " + exPrice + "<img src=" + cIcon + " alt='icon'></span>";
	document.getElementById('exalted').innerHTML = "<tr id='title'><th id='exName'><img src=" + exIcon + " alt='icon'>Exalted Orb - </th><th id='exValue'>" + exPrice + " chaos</th></tr>"


	document.getElementById('currency').innerHTML = "<tr><td id='ex'>&nbsp</td><td id='bp'>PRICE</td><td id='ratio'>RATIO</td><td id='profit'>PROFIT/EX</td></tr>"

	var currList = [];
	for (var i = 0; i < data['lines'].length; i++) {

		try {
			var tempArray = [];
			var currencyId = data['lines'][i]['pay']['pay_currency_id'] - 1;
			var icon_index = data['currencyDetails'][currencyId]['icon'];
			tempArray.push(icon_index);

			var name = data['lines'][i]['currencyTypeName'];
			tempArray.push(name);
			var bp = Math.round(data['lines'][i]['pay']['value'] * exPrice);	// BUYING PRICE
			tempArray.push(bp);
			var ratio = data['lines'][i]['receive']['value']; 					// RATIO
			tempArray.push(ratio);
			var ppex = bp * ratio - exPrice; 									// PROFIT PER EXALT
			tempArray.push(ppex);

		} catch (err) {
			console.log('Error con ' + name + '...');
			continue;
		}

		if (name == 'Exalted Orb' || bp <= 0 || ppex > exPrice / 3) {
			continue;
		}

		if (ppex > 0) {
			var id = 'worth-yes';
			tempArray.push(id);
		} else {
			var id = 'worth-no';
			tempArray.push(id);
		}

		currList.push(tempArray)
		// document.getElementById('currency').innerHTML += "<tr id=" + id + "><th id='name'><img src=" + icon_index + " alt='icon'> " + name + "</th><th id='bp'>" + bp + "</th><th id='ratio'>" + ratio.toFixed(2) + "</th><th id='profit'>" + ppex.toFixed(2) + "</th></tr>"
	}


	currList = currList.sort(Comparator);

	for (var i = 0; i < currList.length; i++) {
		document.getElementById('currency').innerHTML += "<tr id=" + currList[i][5] + "><th id='name'><img src=" + currList[i][0] + " alt='icon'> " + currList[i][1] + "</th><th id='bp'>" + currList[i][2] + "</th><th id='ratio'>" + currList[i][3].toFixed(2) + "</th><th id='profit'>" + currList[i][4].toFixed(2) + "</th></tr>"
	}

});
