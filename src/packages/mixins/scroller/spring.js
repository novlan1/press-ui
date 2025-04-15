function o(e, t, n) {
  return e > t - n && e < t + n;
}

function a(e, t) {
  return o(e, 0, t);
}

function commonBetweenEAndDe({
  e,
  c,
  u,
}) {
  let t;
  let n;
  if (e === this._t) {
    t = this._powER1T;
    n = this._powER2T;
  }
  this._t = e;
  if (!t) {
    this._powER1T = Math.pow(Math.E, c * e);
    t = this._powER1T;
  }
  if (!n) {
    this._powER2T = Math.pow(Math.E, u * e);
    n = this._powER2T;
  }
  return {
    t,
    n,
  };
}

export function Spring(e, t, n) {
  this._m = e;
  this._k = t;
  this._c = n;
  this._solution = null;
  this._endPosition = 0;
  this._startTime = 0;
}

Spring.prototype._solve = function (e, t) {
  const n = this._c;
  const i = this._m;
  const r = this._k;
  const o = n * n - 4 * i * r;
  if (o === 0) {
    const a = -n / (2 * i);
    const s = e;
    const l = t / (a * e);
    return {
      x(e) {
        return (s + l * e) * Math.pow(Math.E, a * e);
      },
      dx(e) {
        const t = Math.pow(Math.E, a * e);
        return a * (s + l * e) * t + l * t;
      },
    };
  }
  if (o > 0) {
    const c = (-n - Math.sqrt(o)) / (2 * i);
    const u = (-n + Math.sqrt(o)) / (2 * i);
    const l = (t - c * e) / (u - c);
    const s = e - l;
    return {
      x(e) {
        const { t, n } = commonBetweenEAndDe({ e, c, u });
        return s * t + l * n;
      },
      dx(e) {
        const { t, n } = commonBetweenEAndDe({ e, c, u });
        return s * c * t + l * u * n;
      },
    };
  }
  const d = Math.sqrt(4 * i * r - n * n) / (2 * i);

  const a = -n / 2 * i;

  const s = e;

  const l = (t - a * e) / d;
  return {
    x(e) {
      return Math.pow(Math.E, a * e) * (s * Math.cos(d * e) + l * Math.sin(d * e));
    },
    dx(e) {
      const t = Math.pow(Math.E, a * e);

      const n = Math.cos(d * e);

      const i = Math.sin(d * e);
      return t * (l * d * n - s * d * i) + a * t * (l * i + s * n);
    },
  };
};
Spring.prototype.x = function (e) {
  if (e === undefined) {
    e = ((new Date()).getTime() - this._startTime) / 1e3;
  }
  return this._solution ? this._endPosition + this._solution.x(e) : 0;
};
Spring.prototype.dx = function (e) {
  if (e === undefined) {
    e = ((new Date()).getTime() - this._startTime) / 1e3;
  }
  return this._solution ? this._solution.dx(e) : 0;
};
Spring.prototype.setEnd = function (e, t, n) {
  if (!n) {
    n = (new Date()).getTime();
  }
  if (e !== this._endPosition || !a(t, 0.4)) {
    t = t || 0;
    let i = this._endPosition;
    if (this._solution) {
      if (a(t, 0.4)) {
        t = this._solution.dx((n - this._startTime) / 1e3);
      }
      i = this._solution.x((n - this._startTime) / 1e3);
      if (a(t, 0.4)) {
        t = 0;
      }
      if (a(i, 0.4)) {
        i = 0;
      }
      i += this._endPosition;
    }
    if (!(this._solution && a(i - e, 0.4) && a(t, 0.4))) {
      this._endPosition = e;
      this._solution = this._solve(i - this._endPosition, t);
      this._startTime = n;
    }
  }
};
Spring.prototype.snap = function (e) {
  this._startTime = (new Date()).getTime();
  this._endPosition = e;
  this._solution = {
    x() {
      return 0;
    },
    dx() {
      return 0;
    },
  };
};
Spring.prototype.done = function (e) {
  if (!e) {
    e = (new Date()).getTime();
  }
  return o(this.x(), this._endPosition, 0.4) && a(this.dx(), 0.4);
};
Spring.prototype.reconfigure = function (e, t, n) {
  this._m = e;
  this._k = t;
  this._c = n;
  if (!this.done()) {
    this._solution = this._solve(this.x() - this._endPosition, this.dx());
    this._startTime = (new Date()).getTime();
  }
};
Spring.prototype.springConstant = function () {
  return this._k;
};
Spring.prototype.damping = function () {
  return this._c;
};
Spring.prototype.configuration = function () {
  function e(e, t) {
    e.reconfigure(1, t, e.damping());
  }

  function t(e, t) {
    e.reconfigure(1, e.springConstant(), t);
  }
  return [{
    label: 'Spring Constant',
    read: this.springConstant.bind(this),
    write: e.bind(this, this),
    min: 100,
    max: 1e3,
  }, {
    label: 'Damping',
    read: this.damping.bind(this),
    write: t.bind(this, this),
    min: 1,
    max: 500,
  }];
};
