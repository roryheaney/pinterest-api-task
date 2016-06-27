var PIN_ID = "4842372640771424402";
var PIN_AUTH = "";

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

$('#pinterest-auth').on('click', function() {
	PDK.login({ scope : 'read_public, write_public' }, function(res) {
		PIN_AUTH = res.session.accessToken;
		$.getJSON( "https://api.pinterest.com/v1/me/boards/?access_token=" + PIN_AUTH +"&fields=id%2Cname%2Curl%2Cimage", function( res ) {
			var data = res.data[0];
			$('#user-name').val("Something");
			$('#user-contant').append('<h3>' + data.name + '</h3>');
			$('#user-contant').append('<img alt="board image" src="' + data.image['60x60'].url + '"></img>');
			$('#user-contant').append('<div>' + data.url + '</div>');
		});
	});
})
