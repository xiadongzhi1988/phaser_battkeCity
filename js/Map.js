function Map(game, level, tankType, life) {
  this.game = game;
  this.level = level;
  this.tankType = tankType;
  this.life = life;

  this.worldWidth = this.game.world.width;
  this.worldHeight = this.game.world.height;

  this.map = null;

}

Map.prototype.display = function() {           
  this.map = this.game.add.tilemap("map1");
  this.map.addTilesetImage('tile');
  var layer1 = this.map.layer;

  var bmd = game.add.bitmapData(layer1.widthInPixels, layer1.heightInPixels);
  bmd.context.fillStyle = '#ff0000';
  bmd.context.fillRect(0, 0, layer1.widthInPixels, layer1.heightInPixels);

  // var aScale = this.game.world.height / layer1.heightInPixels;
  // //创建新的层，使用远层的大小
  // this.layer = this.map.createLayer('bg1', layer1.heightInPixels, layer1.heightInPixels);
  // this.layer.position.x = this.worldWidth / 8;
  // this.layer.scale = {x: aScale, y: aScale};
  // this.layer.fixedToCamera = false;
}