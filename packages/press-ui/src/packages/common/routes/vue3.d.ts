export function getRouteQuery(): Record<string, any>;

export const $route: Record<string, any>;

export function findRouteByName(routes: any, name: any): any;

export function genQueryToStr(query?: Record<string, string | number>): string;

export const getRouter: (ALL_ROUTES: any) => {
  push(args: any): void;
  replace(args: any): void;
};
