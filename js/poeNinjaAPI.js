
let leagueName;
$.getJSON("https://cors-anywhere.herokuapp.com/https://api.poe.watch/leagues", function (data) {
	leagueName = data[3]['name'];
	console.log(leagueName)
});

var currDict = {};
currDict["Orb of Alteration"] = 1;
currDict["Orb of Fusing"] = 2;
currDict["Orb of Alchemy"] = 3;
currDict["Chaos Orb"] = 4;
currDict["Gemcutter's Prism"] = 5;
currDict["Exalted Orb"] = 6;
currDict["Chromatic Orb"] = 7;
currDict["Jeweller's Orb"] = 8;
currDict["Orb of Chance"] = 9;
currDict["Cartographer's Chisel"] = 10;
currDict["Orb of Scouring"] = 11;
currDict["Blessed Orb"] = 12;
currDict["Orb of Regret"] = 13;
currDict["Regal Orb"] = 14;
currDict["Divine Orb"] = 15;
currDict["Vaal Orb"] = 16;
currDict["Glassblower's Bauble"] = 21;
currDict["Orb of Transmutation"] = 22;
currDict["Orb of Augmentation"] = 23;
currDict["Mirror of Kalandra"] = 24;
currDict["Eternal Orb"] = 25;
currDict["Perandus Coin"] = 26;
currDict["Silver Coin"] = 35;
currDict["Apprentice Cartographer's Sextant"] = 45;
currDict["Journeyman Cartographer's Sextant"] = 46;
currDict["Master Cartographer's Sextant"] = 47;
currDict["Splinter of Xoph"] = 52;
currDict["Splinter of Tul"] = 53;
currDict["Splinter of Esh"] = 54;
currDict["Splinter of Uul-Netol"] = 55;
currDict["Splinter of Chayula"] = 56;
currDict["Blessing of Xoph"] = 57;
currDict["Blessing of Tul"] = 58;
currDict["Blessing of Esh"] = 59;
currDict["Blessing of Uul-Netol"] = 60;
currDict["Blessing of Chayula"] = 61;
currDict["Orb of Annulment"] = 513;
currDict["Orb of Binding"] = 514;
currDict["Orb of Horizons"] = 515;
currDict["Harbinger's Orb"] = 516;
currDict["Engineer's Orb"] = 517;
currDict["Ancient Orb"] = 518;
currDict["Annulment Shard"] = 519;
currDict["Mirror Shard"] = 520;
currDict["Exalted Shard"] = 521;
currDict["Bestiary Orb"] = 630;
currDict["Harbinger's Shard"] = 643;

function Comparator(a, b) {
	if (a[4] < b[4]) return 1;
	if (a[4] > b[4]) return -1;
	return 0;
}

$.getJSON('https://cors-anywhere.herokuapp.com/https://poe.ninja/api/data/GetCurrencyOverview?league=Synthesis', function (data) {

	var exPrice = Math.round(data['lines'][3]['chaosEquivalent']);
	var exIcon = data['currencyDetails'][1]['icon'];
	var cIcon = data['currencyDetails'][0]['icon'];

	document.getElementById('exalted').innerHTML = "<tr id='title'><th id='exName'><img src=" + exIcon + " alt='icon'>Exalted Orb - </th><th id='exValue'>" + exPrice + " chaos</th></tr>"

	document.getElementById('currency').innerHTML = "<tr><td id='ex'>&nbsp</td><td id='buysell'>&nbsp</td><td id='bp'>PRICE</td><td id='ratio'>RATIO</td><td id='profit'>PROFIT/EX</td></tr>"

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
	}


	currList = currList.sort(Comparator);

	for (var i = 0; i < currList.length; i++) {
		document.getElementById('currency').innerHTML += "<tr id=" + currList[i][5] + "><th id='name'><img src=" + currList[i][0] + " alt='icon'> " + currList[i][1] + "<th id='buysell'><a id='buy-button' href='http://currency.poe.trade/search?league=" + leagueName + "&online=x&want=" + 6 + "&have=" + currDict[currList[i][1]] + "'target='_blank'>BUY</a><a id='sell-button' href='http://currency.poe.trade/search?league=" + leagueName + "&online=x&want=" + currDict[currList[i][1]] + "&have=" + 4 + "'target='_blank'>SELL</a></th></th><th id='bp'>" + currList[i][2] + "</th><th id='ratio'>" + currList[i][3].toFixed(2) + "</th><th id='profit'>" + currList[i][4].toFixed(2) + "</th></tr>"
	}

});
