var winState = {
	
	create: function() {
		
		// End screen
		var winLabel = game.add.text(80, 80, 'You Won!',{
			font: "50px Arial", fill: "#FFFFFF"
		});
		var pay = game.add.text(80, 130, 'Paycheck: ' 
									 + score + "$",{
			font: "50px Arial", fill: "#FFFFFF"
		});
		
		var startLabel = game.add.text(80, game.world.height-80, 
									   'press "W" to restart',{
										font: "40px Arial", fill: "#FFFFFF"
		});
		
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		wkey.onDown.addOnce(this.restart,this);
	},
	
	restart: function() {
		game.state.start("menu");
	},
}