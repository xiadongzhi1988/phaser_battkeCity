function Map(game, level, tankType, life) {
  this.game = game;
  this.level = level;
  this.tankType = tankType;
  this.life = life;

  this.worldWidth = this.game.world.width;
  this.worldHeight = this.game.world.height;

  this.map = null;
  this.leftMargin = 0;

}

Map.prototype.display = function() {           
  this.map = this.game.add.tilemap("map1");
  this.map.addTilesetImage('tile');
  var layer1 = this.map.layer;
  var aScale = this.game.world.height / layer1.heightInPixels;
  var bmd = game.add.bitmapData(layer1.heightInPixels * aScale, layer1.heightInPixels * aScale);
  bmd.context.fillStyle = '#000000';
  bmd.context.fillRect(0, 0, layer1.heightInPixels * aScale, layer1.heightInPixels * aScale);
  bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5);
  
  // //创建新的层，使用远层的大小
  this.layer = this.map.createLayer('bg1', layer1.heightInPixels, layer1.heightInPixels);
  this.layer.position.x = this.worldWidth / 8;
  this.layer.scale = {x: aScale, y: aScale};
  this.layer.fixedToCamera = false;

  this.leftMargin = this.worldWidth / 8;
  var objects = this.map.objects.objects;
  var homeObject = this.findNameFromObjects('home', objects);
  var homeSprite = this.game.add.sprite(this.leftMargin + homeObject.x * aScale, homeObject.y * aScale, 'home');
};

Map.prototype.findNameFromObjects = function(name, objects) {
  for(var i in objects) {
    if (objects[i].name == name) {
      return objects[i];
    }
  }
  return false;
}