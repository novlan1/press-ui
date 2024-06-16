export declare const DEFAULT_PRESS_UI_INTRODUCE: ({
  title: string;
  list: (string | (string | {
    text: string;
    light: boolean;
  })[] | (string | {
    text: string;
    light: boolean;
    underline: boolean;
  })[])[];
} | {
  title: string;
  list: (string | (string | {
    text: string;
    light: boolean;
    link: string;
  })[])[];
})[];
export declare function getPressUIIntroduce(): Promise<{
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
}[]>;
