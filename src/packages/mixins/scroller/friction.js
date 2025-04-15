export function Friction(e) {
  this._drag = e;
  this._dragLog = Math.log(e);
  this._x = 0;
  this._v = 0;
  this._startTime = 0;
}

Friction.prototype.set = function (e, t) {
  this._x = e;
  this._v = t;
  this._startTime = (new Date()).getTime();
};
Friction.prototype.setVelocityByEnd = function (e) {
  this._v = (e - this._x) * this._dragLog / (Math.pow(this._drag, 100) - 1);
};
Friction.prototype.x = function (e) {
  if (e === undefined) {
    e = ((new Date()).getTime() - this._startTime) / 1e3;
  }
  const t = e === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e);
  this._dt = e;
  return this._x + this._v * t / this._dragLog - this._v / this._dragLog;
};
Friction.prototype.dx = function (e) {
  if (e === undefined) {
    e = ((new Date()).getTime() - this._startTime) / 1e3;
  }
  const t = e === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e);
  this._dt = e;
  return this._v * t;
};
Friction.prototype.done = function () {
  return Math.abs(this.dx()) < 3;
};
Friction.prototype.reconfigure = function (e) {
  const t = this.x();
  const n = this.dx();
  this._drag = e;
  this._dragLog = Math.log(e);
  this.set(t, n);
};
Friction.prototype.configuration = function () {
  const e = this;
  return [{
    label: 'Friction',
    read() {
      return e._drag;
    },
    write(t) {
      e.reconfigure(t);
    },
    min: 0.001,
    max: 0.1,
    step: 0.001,
  }];
};
