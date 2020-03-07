/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


PigGame.hideDice()

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (PigGame.isFinish) return  
	// 1. random number
	PigGame.randomDice()

	//2. Display the result
	PigGame.showDice()
	PigGame.setDice('dice-' + PigGame.randomDiceNumber + '.png')

	//3.update the round If the rolled number was Not a 1
	PigGame.updateCurrentScore()
})

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (PigGame.isFinish) return  
	PigGame.holdScore()
})

document.querySelector('.btn-new').addEventListener('click', function() {
	PigGame.newGame()
})