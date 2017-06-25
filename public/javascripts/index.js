$(document).ready(function() {
  // alert("Document is ready - 0");
  var tile1 = $('#tile1');
  var tile2 = $('#tile2');
  var tile3 = $('#tile3');
  var tile4 = $('#tile4');
  var tile5 = $('#tile5');
  var tile6 = $('#tile6');
  var tile7 = $('#tile7');
  var tile8 = $('#tile8');
  var tile9 = $('#tile9');

  var player1 = $('#player1');
  var player2 = $('#player2');
  var currentPlayer = $('#player');
	var replayButton = $('#replay-button');
  var tictactoePlayDiv = $('#div-tictactoe-play')

	var inputPlayer1 = $('#input-player1');
	var inputPlayer2 = $('#input-player2');
	var playersInputDiv = $('#div-players-input')


  function validatePlay(squareplayed) {
    if ($(squareplayed).hasClass('free')) {
	     return true;
    } else {
      return false;
    }
  }

  function initGame() {
    $('.tile').removeClass('played');
    $('.tile').removeClass('O-play');
    $('.tile').removeClass('X-play');
    $('.tile').html('');
    $('.tile').addClass('free');
  }

  function winAlert() {
		alert("Congratulations " + currentPlayer.text() + " you win !!! " )
		replayButton.show();
  }

	function drawAlert() {
		alert("Draw! Try playing again!" )
		replayButton.show();
  }

	function checkIfPlayerWins(playerClass) {
		// 3 * 3 Game Flow
		//   1		2		3
		//   4		5		6
		//   7		8		9
		// Player wins if any one of the below sequence clicked by a player
		// 123 or 456 or 789
		// 147 or 258 or 369
		// 159 or 357

		var playerWins = false

		if (tile1.hasClass(playerClass) && tile2.hasClass(playerClass) && tile3.hasClass(playerClass)) {
			playerWins = true;
		} else if (tile4.hasClass(playerClass) && tile5.hasClass(playerClass) && tile6.hasClass(playerClass)) {
			playerWins = true;
		} else if (tile7.hasClass(playerClass) && tile8.hasClass(playerClass) && tile9.hasClass(playerClass)) {
			playerWins = true;
		} else if (tile1.hasClass(playerClass) && tile4.hasClass(playerClass) && tile7.hasClass(playerClass)) {
			playerWins = true;
		} else if (tile2.hasClass(playerClass) && tile5.hasClass(playerClass) && tile8.hasClass(playerClass)) {
			playerWins = true;
		} else if (tile3.hasClass(playerClass) && tile6.hasClass(playerClass) && tile9.hasClass(playerClass)) {
			playerWins = true;
		} else if (tile1.hasClass(playerClass) && tile5.hasClass(playerClass) && tile9.hasClass(playerClass)) {
			playerWins = true;
		} else if (tile3.hasClass(playerClass) && tile5.hasClass(playerClass) && tile7.hasClass(playerClass)) {
			playerWins = true;
		}

		if(playerWins) {
			winAlert()
		}

		return playerWins;
	}

  function checkIfGameDraw() {
		//Check if any tiles free or no more tiles for the play
    if (!($('.tile').hasClass('free'))) {
      drawAlert();
			return true
    }
		return false
  }


  $('.tile').on('click', function PlayTicTacToe() {
    // alert("Player Name : " + $('#player').text() + " "+ $('#player').attr('class'))

		// Check if the tile is free for play
    if (validatePlay(this)) {

      $(this).removeClass('free');
      $(this).addClass('played');
			// Based on the current player assign tile X or O
      if (currentPlayer.text() == player1.text()) {
				// current player is X
        $(this).addClass('X-play');
        $(this).html("X");
				// Check after the move if Player 1 wins
        if(checkIfGameDraw() || checkIfPlayerWins('X-play')){
					return
				}
				// Now switch the current player to player 2
        currentPlayer.text(player2.text())
        currentPlayer.removeClass(player1.attr('class'))
        currentPlayer.addClass(player2.attr('class'))
      } else {
				// current player is O
        $(this).addClass('O-play');
        $(this).html("O");

				// Check after the move if Player 2 wins
				if(checkIfGameDraw() || checkIfPlayerWins('O-play')){
					return
				}
				// Now switch the current player to player 1
        currentPlayer.text(player1.text())
        currentPlayer.removeClass(player2.attr('class'))
        currentPlayer.addClass(player1.attr('class'))
      }
    } else {
      alert("That tile has already been played. Please choose another tile");
    }

  });

	$('#replay-button').on('click', function() {
		// ON click replay button. Reset board for the next play
	  initGame();
	  $('#replay-button').hide();
	});

	$('#play-button').on('click', function() {
		// ON click lets play button
	  // alert("First name: " + $('#input-player1').val() + " Second Name" + $('#input-player2').val())
	  var p1Name = $('#input-player1').val();
	  if (!validateUserName(p1Name)) {
	    alert("First Player Name is not valid. Only characters A-Z, a-z and '-' are  acceptable.");
	    inputPlayer1.focus();
	    return
	  }

	  var p2Name = $('#input-player2').val();
	  if (!validateUserName(p2Name)) {
	    alert("Second Player Name is not valid. Only characters A-Z, a-z and '-' are  acceptable.");
	    inputPlayer2.focus();
	    return
	  }

	  playersInputDiv.hide();
	  player1.text(p1Name)
	  player2.text(p2Name)
	  currentPlayer.text(p1Name)
	  currentPlayer.removeClass(player2.attr('class'))
	  currentPlayer.addClass(player1.attr('class'))
	  tictactoePlayDiv.show();

	});

  function validateUserName(playerName) {
    var nameRegex = /^[a-zA-Z0-9\-]+$/;
    if (playerName == '' || playerName.match(nameRegex) == null) {
      return false;
    }
    return true;
  }

  // alert("Document is ready")

}); // end document ready
