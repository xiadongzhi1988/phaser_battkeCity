function BaseTank (opts) {
  this.game = opts.game;
  this.x = opts.x;
  this.y = opts.y;
  this.frameName = opts.frameName;
  this.speed = opts.speed;
  this.kAction = opts.kAction;
  this.delege = opts.delege;
  this.life = opts.life;
  this.main = opts.main;

  this.init();
}

BaseTank.prototype.init = function() {
  this.sprite = this.game.add.sprite(this.x, this.y, this.frameName);
  this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  this.sprite.anchor.set(0.5);
  this.sprite.position = {x: this.x + this.sprite.width / 2, y: this.y + this.sprite.height / 2};
  this.sprite.heart = this.heart.bind(this);

  this.width = this.sprite.width;
  this.height = this.sprite.height;
};

BaseTank.prototype.moveLeft = function() {
  this.kAction = 'left';
  this.sprite.angle = -90;

  var newPoint = {x: this.sprite.x - this.speed, y: this.sprite.y};
  this.doMove(newPoint, 'left');
};

BaseTank.prototype.moveUp = function() {
  this.kAction = 'up';
  this.sprite.angle = 0;

  var newPoint = {x: this.sprite.x, y: this.sprite.y - this.speed};
  this.doMove(newPoint, 'up');
};

BaseTank.prototype.moveRight = function() {
  this.kAction = 'right';
  this.sprite.angle = 90;
  var newPoint = {x: this.sprite.x + this.speed, y: this.sprite.y };
  this.doMove(newPoint, 'right');
};

BaseTank.prototype.moveDown = function() {
  this.kAction = 'down';
  this.sprite.angle = 180;
  var newPoint = {x: this.sprite.x, y: this.sprite.y + this.speed};
  this.doMove(newPoint, 'down');
};

BaseTank.prototype.doMove = function(newPoint, d) {
  var check = {};
  var check1 = {};
  var check2 = {};
  check.x = newPoint.x;
  check.y = newPoint.y;
  check1.x = newPoint.x;
  check1.y = newPoint.y;
  check2.x = newPoint.x;
  check2.y = newPoint.y;

  if (d == 'left') {
    check.x = newPoint.x - this.sprite.width / 2;
    check1.x = check.x;
    check2.x = check.x;

    check1.y = newPoint.y + this.sprite.height / 2 - 2;
    check2.y = newPoint.y - this.sprite.height / 2 + 2;

  } else if (d == 'up') {

    check.y = newPoint.y - this.sprite.height / 2;
    check1.y = check.y;
    check2.y = check.y;

    check1.x = newPoint.x + this.sprite.width / 2 - 2;
    check2.x = newPoint.x - this.sprite.width / 2 + 2;
  } else if (d == 'right') {
    check.x = newPoint.x + this.sprite.width /2;
    check1.x = check.x;
    check2.x = check.x;

    check1.y = newPoint.y + this.sprite.height / 2 - 2;
    check2.y = newPoint.y - this.sprite.height / 2 + 2;

  } else {
    check.y = newPoint.y + this.sprite.height / 2;
    check1.y = check.y;
    check2.y = check.y;

    check1.x = newPoint.x + this.sprite.width / 2 - 2;
    check2.x = newPoint.x - this.sprite.width / 2 + 2;
  }

  //check边界
  if (check.x >= this.delege.layer.x + this.delege.layer.width ||
      check.x <= this.delege.layer.x ||
      check.y <= 0 || 
      check.y >= this.delege.layer.y + this.delege.layer.height
    ) {
    return ;
  }
  var pointTile = this.pointToTile(check);
  var pointTile1 = this.pointToTile(check1);
  var pointTile2 = this.pointToTile(check2);
  if (this.checkPoint(pointTile) && this.checkPoint(pointTile1) && this.checkPoint(pointTile2)) {
    this.sprite.position = newPoint;
  }
};

BaseTank.prototype.pointToTile = function(point) {
  return this.delege.convertPixToTile(point);
};

BaseTank.prototype.removeTile = function(point) {
  return this.delege.removeTile(point);
};

BaseTank.prototype.checkPoint = function(pointTile) {
  if (pointTile && pointTile.index > 0) {
    return false;
  }
  return true;
};

BaseTank.prototype.heart = function() {
  if (this.life > 1) {
    this.life --;
  } else {
    this.sprite.kill();
    this.main.destroy();
  }
}
