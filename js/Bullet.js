function Bullet (opts) {
  this.game = opts.game;
  this.level = opts.level;
  this.action = opts.action;
  this.hero = opts.hero;
  this.tank = opts.tank;

    //  Our bullet group
  this.bullets = game.add.group();
  this.bullets.enableBody = true;
  this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
  this.bullets.createMultiple(30, 'bullet');
  this.bullets.setAll('anchor.x', 0.5);
  this.bullets.setAll('anchor.y', 1);

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

          bullet.reset(this.tank.tank.x, this.tank.tank.y - 8);
          bullet.angle = 0;
          bullet.body.velocity.y = -this.speed;
          break;
        case 'down':
          bullet.reset(this.tank.tank.x, this.tank.tank.y + 8);
          bullet.angle = 180;
          bullet.body.velocity.y = this.speed;
          break;
        case 'left':
          bullet.reset(this.tank.tank.x - 8, this.tank.tank.y);
          bullet.angle = -90;
          bullet.body.velocity.x = -this.speed;
          break;
        case 'right':
          bullet.reset(this.tank.tank.x + 8, this.tank.tank.y);
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
  //   if (bullet.action === 'up') {
  //     bullet.y -= this.speed;
  //   } else if (bullet.action === 'down') {
  //     bullet.y += this.speed;
  //   } else if (bullet.action === 'left') {
  //     bullet.x -= this.speed;
  //   } else if (bullet.action === 'right') {
  //     bullet.x += this.speed;
  //   }

    this.checkWorld(bullet);
    this.checkWall(bullet);
    game.physics.arcade.overlap(this.hero, bullet, this.killSelf, null, this);
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
  //根据不同方向 选择不同的点
  var wall1 = [0, 1, 2, 3, 28, 29, 30, 31, 56, 57, 58, 59, 84, 85, 86, 87];
  var tile = this.tank.pointToTile({x: bullet.x, y: bullet.y});
  var tile1 = this.tank.pointToTile({x: bullet.x + bullet.width /2, y: bullet.y + bullet.height});
  if (tile) {
    for(var i = 0; i < wall1.length; i ++) {
      if (tile.index == wall1[i]) {
        bullet.kill();
        this.tank.removeTile({x: tile.x, y: tile.y});
        //tile.index = -1;
      }
    }
  }
  
  if (tile1) {
    for(var i = 0; i < wall1.length; i ++) {
      if (tile1.index == wall1[i]) {
        bullet.kill();
        this.tank.removeTile({x: tile1.x, y: tile1.y});

      }
    }
  }
};

Bullet.prototype.killSelf = function(hero, bullet) {
  bullet.kill();
  console.log('go die')
}