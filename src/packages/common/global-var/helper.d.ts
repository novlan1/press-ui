export function getCurUrl(): string;
export function refreshCurrentPage(isRedirect?: boolean): void;
export function queryString(options: Record<string, string | number>, needEncode?: boolean): string;
export function routeChangePath(url: string, options: Record<string, string | number>): string;
