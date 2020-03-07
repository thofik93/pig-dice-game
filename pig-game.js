var PigGame = (function() {
	'use strict'

	var fn = {}, _currentScore = 0, _scores = [0, 0], _activePlayer = 0;
	
	fn.randomDiceNumber = 0;
	fn.diceSelector = '.dice'
	fn.currentScoreSelector = '#current-'
	fn.scoreSelector = '#score-'
	fn.playerSelector = '#name-'
	fn.isFinish = false

	function _qs (selector) {
		return document.querySelector(selector);
	}

	function _switchPlayer () {
		var isFirstPlayerActive = _activePlayer === 0;
		_qs(fn.playerSelector + _activePlayer).parentNode.classList.remove('active')
		// change active player
		isFirstPlayerActive ? _activePlayer = 1 : _activePlayer = 0
		_qs(fn.playerSelector + _activePlayer).parentNode.classList.add('active')
	}

	function _resetCurrentScore () {
		_currentScore = 0
		_qs(fn.currentScoreSelector + _activePlayer).textContent = 0
	}

	function _resetScores () {
		_scores = [0, 0]
		_qs(fn.scoreSelector + 0).textContent = 0
		_qs(fn.scoreSelector + 1).textContent = 0	
	}

	function _resetPlayer () {
		_qs(fn.playerSelector + _activePlayer).textContent = 'player ' + (_activePlayer + 1)
		_qs(fn.playerSelector + 0).parentNode.classList.remove('winner')
		_activePlayer = 0
		_qs(fn.playerSelector + 0).parentNode.classList.remove('active')
		_qs(fn.playerSelector + 1).parentNode.classList.remove('active')
		_qs(fn.playerSelector + 0).parentNode.classList.add('active')
	}

	function _theWinner () {
		if (_scores[_activePlayer] >= 100) {
			_qs(fn.playerSelector + _activePlayer).textContent = 'Winner!'
			fn.isFinish = true
			fn.hideDice()
			_qs(fn.playerSelector + _activePlayer).parentNode.classList.add('winner')
			_qs(fn.playerSelector + _activePlayer).parentNode.classList.remove('active')
		}

	}

	fn.config = function (options) {
		fn.diceSelector = options.diceSelector
		fn.currentScoreSelector = options.currentScoreSelector
		fn.playerSelector = options.playerSelector
	}

	fn.newGame = function () {
		_resetScores()
		_resetCurrentScore()
		_resetPlayer()
		fn.isFinish = false	
	}

	fn.hideDice = function () {
		_qs(this.diceSelector).style.display = 'none'	
	}

	fn.showDice = function () {
		_qs(this.diceSelector).style.display = 'block'
	}

	fn.randomDice = function () {
		this.randomDiceNumber = Math.floor(Math.random() * 6) + 1;
		return this.randomDiceNumber
	}

	fn.setDice = function (src) {
		_qs(this.diceSelector).src = src
	}

	fn.updateCurrentScore = function () {
		if (this.randomDiceNumber !== 1) {
			_currentScore += this.randomDiceNumber
			_qs(this.currentScoreSelector + _activePlayer).textContent = _currentScore
		}
		else {
			_resetCurrentScore()
			_switchPlayer()
			this.hideDice()
		}
	}

	fn.holdScore = function () {
		_scores[_activePlayer] += _currentScore
		_qs(this.scoreSelector + _activePlayer).textContent = _scores[_activePlayer]

		_theWinner()

		if (!this.isFinish) {
			_resetCurrentScore()
			_switchPlayer()
			this.hideDice()			
		}

	}

	return fn
})()