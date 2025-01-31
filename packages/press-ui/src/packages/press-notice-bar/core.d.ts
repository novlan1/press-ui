export function getScrollDurationAndWidth({ contentSelect, wrapSelector, context, speed, scrollable }: {
  contentSelect?: string | undefined;
  wrapSelector?: string | undefined;
  context: any;
  speed?: number | undefined;
  scrollable?: boolean | undefined;
}): Promise<{
  wrapWidth: number;
  contentWidth: number;
  duration: number;
}>;
