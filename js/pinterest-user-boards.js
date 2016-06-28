/**
 * Returns an array of user's boards, each item in the array is an Object with the following fields: title, href and imageUrl.
 * @param {String} userName
 * @param {Function} callback
 * @return {Array} userBoards
 */

function getUserBoards(userName, callback) {
	$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22https%3A%2F%2Fwww.pinterest.com%2F" + userName + "%2F%22%20and%20xpath%3D'%2F%2Fdiv%2Fdiv%2Fdiv%2Fdiv%2Fdiv%2Fdiv%2Fdiv%2Fdiv%2Fdiv'&format=json&diagnostics=true&callback=", function(res) {
		var boardsList = res.query.results.div;
		var userBoards = [];
		for (var i=0, numBoards = boardsList.length; i<numBoards; i++) {
			if (boardsList[i].class === 'Board Module boardCoverImage') {
				var board = {
					title: boardsList[i].div[0].div[1].h2.content,
					href: boardsList[i].a.href,
					imageUrl: boardsList[i].div[1].div.img.src
				}
				userBoards.push(board);
			}

			if (i === numBoards - 1) {
				callback(userBoards);
			}
		}
	});
};

/**
* Usage example of getUserBoards function.
*/
getUserBoards('sharp', function(userData) {
	userData.forEach(function(userBoard) {
		/* Here you have access to each board Object.
		 * You can use this data as you please accessing userBoard.title, userBoard.href and userBoard.imageUrl
		 */
		if (userBoard.imageUrl) {
			$('.user-content').append('<div class="user-board"><h3>' + userBoard.title + '</h3><img alt="board image" src="' + userBoard.imageUrl + '"></img><a href="' + userBoard.href + '" target="_blank"><button class="btn">Link</button></div>');
		} else {
			$('.user-content').append('<div class="user-board"><h3>' + userBoard.title + '</h3><div class="board-no-img-m">No Image</div><a href="' + userBoard.href + '" target="_blank"><button class="btn">Link</button></div>');
		}

	});
});
