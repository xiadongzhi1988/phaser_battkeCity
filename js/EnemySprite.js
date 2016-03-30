function EnemySprite(opts) {
  this.game = opts.game;
  this.kind = opts.kind;
  this.x = opts.x;
  this.y = opts.y;
  this.delege = opts.delege;

  this.life = 0;
  this.frameName = '';
  this.speed = 100;
  this.kAction = 'down';
  this.tank;

  this.init();
}

EnemySprite.slow = 1;
EnemySprite.quick = 2;
EnemySprite.strong = 3;
EnemySprite.strongYellow = 4;
EnemySprite.strongRedLife3 = 5;
EnemySprite.strongRed = 6;
EnemySprite.strongGreen = 7;
EnemySprite.quickRed = 8;
EnemySprite.slowRed = 9;

EnemySprite.prototype.init = function() {
  switch(this.kind) {
    case EnemySprite.slow:
      this.frameName = 'en1';
      this.life = 1;
      this.speed = 1;
      this.score = 500;

      break;
    
  }

  this.tank = new BaseTank({
    game: this.game,
    x: this.x,
    y: this.y,
    frameName: this.frameName,
    speed: this.speed,
    kAction: this.kAction,
    delege: this.delege,
    life: this.life
  });

  this.tank.sprite.angle = 180;

  this.bulletManage = new Bullet({
    game: this.game,
    action: this.kAction,
    level: this.kind,
    hero: this.hero,
    tank: this,
    come: 'enemy'
  });

  this.game.time.events.add(Phaser.Timer.SECOND, this.initMove, this);
}

EnemySprite.prototype.initMove = function() {
  this.randomLoop = this.game.time.events.loop(Phaser.Timer.SECOND, this.randomAction, this);
  this.moveLoop = this.game.time.events.loop(Phaser.Timer.SECOND * 1/ 30, this.keepMove, this);
  this.fireLoop = this.game.time.events.loop(Phaser.Timer.SECOND, this.randomFire, this);
}

EnemySprite.prototype.randomAction = function() {
  var ran = Math.random();
  this.kAction = ran < 0.4 ? 'down' : ( ran < 0.6 ? 'left' : (ran < 0.9 ? 'right' : 'up'));
}

EnemySprite.prototype.keepMove = function() {
  switch(this.kAction) {
    case 'up':
      this.tank.moveUp();
      break;
    case 'down':
      this.tank.moveDown();
      break;
    case 'right':
      this.tank.moveRight();
      break;
    case 'left':
      this.tank.moveLeft();
      break;
  }
};

EnemySprite.prototype.randomFire = function() {
  var ran;
  this.fire();
};

EnemySprite.prototype.fire = function() {
  this.bulletManage.fire();
};

EnemySprite.prototype.update = function() {
  this.bulletManage.update();
};

EnemySprite.prototype.pointToTile = function(point) {
  return this.delege.convertPixToTile(point);
};

EnemySprite.prototype.removeTile = function(point) {
  return this.delege.removeTile(point);
};
