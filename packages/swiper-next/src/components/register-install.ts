import { App, Component, Plugin } from 'vue';


type SFCWithInstall<T> = T & Plugin;


export const registerInstall = function <T extends Component>(component: T) {
  (component as SFCWithInstall<T>).install = function (Vue: App) {
    if (!Vue.component(component.name!)) {
      Vue.component(component.name!, component);
    }
  };

  return component as SFCWithInstall<T>;
};


export function withInstall(comp) {
  comp.install = function (Vue: App) {
    Vue.component(comp.name!, comp);
  };
  return comp;
}
