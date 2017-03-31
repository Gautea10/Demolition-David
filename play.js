var cursors;
var enemyPos;
var ground;
var posX = 0;
var mapLen = 24000; 
var playerPos = 100;
var randomNum;

var playState = {
	
	create: function() {
        console.log("Play kjørte");
        
        var testTall = Math.floor(Math.random() * ((10-5)+1) + 5);
        var testTall2 = this.randomIntFromInterval(9000, 15000);
        console.log("testTall1: " + testTall);
        console.log("testTall2: " + testTall2);
		
        // Make game here
        game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.setBounds(0, 0, mapLen, 600);
		
        bg = game.add.sprite(0, 295, "bg1");
		bg.scale.setTo(1,1);
		bg.anchor.setTo(0,0.5);
        
        bg2 = game.add.sprite(8000, 295, "bg2");
		bg2.scale.setTo(1,1);
		bg2.anchor.setTo(1,0.5);
        bg2.scale.x *= -1;
        
        bg3 = game.add.sprite(16000, 295, "bg1");
		bg3.scale.setTo(1,1);
		bg3.anchor.setTo(1,0.5);
        bg3.scale.x *= -1;
        
        for (var i = 0; i < 20; i++) {
            var randX = Math.floor(Math.random() * 23500) + 100;
            var randY = Math.floor(Math.random() * 220) + 100;
            var ranSize = Math.floor(Math.random() * 0.8) + 0.5;
            
            cloud1 = game.add.sprite(randX, randY, "cloud1");
            cloud1.scale.setTo(ranSize,ranSize);
            cloud1.anchor.setTo(0.5,0.5);
            
            randX = Math.floor(Math.random() * 23500) + 100;
            cloudY = Math.floor(Math.random() * 220) + 50;
            
            cloud2 = game.add.sprite(randX, randY, "cloud2");
            cloud2.scale.setTo(ranSize,ranSize);
            cloud2.anchor.setTo(0.5,0.5);

            randX = Math.floor(Math.random() * 23500) + 100;
            cloudY = Math.floor(Math.random() * 220) + 50;
            
            cloud3 = game.add.sprite(randX, randY, "cloud3");
            cloud3.scale.setTo(ranSize,ranSize);
            cloud3.anchor.setTo(0.5,0.5);
        }
        
        player = game.add.sprite(100, 500, "character");
		player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(1,1);
		game.camera.follow(player);
		game.physics.arcade.enable(player);
		player.body.gravity.y = 800;
		player.body.collideWorldBounds = true;
        
        player.animations.add("right",[0,1,2,3,4,5], 16, true);
        player.animations.add("explode",[6,7], 10, true);
		player.animations.add("jumpRight",[2], 1, true);
		player.animations.add("jumpLeft",[0], 1, true);
		player.animations.add("left",[0], 20, true);
		
		player.body.setSize(30, 70);
    
        portal = game.add.sprite(8000, 490, "portal");
		portal.anchor.setTo(0.5,0.5);
        portal.scale.setTo(1,1);
        game.physics.arcade.enable(portal);
        
        portal2 = game.add.sprite(16000, 490, "portal");
		portal2.anchor.setTo(0.5,0.5);
        portal2.scale.setTo(1,1);
        game.physics.arcade.enable(portal2);
        
        var tBuildingX = 23000;
        
        tBuildingHitbox = game.add.sprite(tBuildingX, 535, "targetBuilding");
		tBuildingHitbox.anchor.setTo(1, 1);
        tBuildingHitbox.scale.setTo(0.8,0.8);
        tBuildingHitbox.alpha = 0;
        game.physics.arcade.enable(tBuildingHitbox);
        tBuildingHitbox.body.immovable = true;
        
        tBuilding = game.add.sprite(tBuildingX, 535, "targetBuildingAni"); 
        tBuilding.anchor.setTo(1, 1);
        tBuilding.scale.setTo(0.8,0.8);
        tBuilding.animations.add("buildingAni",[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], 10, true);
		
		this.spawnLedges();
        this.createUmbrellaGirl1();
		this.createUmbrellaGirl2();
        this.createSpartan();
        this.changeToModern();
        cursors = game.input.keyboard.createCursorKeys();
	},
    
	//Function to make camera follow character
	lockonFollow: function() {
		game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
    	style = 'STYLE_LOCKON';
	},
    
    randomIntFromInterval: function(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    },
	
    changeToModern: function() {
        posX = 0;
        console.log("lager gress");
        
		platforms.enableBody = true;
        
		while (true) {
            randomNum = this.randomIntFromInterval(0, 10);
            
			ground = platforms.create(posX, 535,"ground");
            ground.scale.setTo(1,1);
            ground.anchor.setTo(0,0)
            ground.body.immovable = true;

            //console.log(groundHoles);
            posX += 150;
            
			//Ground
            if (posX > 1500 && posX < 7000 && randomNum < 1 || 
                posX > 16800 && posX < 22000 && randomNum < 1){
                
                posX += 200;
            } else {
                posX += 0;
            }
			
            if (posX > mapLen) {
                console.log("posX mer enn mapLen, avbryt laging av bane");
				break;
			} 
		}
    },
	
	
	spawnLedges: function() {
		console.log("Spawnledges kjørte");
		platforms = game.add.group();
		var spawnLedge = 0;
        
        while (true) {
            spawnLedge += 400
            var pixlePos = 4000;
            //var ledge;
            
            if (spawnLedge > pixlePos) {
            //for (i = 0; i < 1; i++) {

                // Bestemmer posisjon y innenfor en viss grense slik at player rekker opp til de
                var randomYPos = this.randomIntFromInterval(300,500);
                spawnLedge += this.randomIntFromInterval(0,100);
                console.log(spawnLedge);
                 
                // gjør størrelse y random innen en viss grense        

                if (spawnLedge <= pixlePos + 520) {
                    ledge = platforms.create(spawnLedge, 450, "ledge");               
                    ledge.anchor.setTo(1,0);
                    game.physics.enable(ledge);
					ledge.body.immovable = true;
                    ledge.body.setSize(158,10);
					ledge.animations.add("ledgeAni",[0,1,2,3], 20, true);
   
                }
                else if(spawnLedge <= pixlePos + 1020) {
                    console.log("mellonledge lagde");
                    ledge2 = platforms.create(spawnLedge, 375, "ledge");                    
                    ledge2.anchor.setTo(1,0);
                    game.physics.enable(ledge2);
					ledge2.body.immovable = true;
                    ledge2.body.setSize(158,10);
					ledge2.animations.add("ledgeAni",[0,1,2,3], 20, true);
                }
                else if(spawnLedge > pixlePos + 1020) {
                    ledge3 = platforms.create(spawnLedge + 20, randomYPos, "ledge");                   
                    ledge3.anchor.setTo(1,0);
                    game.physics.enable(ledge3);
					ledge3.body.immovable = true;
                    ledge3.body.setSize(158,10);
					ledge3.animations.add("ledgeAni",[0,1,2,3], 20, true);
                }

                // Vis ledges starter å bli laget utenfor lengden på banen, stopp å lag dem
                if (spawnLedge > 5000) {
                    break;
               }
				
				ledge.animations.add("ledgeAni",[0,1,2,3], 20, true);
				
				var interval = setInterval(function(){   
                    ledge.animations.play("ledgeAni");
					ledge2.animations.play("ledgeAni");
					ledge3.animations.play("ledgeAni");		
            	}, 10);
				
            }
        }
		
		//spawnLedge = 19150
		
		while (true) {
			spawnLedge += 400
			var pixlePos2 = 19500;
			
			if (spawnLedge > pixlePos2) {
            //for (i = 0; i < 1; i++) {

                // Bestemmer posisjon y innenfor en viss grense slik at player rekker opp til de
                var randomYPos = this.randomIntFromInterval(300,500);
                spawnLedge += this.randomIntFromInterval(0,100);
                console.log(spawnLedge);
                 
                // gjør størrelse y random innen en viss grense        

                if (spawnLedge <= pixlePos2 + 520) {
                    ledge4 = platforms.create(spawnLedge, 450, "ledge");               
                    ledge4.anchor.setTo(1,0);
                    game.physics.enable(ledge4);
					ledge4.body.immovable = true;
                    ledge4.body.setSize(158,10);
					ledge4.animations.add("ledgeAni",[0,1,2,3], 20, true);
   
                }
                else if(spawnLedge <= pixlePos2 + 1020) {
                    console.log("mellonledge lagde");
                    ledge5 = platforms.create(spawnLedge, 375, "ledge");                    
                    ledge5.anchor.setTo(1,0);
                    game.physics.enable(ledge5);
					ledge5.body.immovable = true;
                    ledge5.body.setSize(158,10);
					ledge5.animations.add("ledgeAni",[0,1,2,3], 20, true);
                }
                else if(spawnLedge > pixlePos2 + 1020) {
                    ledge6 = platforms.create(spawnLedge + 20, randomYPos, "ledge");                   
                    ledge6.anchor.setTo(1,0);
                    game.physics.enable(ledge6);
					ledge6.body.immovable = true;
                    ledge6.body.setSize(158,10);
					ledge6.animations.add("ledgeAni",[0,1,2,3], 20, true);
                }

                // Vis ledges starter å bli laget utenfor lengden på banen, stopp å lag dem
                if (spawnLedge > 20500) {
                    break;
                }
				
				ledge.animations.add("ledgeAni",[0,1,2,3], 20, true);
				
				var interval2 = setInterval(function(){ 
					//ledge4 not defined error <---------------------------------------------------
                    ledge4.animations.play("ledgeAni");
					ledge5.animations.play("ledgeAni");
					ledge6.animations.play("ledgeAni");		
            	}, 10);	
            }
		}
	},
	
	changeToGreece: function() {
		posX = 0;
        platforms.removeAll(true);
		console.log("lager sand");
        
		while (true) {
			ground.loadTexture("groundSand", 0);
			ground = platforms.create(posX, 535,"ground");
            ground.scale.setTo(1,1);
            ground.anchor.setTo(0,0)
            ground.body.immovable = true;

            var randomNum = Math.floor(Math.random() * 10) + 0;
            //console.log(groundHoles);
            
            posX += 150;
            
			//Ground
            if (posX > 9000 && posX < 15000 && randomNum < 1){
                posX += 200;
            } else {
                posX += 0;
            }
			
            if (posX > mapLen - 7500) {
                console.log("posX mer enn mapLen, avbryt laging av bane");
				break;
			}
		}
	},
    
    createUmbrellaGirl1: function() {
		console.log("createUmbrellaGirl1 kjørte");
		enemyPos =  this.randomIntFromInterval(2000, 6000);
        console.log("enemy1: " + enemyPos);
        
        
        enemy = game.add.sprite(enemyPos, 300, "umbrellaGirl");	
        enemy.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(enemy);
        //enemy.body.immovable = true;
        enemy.animations.add("enemyAni",[0,1,2,3], 6, true);
        enemy.body.gravity.y = 800;
		enemy.body.collideWorldBounds = true;
        enemy.body.setSize(40, 60);     
	},
    
	createUmbrellaGirl2: function() {
		console.log("createUmbrellaGirl2 kjørte")
		enemyPos2 =  this.randomIntFromInterval(18000, 22000);
		console.log("enemy2: " + enemyPos2);
		
		enemy2 = game.add.sprite(enemyPos2, 300, "umbrellaGirl");	
        enemy2.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(enemy2);
        //enemy2.body.immovable = true;
        enemy2.animations.add("enemyAni2",[0,1,2,3], 6, true);
        enemy2.body.gravity.y = 800;
		enemy2.body.collideWorldBounds = true;
        enemy2.body.setSize(30, 60);
	},
	
     createSpartan: function() {
		 //console.log("createSpartan kjørte");
         enemyPos3 = this.randomIntFromInterval(10000, 14000);
         console.log("enemy3: " + enemyPos3);
         
         enemy3 = game.add.sprite(enemyPos3, 400, "spartan");
         enemy3.anchor.setTo(0.5, 1);
         game.physics.arcade.enable(enemy3);
         //enemy3.body.immovable = true;
         enemy3.animations.add("enemyAni3",[0,1,2,3], 6, true);
         enemy3.body.gravity.y = 800;
		 enemy3.body.collideWorldBounds = true;
         enemy3.body.setSize(30, 60);
	},
     
	update: function() {
        game.physics.arcade.collide(player,platforms);
        game.physics.arcade.collide(enemy,platforms);
        game.physics.arcade.collide(enemy2,platforms);
        game.physics.arcade.collide(enemy3,platforms);
        game.physics.arcade.collide(tBuildingHitbox, platforms);
        
        player.body.velocity.x = 520;
        //console.log(frameExplode);
        
        enemy.animations.play("enemyAni");
        enemy2.animations.play("enemyAni2");
        enemy3.animations.play("enemyAni3");
        
        if (game.physics.arcade.collide(enemy, player)) {
            player.kill();
            game.state.start("lose");
        } 
        else if (game.physics.arcade.collide(enemy2, player)) {
            player.kill();
            game.state.start("lose");
        }
        else if (game.physics.arcade.collide(enemy3, player)) {
            player.kill();
            game.state.start("lose");
        }
        
        if (game.physics.arcade.collide(portal, player)) {
			portal.kill();
			this.changeToGreece();
        }
        
        if (game.physics.arcade.collide(portal2, player)) {
			portal2.kill();
            platforms.removeAll(true);
			this.changeToModern();
        }
        
        if (game.physics.arcade.collide(tBuildingHitbox, player)) {
            player.kill();
            console.log("player building crash");
            tBuilding.animations.play("buildingAni");
        }
        
        var frame = tBuilding.animations.currentFrame.index;
        //console.log(frame);
        
        if (frame == 14) {
            this.win();
        }
        
        if (player.body.touching.down){
            player.animations.play("right");
        }
          
        // Fall into holes
        if (player.body.position.y >= 525) {
            player.animations.play("explode");
			
            var frameExplode = player.animations.currentFrame.index;
        
            if (frameExplode == 6) {
                player.kill();
                game.state.start("lose");
            }
        }
         
        if (enemy.body.position.y >= 525) {
			enemy.kill();
        }
        if (enemy2.body.position.y >= 525) {
			console.log("enemy2 died");
			enemy2.kill();
        }
        if (enemy3.body.position.y >= 525) {
			enemy3.kill();
        }

		// Jump
		if (cursors.up.isDown && player.body.touching.down) {
			player.body.velocity.y = -400;
			player.animations.play("jumpRight");
		}
	},
    
	win: function() { 
        console.log("win kjørte");
        game.state.start("win"); 
	},
}