export declare function selectComponent(context: any, selector: string | Function): any;
export declare function showFunctionalComponent(options: {
  context?: any;
  selector: string | ((context: any) => any);
  showFunction?: string;
  [k: string]: any;
}): Promise<unknown>;
