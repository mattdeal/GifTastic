var queryURL = 'http://api.giphy.com/v1/gifs/random'; //?api_key=dc6zaTOxFJmzC";
var defaultTopics = 'Soccer,Running,My Little Pony,Cats,Bacon'.split(',');

$(document).ready(function() {
	var buttonList = $('#buttonList');

	for (i in defaultTopics) {
		var button = makeButton(defaultTopics[i]);
		buttonList.append(button);
	}
});