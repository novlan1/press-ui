const DEFAULT_SHOW_FUNCTION = 'showDialog';

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

export function showFunctionalComponent(options: {
  context?: any;
  selector: string;
  showFunction?: string;
  [k: string]: any;
}) {
  return new Promise((resolve, reject) => {
    const context = options.context || getContext();
    const dialog = context.selectComponent(options.selector);

    const newOptions = {
      callback: (action: string,  args: unknown) => {
        action === 'confirm' ? resolve(args) : reject(args);
      },
      ...options,
    };
    const showFunction = options.showFunction || DEFAULT_SHOW_FUNCTION;

    // #ifdef H5
    dialog[showFunction](newOptions);
    // #endif
    // #ifndef H5
    dialog.$vm[showFunction](newOptions);
    // #endif
  });
}
