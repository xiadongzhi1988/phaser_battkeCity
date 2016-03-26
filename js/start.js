GameState.start = function() {};
GameState.start.prototype = {
  create: function() {
    this.worldWidth = game.world.width;
    this.worldHeight = game.world.height;

    game.stage.backgroundColor = Phaser.Color.getColor(192, 192, 192);
    this.iconTank();

    var ipLifeFrame = game.add.sprite(30, 50, 'IP');
    var ipIconFrame = game.add.sprite(25, 70, 'p1');
    ipIconFrame.scale.set(0.5);

    this.displayLife(3);

    game.add.sprite(this.worldWidth - 50, 200, 'flag');
    this.displayLevel(1);

    this.map = new Map(game, 1, 1, 3);
    this.map.display();
    
  },

  update: function() {
    this.map.update();
  },

  iconTank: function() {
    var width = 55;
    var height = 15;
    var enemy1;
    var enemy2;

    for(var i = 0; i < 10; i ++) {
      height += 15;
      enemy1 = game.add.sprite(this.worldWidth - width, height, 'enemy');
      enemy2 = game.add.sprite(this.worldWidth - width + 18, height, 'enemy');
    }
    
  },

  displayLife: function(lifeNumber) {
    game.add.text(50, 70, lifeNumber, { font: "20px Courier-Bold", fill: "#000000" });
  },

  displayLevel: function(levelNumber) {
    game.add.text(this.worldWidth - 50, 230, levelNumber, { font: "20px Courier-Bold", fill: "#000000" });
  }
};