function Tank(game, delege, x, y, kind) {
  this.game = game;
  this.kind = kind;
  this.tank = null;

  this.x = x;
  this.y = y;
  this.delege = delege;

  this.kAction = 'up';
  this.bulletTime = 0;

  this.width = 0;
  this.height = 0;
  this.hero = null;
  this.enemys = [];
}

Tank.kBorn = 0;
Tank.kStepOne = 1;
Tank.kStepTwo = 2;
Tank.kStepThree = 3;

Tank.prototype.init = function() {
  var frameName = '';
  var speed = 1;
  switch(this.kind) {
    case Tank.kBorn:
      frameName = 'p1';
      speed = 1;
      break;
    case Tank.kStepOne:
      frameName = 'p1_a';
      speed = 1.5;
      break;

    case Tank.kStepTwo:
      frameName = 'p1_b';
      speed = 1.5;
      break;

    case Tank.kStepThree:
      frameName = 'p1_c';
      speed = 1.5;
      break;
  }

  this.born(frameName, speed);
  this.bulletManage = new Bullet({
    game: this.game,
    action: this.kAction,
    level: this.kind,
    hero: this.hero,
    tank: this,
    come: 'player'
  });

  this.cursors = this.game.input.keyboard.createCursorKeys();
  this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};

Tank.prototype.born = function(frameName, speed) {
  //播放出生动画
  //保护层动画
  this.tank = new BaseTank({
    game: this.game,
    x: this.x,
    y: this.y,
    frameName: frameName,
    speed: speed,
    kAction: this.kAction,
    delege: this.delege,
    life: 1,
    main: this
  });
};


Tank.prototype.moveLeft = function() {
  this.kAction = 'left';
  this.tank.moveLeft();
};

Tank.prototype.moveUp = function() {
  this.kAction = 'up';
  this.tank.moveUp();
};

Tank.prototype.moveRight = function() {
  this.kAction = 'right';
  this.tank.moveRight();
};

Tank.prototype.moveDown = function() {
  this.kAction = 'down';
  this.tank.moveDown();
};

Tank.prototype.pointToTile = function(point) {
  return this.delege.convertPixToTile(point);
};

Tank.prototype.removeTile = function(point) {
  return this.delege.removeTile(point);
};

Tank.prototype.fire = function() {
  this.bulletManage.fire();
};

Tank.prototype.update = function() {
  this.bulletManage.update();

  if (this.cursors.left.isDown) {
    this.moveLeft();
  } else if (this.cursors.up.isDown) {
    this.moveUp();
  } else if (this.cursors.right.isDown) {
    this.moveRight();
  } else if (this.cursors.down.isDown) {
    this.moveDown();
  }

  if (this.fireButton.isDown) {
    this.fire();
  }

};

Tank.prototype.setHeroSprite = function(sprite) {
  this.hero = sprite;
};

Tank.prototype.addEnemy = function(enemy) {
  this.enemys.push(enemy);
}