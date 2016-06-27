var PIN_ID = "4842372640771424402"; // Here goes your App ID
var AUTH = true;

/*
	This portion of code allows for easier API request and needs to be included
	on the website.
*/
window.pAsyncInit = function() {
	PDK.init({
		appId: PIN_ID,
		cookie: true
	});
};

(function(d, s, id){
	var js, pjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//assets.pinterest.com/sdk/sdk.js";
	pjs.parentNode.insertBefore(js, pjs);
}(document, 'script', 'pinterest-jssdk'));
/* End of Pinteres SDK */


$('#pinterest-auth').on('click', function() {
	/*
		Here we require the user to gran the App access to his/her data, it is important
		to specify in the scope what kind of authorization is needed, in our case we are
		only reading public data from the user so 'read_public' is enough.
	*/
	if (AUTH) {
		PDK.login({ scope : 'read_public' }, function(res) {
			/*
				We are able to access the token through res.session.accessToken,
				this will allow us to generate a proper GET request. We complete
				the API endpoint adding the token. This url is already set up to
				retrieve a user board name, url, image and id.
			*/
			$.getJSON( "https://api.pinterest.com/v1/me/boards/?access_token=" + res.session.accessToken +"&fields=id%2Cname%2Curl%2Cimage", function( res ) {
				/*
					Once the request goes through we are able to display the user data.
					The API returns an array of Objecs, each object represents a user board.
					In this case we loop through each board of the user and display the data
					we need.
				*/
				res.data.forEach( function (board) {
					$('.user-content').append('<div class="user-board"><h3>' + board.name + '</h3><img alt="board image" src="' + board.image['60x60'].url + '"></img><a href="' + board.url + '" target="_blank"><button class="btn">Link</button></div>');
				})
			});
		});
		// We block multiple authorization requests
		AUTH = false;
	}
})
