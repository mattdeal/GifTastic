var defaultTopics = 'Soccer,Running,My Little Pony,Cats,Bacon,Chickens'.split(',');

$(document).ready(function() {
	var buttonList = $('#buttonList');

	for (i in defaultTopics) {
		var button = makeButton(defaultTopics[i]);
		buttonList.append(button);
	}

	// submit button click handler
	$('#submit').on('click', function(event) {
		event.preventDefault();

		var test = $('#newTopic').val().trim();

		if (test !== '') {
			$('#buttonList').append(makeButton(test));
			$('#newTopic').val('');
		}
		
		return false;
	});
});

$(document).on("click",".btn-topic",function() {
	$('.btn-info')
		.removeClass('btn-info')
		.addClass('btn-primary');

	$(this)
		.addClass('btn-info')
		.removeClass('btn-primary');

	var topic = $(this).attr("data-topic");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	    topic + "&api_key=dc6zaTOxFJmzC&limit=10"; 

    $.ajax({
    	url: queryURL,
        method: "GET"
    })
    .done(function(response) {
    	var data = response.data;
    	console.log(data);

    	for (var i = 0; i < data.length; i++) {
    		console.log(data[i]);

    		var imgDiv = $('<div>');
    		var rating = $('<p>Rating: ' + data[i].rating + '</p>');
    		var img = $('<img>')
    			.addClass('img-gif')
    			.attr('src', data[i].images.fixed_height_still.url)
    			.attr('data-state', 'still')
    			.attr('data-still', data[i].images.fixed_height_still.url)
    			.attr('data-animate', data[i].images.fixed_height.url);

    		imgDiv
    			.append(img)
    			.append(rating);

    		$('#imageList').append(imgDiv);
    	}
    })
    .error(function(response) {
    	console.log(response);
    });
});	

$(document).on('click', '.img-gif', function() {
	var img = $(this);

	if (img.attr('data-state') === 'still') {
		img.attr('data-state', 'animate')
			.attr('src', img.attr('data-animate'));
	} else {
		img.attr('data-state', 'still')
			.attr('src', img.attr('data-still'));
	}
});

function makeButton(text) {
	var button = $('<button>')
		.html(text)
		.attr('class', 'btn btn-primary btn-topic')
		.attr('data-topic', text);

	return button;
}