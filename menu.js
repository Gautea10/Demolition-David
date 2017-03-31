var aniFrame;

var menuState = {
	
	create: function() {
		console.log("menu");
		var startButton;
		game.world.setBounds(0, 0, 800, 600);	// Sets size on the startscreen
		
		// EXAMPLE ON MENU BACKGROUND AND A SPRITE AS START BUTTON
		bgMenu = game.add.sprite(400, 300, "menu");
        bgMenu.anchor.set(0.5, 0.5);
        bgMenu.scale.setTo(1, 1.01);
        
		startButton = game.add.sprite(580, 320, "startButton");
        startButton.scale.setTo(0.33,0.33);
        startButton.anchor.set(0.5,0.5);
		startButton.inputEnabled = true;
        
        startButton.animations.add("buttonClick",[0,1,2], 5, true);

		text = game.add.text(250, 16, "", {fill: "#ffffff"});

		startButton.events.onInputDown.add(function () {
            startButton.animations.play("buttonClick"); 
			
            var interval = setInterval(function(){   
                aniFrame = startButton.animations.currentFrame.index;
                console.log(aniFrame);

                if (aniFrame == 2) {
                    game.state.start("play");
                    clearInterval(interval);
                }
                                       
            }, 10);
		});;
	},
};