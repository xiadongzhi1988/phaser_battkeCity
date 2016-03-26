function Tank(game, delege, x, y, kind) {
  this.game = game;
  this.kind = kind;
  this.tank = null;

  this.x = x;
  this.y = y;
  this.delege = delege;

  this.kAction = 'up';
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
};

Tank.prototype.born = function(frameName, speed) {
  //播放出生动画
  //保护层动画
  this.tank = this.game.add.sprite(this.x, this.y, frameName);
  this.tank.anchor.set(0.5);
  this.tank.position = {x: this.x + this.tank.width / 2, y: this.y + this.tank.height / 2};
  this.speed = speed;
};

Tank.prototype.doMove = function(newPoint, d) {
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
    check.x = newPoint.x - this.tank.width / 2;
    check1.x = check.x;
    check2.x = check.x;

    check1.y = newPoint.y + this.tank.height / 2 - 2;
    check2.y = newPoint.y - this.tank.height / 2 + 2;

  } else if (d == 'up') {

    check.y = newPoint.y - this.tank.height / 2;
    check1.y = check.y;
    check2.y = check.y;

    check1.x = newPoint.x + this.tank.width / 2 - 2;
    check2.x = newPoint.x - this.tank.width / 2 + 2;
  } else if (d == 'right') {
    check.x = newPoint.x + this.tank.width /2;
    check1.x = check.x;
    check2.x = check.x;

    check1.y = newPoint.y + this.tank.height / 2 - 2;
    check2.y = newPoint.y - this.tank.height / 2 + 2;

  } else {
    check.y = newPoint.y + this.tank.height / 2;
    check1.y = check.y;
    check2.y = check.y;

    check1.x = newPoint.x + this.tank.width / 2 - 2;
    check2.x = newPoint.x - this.tank.width / 2 + 2;
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
    this.tank.position = newPoint;
  }
};

Tank.prototype.moveLeft = function() {
  this.kAction = 'left';
  this.tank.angle = -90;

  var newPoint = {x: this.tank.x - this.speed, y: this.tank.y};
  this.doMove(newPoint, 'left');

};

Tank.prototype.moveUp = function() {
  this.kAction = 'up';
  this.tank.angle = 0;

  var newPoint = {x: this.tank.x, y: this.tank.y - this.speed};
  this.doMove(newPoint, 'up');
};

Tank.prototype.moveRight = function() {
  this.kAction = 'right';
  this.tank.angle = 90;
  var newPoint = {x: this.tank.x + this.speed, y: this.tank.y };
  this.doMove(newPoint, 'right');
};

Tank.prototype.moveDown = function() {
  this.kAction = 'down';
  this.tank.angle = 180;
  var newPoint = {x: this.tank.x, y: this.tank.y + this.speed};
  this.doMove(newPoint, 'down');
};

Tank.prototype.checkPoint = function(pointTile) {
  if (pointTile && pointTile.index > 0) {
    return false;
  }
  return true;
};

Tank.prototype.pointToTile = function(point) {
  return this.delege.convertPixToTile(point);
}