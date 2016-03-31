function Bullet (opts) {
  this.game = opts.game;
  this.level = opts.level;
  this.action = opts.action;
  this.hero = opts.hero;
  this.tank = opts.tank;
  this.come = opts.come;

    //  Our bullet group
  this.bullets = game.add.group();
  this.bullets.enableBody = true;
  this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
  this.bullets.createMultiple(30, 'bullet');
  this.bullets.setAll('anchor.x', 0.5);
  this.bullets.setAll('anchor.y', 1);

  this.enemys = [];
  this.palyer = [];

  this.ins = [];
  this.bulletTime = 0;
  this.init();
}

Bullet.prototype.init = function() {
  switch(this.level) {
    case 0:
      this.speed = 100;
      this.timeDuring = 1000;
      break;
    case 1:
      this.speed = 100;
      this.timeDuring = 1000;
      break;
    case 2:
      this.speed = 200;
      this.timeDuring = 500;
      break;
    case 3:
      this.speed = 200;
      this.timeDuring = 500;
      break;
  }
  
};

Bullet.prototype.fire = function() {
  if (this.game.time.now > this.bulletTime) {
    
    var bullet = this.bullets.getFirstExists(false);
    
    if (bullet) {
      this.bulletTime = game.time.now + this.timeDuring;
      bullet.action = this.tank.kAction;
      switch(this.tank.kAction) {
        case 'up':

          bullet.reset(this.tank.tank.sprite.x, this.tank.tank.sprite.y - 8);
          bullet.angle = 0;
          bullet.body.velocity.y = -this.speed;
          break;
        case 'down':
          bullet.reset(this.tank.tank.sprite.x, this.tank.tank.sprite.y + 8);
          bullet.angle = 180;
          bullet.body.velocity.y = this.speed;
          break;
        case 'left':
          bullet.reset(this.tank.tank.sprite.x - 8, this.tank.tank.sprite.y);
          bullet.angle = -90;
          bullet.body.velocity.x = -this.speed;
          break;
        case 'right':
          bullet.reset(this.tank.tank.sprite.x + 8, this.tank.tank.sprite.y);
          bullet.angle = 90;
          bullet.body.velocity.x = this.speed;
          break;


      }
      this.ins.push(bullet);
    }
  }
};

Bullet.prototype.update = function() {
  for(var i = 0; i < this.ins.length; i ++) {
    var bullet = this.ins[i];

    this.checkWorld(bullet);
    this.checkWall(bullet);
    game.physics.arcade.overlap(this.hero, bullet, this.killSelf, null, this);
    for(var j = 0;j < this.enemys.length ; j++) {
      game.physics.arcade.overlap(this.enemys[j], bullet, this.hiteEnemy, null, this);
    }
    
  }
};

Bullet.prototype.checkWorld = function(bullet) {
  if (bullet.x >= this.tank.delege.layer.x + this.tank.delege.layer.width ||
      bullet.x <= this.tank.delege.layer.x ||
      bullet.y <= 0 || 
      bullet.y >= this.tank.delege.layer.y + this.tank.delege.layer.height
    ) {
    bullet.kill();
  }
};

Bullet.prototype.checkWall = function(bullet) {

  var point1 = {};
  var point2 = {};
  var point3 = {};

  point1.x = bullet.x;
  point1.y = bullet.y;

  if (bullet.action === 'up' || bullet.action === 'down') {
    point2.x = bullet.x + 10;
    point2.y = bullet.y;

    point3.x = bullet.x - 10;
    point3.y = bullet.y;
  } else if (bullet.action === 'left' || bullet.action === 'right') {
    
    point2.x = bullet.x;
    point2.y = bullet.y  + 10;

    point3.x = bullet.x;
    point3.y = bullet.y - 10;

  } 
  var tile = this.tank.pointToTile({x: point1.x, y: point1.y});
  var tile1 = this.tank.pointToTile({x: point2.x, y: point2.y});
  var tile2 = this.tank.pointToTile({x: point3.x, y: point3.y});
  this.colliceWall(tile, bullet);
  this.colliceWall(tile1, bullet);
  this.colliceWall(tile2, bullet);
};

Bullet.prototype.colliceWall = function(tile, bullet) {
    //根据不同方向 选择不同的点
  var wall1 = [0, 1, 2, 3, 28, 29, 30, 31, 56, 57, 58, 59, 84, 85, 86, 87];
  var wall2 = [4, 5, 6, 7, 32, 33, 34, 35, 60, 61, 62, 63, 88, 89, 90, 91];
  if (tile) {
    for(var i = 0; i < wall1.length; i ++) {
      if (tile.index == wall1[i]) {
        bullet.kill ();
        this.tank.removeTile({x: tile.x, y: tile.y});
        //tile.index = -1;
      }
    }

    for(var i = 0; i < wall2.length; i ++) {
      if (tile.index == wall2[i]) {
        bullet.kill();
        //this.tank.removeTile({x: tile.x, y: tile.y}); 子弹类型
        //tile.index = -1;
      }
    }

  }
}

Bullet.prototype.killSelf = function(hero, bullet) {
  bullet.kill();
  console.log('go die')
};

Bullet.prototype.addEnemy = function(enemy) {
  this.enemys.push(enemy.tank.sprite);
};

Bullet.prototype.hiteEnemy = function(enemy, bullet) {
  if (this.come === 'player') {
    bullet.kill();
    enemy.heart();
  }
};

Bullet.prototype.destroy = function() {
  this.bullets.destroy();
}