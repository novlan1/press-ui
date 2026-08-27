interface IProtocolItem {
  text: string;
  light?: boolean;
  link?: string;
}
export declare function parseProtocol(list: Array<{
  title?: string;
  list: Array<string | Array<string | IProtocolItem>>;
}>): {
  uniqueKey: string;
  list: {
    uniqueKey: string;
    list: {
      uniqueKey: string;
      text: string;
      light?: boolean | undefined;
      link?: string | undefined;
    }[];
  }[];
  title?: string | undefined;
}[];
export {};
