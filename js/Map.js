function Map(game, level, tankType, life) {
  this.game = game;
  this.level = level;
  this.tankType = tankType;
  this.life = life;

  this.worldWidth = this.game.world.width;
  this.worldHeight = this.game.world.height;

  this.map = null;
  this.leftMargin = 0;
  this.objects = [];
  this.aScale = 1;
  this.tank = null;
}

Map.prototype.display = function() {           
  this.map = this.game.add.tilemap("map1");
  this.map.addTilesetImage('tile');
  var layer1 = this.map.layer;
  this.aScale = this.game.world.height / layer1.heightInPixels;
  var bmd = game.add.bitmapData(layer1.heightInPixels * this.aScale, layer1.heightInPixels * this.aScale);
  bmd.context.fillStyle = '#000000';
  bmd.context.fillRect(0, 0, layer1.heightInPixels * this.aScale, layer1.heightInPixels * this.aScale);
  bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5);
  

  // //创建新的层，使用远层的大小
  this.layer = this.map.createLayer('bg1', layer1.heightInPixels, layer1.heightInPixels);
  this.layer.position.x = this.worldWidth / 8;
  this.layer.scale = {x: this.aScale, y: this.aScale};
  this.layer.fixedToCamera = false;

  this.leftMargin = this.worldWidth / 8;
  this.objects = this.map.objects.objects;
  var homeObject = this.findNameFromObjects('home');
  var homeSprite = this.game.add.sprite(this.leftMargin + homeObject.x * this.aScale, homeObject.y * this.aScale, 'home');

  var playTankPosition = this.findNameFromObjects('pl1');
  this.tank = new Tank(game, this, playTankPosition.x* this.aScale + this.leftMargin, playTankPosition.y * this.aScale, 0);
  this.tank.init();

  this.cursors = game.input.keyboard.createCursorKeys();

  // var testData = this.map.layers[0].data;
  // for(var i = 0; i < testData.length; i++) {
  //   for(var j = 0; j < testData[i].length; j++) 
  //   if (testData[i][j].index !== -1) {
  //     console.log(i ,j ,testData[i][j])
  //   }
  // }

};

Map.prototype.update = function() {
  if (this.cursors.left.isDown) {
    this.tank.moveLeft();
  } else if (this.cursors.up.isDown) {
    this.tank.moveUp();
  } else if (this.cursors.right.isDown) {
    this.tank.moveRight();
  } else if (this.cursors.down.isDown) {
    this.tank.moveDown();
  }
};

Map.prototype.findNameFromObjects = function(name) {
  for(var i in this.objects) {
    if (this.objects[i].name == name) {
      return this.objects[i];
    }
  }
  return false;
};

Map.prototype.convertPixToTile = function (point) {
  return this.map.getTile(this.layer.getTileX((point.x - this.leftMargin)/ this.aScale), this.layer.getTileY(point.y / this.aScale), 0);
}