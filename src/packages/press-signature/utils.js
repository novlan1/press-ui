export function calcBethelLine(ctx, line, {
  lineColor = '#1A1A1A',
  updateRadius,
  radius,
}) {
  let RADIUS = radius; // 画圆的半径
  const smoothness = 60; // 顺滑度，用60的距离来计算速度
  const pressure = 1; // 默认压力
  const  lineSize = 1.5; // 笔记倍数
  const lineMin = 0.5; // 最小笔画半径
  const lineMax = 4; // 最大笔画半径

  if (line.length <= 1) {
    line[0].r = RADIUS;
    return;
  }

  let x0;
  let x1;
  let x2;
  let y0;
  let y1;
  let y2;
  // let r0;
  // let r1;
  // let r2;
  // let len;
  // let lastRadius;
  let dis = 0;
  let time = 0;
  const curveValue = 0.5;

  if (line.length <= 2) {
    x0 = line[1].x;
    y0 = line[1].y;
    x2 = line[1].x + (line[0].x - line[1].x) * curveValue;
    y2 = line[1].y + (line[0].y - line[1].y) * curveValue;
    // x2 = line[1].x;
    // y2 = line[1].y;
    x1 = x0 + (x2 - x0) * curveValue;
    y1 = y0 + (y2 - y0) * curveValue;
  } else {
    x0 = line[2].x + (line[1].x - line[2].x) * curveValue;
    y0 = line[2].y + (line[1].y - line[2].y) * curveValue;
    x1 = line[1].x;
    y1 = line[1].y;
    x2 = x1 + (line[0].x - x1) * curveValue;
    y2 = y1 + (line[0].y - y1) * curveValue;
  }
  // 从计算公式看，三个点分别是(x0,y0),(x1,y1),(x2,y2) ；(x1,y1)这个是控制点，控制点不会落在曲线上；实际上，这个点还会手写获取的实际点，却落在曲线上
  const len = distance({
    x: x2,
    y: y2,
  }, {
    x: x0,
    y: y0,
  });
  const lastRadius = RADIUS;
  for (let n = 0; n < line.length - 1; n++) {
    dis += line[n].dis;
    time += line[n].time - line[n + 1].time;
    if (dis > smoothness) break;
  }
  RADIUS = Math.min(time / len * pressure + lineMin, lineMax) * lineSize;
  updateRadius(RADIUS);

  line[0].r = RADIUS;
  // 计算笔迹半径；
  // if (line.length <= 2) {
  //   r0 = (lastRadius + RADIUS) / 2;
  //   r1 = r0;
  //   r2 = r1;
  //   // return;
  // } else {
  //   r0 = (line[2].r + line[1].r) / 2;
  //   r1 = line[1].r;
  //   r2 = (line[1].r + line[0].r) / 2;
  // }

  const n = 5;
  let point = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * x1 + t * t * x2;
    const y = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * y1 + t * t * y2;
    const r = lastRadius + (RADIUS - lastRadius) / n * i;
    point.push({
      x,
      y,
      r,
    });
    if (point.length == 3) {
      const a = ctaCalc(
        point[0].x,
        point[0].y,
        point[0].r,
        point[1].x,
        point[1].y,
        point[1].r,
        point[2].x,
        point[2].y,
        point[2].r,
      );
      a[0].color = lineColor;

      bethelDraw(ctx, a, 1);
      point = [{
        x,
        y,
        r,
      }];
    }
  }

  return line;
}


// 求两点之间距离
export function distance(a, b) {
  const x = b.x - a.x;
  const y = b.y - a.y;
  return Math.sqrt(x * x + y * y);
}


export function ctaCalc(x0, y0, r0, x1, y1, r1, x2, y2, r2) {
  const a = [];
  let vx01; let vy01; let norm;
  let vx21; let vy21;

  vx01 = x1 - x0;
  vy01 = y1 - y0;
  norm = Math.sqrt(vx01 * vx01 + vy01 * vy01 + 0.0001) * 2;
  vx01 = vx01 / norm * r0;
  vy01 = vy01 / norm * r0;

  const nX0 = vy01;
  const nY0 = -vx01;

  vx21 = x1 - x2;
  vy21 = y1 - y2;
  norm = Math.sqrt(vx21 * vx21 + vy21 * vy21 + 0.0001) * 2;
  vx21 = vx21 / norm * r2;
  vy21 = vy21 / norm * r2;
  const nX2 = -vy21;
  const nY2 = vx21;
  a.push({
    mx: x0 + nX0,
    my: y0 + nY0,
    color: '#1A1A1A',
  });
  a.push({
    c1x: x1 + nX0,
    c1y: y1 + nY0,
    c2x: x1 + nX2,
    c2y: y1 + nY2,
    ex: x2 + nX2,
    ey: y2 + nY2,
  });
  a.push({
    c1x: x2 + nX2 - vx21,
    c1y: y2 + nY2 - vy21,
    c2x: x2 - nX2 - vx21,
    c2y: y2 - nY2 - vy21,
    ex: x2 - nX2,
    ey: y2 - nY2,
  });
  a.push({
    c1x: x1 - nX2,
    c1y: y1 - nY2,
    c2x: x1 - nX0,
    c2y: y1 - nY0,
    ex: x0 - nX0,
    ey: y0 - nY0,
  });
  a.push({
    c1x: x0 - nX0 - vx01,
    c1y: y0 - nY0 - vy01,
    c2x: x0 + nX0 - vx01,
    c2y: y0 + nY0 - vy01,
    ex: x0 + nX0,
    ey: y0 + nY0,
  });
  a[0].mx = a[0].mx.toFixed(1);
  a[0].mx = parseFloat(a[0].mx);
  a[0].my = a[0].my.toFixed(1);
  a[0].my = parseFloat(a[0].my);
  for (let i = 1; i < a.length; i++) {
    a[i].c1x = a[i].c1x.toFixed(1);
    a[i].c1x = parseFloat(a[i].c1x);
    a[i].c1y = a[i].c1y.toFixed(1);
    a[i].c1y = parseFloat(a[i].c1y);
    a[i].c2x = a[i].c2x.toFixed(1);
    a[i].c2x = parseFloat(a[i].c2x);
    a[i].c2y = a[i].c2y.toFixed(1);
    a[i].c2y = parseFloat(a[i].c2y);
    a[i].ex = a[i].ex.toFixed(1);
    a[i].ex = parseFloat(a[i].ex);
    a[i].ey = a[i].ey.toFixed(1);
    a[i].ey = parseFloat(a[i].ey);
  }
  return a;
}

export function bethelDraw(ctx, point, isFill, color) {
  ctx.beginPath();
  ctx.moveTo(point[0].mx, point[0].my);
  if (undefined != color) {
    ctx.setFillStyle(color);
    ctx.setStrokeStyle(color);
  } else {
    ctx.setFillStyle(point[0].color);
    ctx.setStrokeStyle(point[0].color);
  }
  for (let i = 1; i < point.length; i++) {
    ctx.bezierCurveTo(point[i].c1x, point[i].c1y, point[i].c2x, point[i].c2y, point[i].ex, point[i].ey);
  }
  ctx.stroke();
  if (undefined != isFill) {
    ctx.fill(); // 填充图形 ( 后绘制的图形会覆盖前面的图形, 绘制时注意先后顺序 )
  }
  ctx.draw(true);
}
