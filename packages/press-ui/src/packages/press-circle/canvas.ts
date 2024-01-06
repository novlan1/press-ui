export function adaptor(ctx: any) {
  // @ts-ignore
  return Object.assign(ctx, {
    setStrokeStyle(val: string | number) {
      ctx.strokeStyle = val;
    },
    setLineWidth(val: string | number) {
      ctx.lineWidth = val;
    },
    setLineCap(val: string | number) {
      ctx.lineCap = val;
    },
    setFillStyle(val: string | number) {
      ctx.fillStyle = val;
    },
    setFontSize(val: string | number) {
      ctx.font = String(val);
    },
    setGlobalAlpha(val: string | number) {
      ctx.globalAlpha = val;
    },
    setLineJoin(val: string | number) {
      ctx.lineJoin = val;
    },
    setTextAlign(val: string | number) {
      ctx.textAlign = val;
    },
    setMiterLimit(val: string | number) {
      ctx.miterLimit = val;
    },
    setShadow(offsetX: string | number, offsetY: string | number, blur: string | number, color: string | number) {
      ctx.shadowOffsetX = offsetX;
      ctx.shadowOffsetY = offsetY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = color;
    },
    setTextBaseline(val: string | number) {
      ctx.textBaseline = val;
    },
    createCircularGradient() { },
    draw() { },
  });
}
