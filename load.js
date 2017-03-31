var loadState = {
	
	preload: function() {
		console.log("load");
		// This just shows that the game is loading
		var loadingLabel = game.add.text(80, 150, 'loading...', {
			font: "30px Courier", fill: "#ffffff"});
		
        game.load.image("menu","Sprites/bgMenu.png");
        game.load.image("ground","Sprites/ground.png");
        game.load.image("houseBg","Sprites/houseBg.png");
		game.load.image("cloud1","Sprites/cloud1.png");
		game.load.image("cloud2","Sprites/cloud2.png");
		game.load.image("cloud3","Sprites/cloud3.png");
        game.load.image("groundSand","Sprites/groundSand.png");
        game.load.image("bg1","Sprites/BakgrunnDD.png");
        game.load.image("bg2","Sprites/BakgrunnDD2.png");
        game.load.image("portal","Sprites/Portal.png");
        game.load.image("targetBuilding","Sprites/targetBuilding.png");
		game.load.image("penger","Sprites/Penger.png");
        
		game.load.spritesheet("ledge","Sprites/ledge.png",149, 70);
        game.load.spritesheet("startButton","Sprites/start.png",770,659);
        game.load.spritesheet("targetBuildingAni","Sprites/targetBuilding_sprite.png",636,677);
        game.load.spritesheet("umbrellaGirl","Sprites/umbrellaGirl.png",71,60);
        game.load.spritesheet("spartan","Sprites/Spartan.png",88,70);
        game.load.spritesheet("character","Sprites/david.png",64,70);
	},
	
	create: function() {
		game.state.start("menu");
	}
};