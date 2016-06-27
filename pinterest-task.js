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
		console.log(PIN_AUTH);
		PDK.me('boards', { fields: 'boards' }, function(res) {
			console.log(res);
		});
	});
})
