function Map(game, level, tankType, life, manage) {
  this.game = game;
  this.level = level;
  this.tankType = tankType;
  this.life = life;
  this.manage = manage;

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
  game.physics.enable(homeSprite, Phaser.Physics.ARCADE);

  var playTankPosition = this.findNameFromObjects('pl1');
  this.tank = new Tank(game, this, playTankPosition.x* this.aScale + this.leftMargin, playTankPosition.y * this.aScale, 0);
  this.tank.setHeroSprite(homeSprite);
  this.tank.init();

  //敌人
  this.initEnemy();
  this.cursors = game.input.keyboard.createCursorKeys();
  this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

};

Map.prototype.update = function() {
  this.tank.update();

  for(var i= 0; i < this.enemys.length; i++) {
    this.enemys[i].update();
  }
  if (this.cursors.left.isDown) {
    this.tank.moveLeft();
  } else if (this.cursors.up.isDown) {
    this.tank.moveUp();
  } else if (this.cursors.right.isDown) {
    this.tank.moveRight();
  } else if (this.cursors.down.isDown) {
    this.tank.moveDown();
  }

  if (this.fireButton.isDown) {
    this.tank.fire();
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
};

Map.prototype.removeTile = function(point) {
  return this.map.removeTile(point.x, point.y, this.layer);
};

Map.prototype.initEnemy = function() {
  this.enemys = [];

  this.bornNum = 0;
  this.enemyIndex = 0;
  this.tankKinds = enemyData.level1;

  this.enemyLoop = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.bornEnemy, this);
};

Map.prototype.bornEnemy = function() {
  if (this.enemyIndex > this.tankKinds.length - 1) {
    this.game.time.events.remove(this.enemyLoop);
    return ;
  }

  if (this.enemys.length > 5) {
    return ;
  }

  var bornPoint;
  var enemyKind = this.tankKinds[this.enemyIndex];
  var frameName;
  switch(enemyKind) {
    case 1: 
      frameName = 'en1';
      break;
    case 2:
      frameName = 'en2';
      break;
    case 3:
      break;
  }

  if (this.bornNum >= 3) {
    this.bornNum = 0;
  }

  if (this.bornNum === 0) {
    bornPoint = this.findNameFromObjects('en1');
  } else if (this.bornNum === 1) {
    bornPoint = this.findNameFromObjects('en2');
  } else {
    bornPoint = this.findNameFromObjects('en3');
  }

  var enemySprite = new EnemySprite({
    game: this.game,
    x: this.leftMargin + bornPoint.x * this.aScale,
    y: bornPoint.y * this.aScale,
    kind: 1,
    delege: this
  });

  this.enemys.push(enemySprite);
  this.tank.bulletManage.addEnemy(enemySprite);

  //添加敌人 子弹碰撞
  this.tank.addEnemy(enemySprite);

  this.manage.removeEnemyIconIndex(this.enemyIndex);

  this.enemyIndex ++;
  this.bornNum++;
}