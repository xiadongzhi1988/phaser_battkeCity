var GameState = {};
GameState.ready = function() {};
GameState.ready.prototype = {
  preload: function() {
    game.load.image('battleCity', 'assets/images/battleCity.png');
    game.load.image('enemy', 'assets/images/images/enemy.png');
    game.load.image('IP', 'assets/images/images/IP.png');
    game.load.image('p1', 'assets/images/images/p1.png');
    game.load.image('flag', 'assets/images/images/flag.png');
    game.load.image("tile", "assets/images/tile.png");
    game.load.image("home", "assets/images/images/home.png");
    game.load.image("p1_a", "assets/images/images/p1-a.png");
    game.load.image("p1_b", "assets/images/images/p1-b.png");
    game.load.image("p1_c", "assets/images/images/p1-c.png");
    game.load.image("bullet", "assets/images/images/bullet.png");
    game.load.tilemap("map1", "assets/maps/map1.json", null, Phaser.Tilemap.TILED_JSON);
  },

  create: function() {
    game.state.start('start');
    this.group = game.add.group();
    this.group.position = {x: game.world.width / 2, y: game.world.height / 2};
    var bg = game.add.sprite(0, -50, 'battleCity');
    var text = game.add.text(bg.x + bg.width / 2, 90, 'Start Game', { font: "25px Helvetica-BoldOblique", fill: "#ffffff", align: "center" });
    text.anchor.x = 0.5;
    text.inputEnabled = true;
    text.events.onInputDown.add(this.start, this);

    this.group.addChild(bg);
    this.group.addChild(text);

  },

  start: function() {
    var tween = game.add.tween(this.group);
    
    tween.to({y: -120 }, 3000, Phaser.Easing.Linear.None);
    tween.onComplete.add(this.doStart, this);
    tween.start();
  },

  doStart: function() {
    game.state.start('start');
  }
}