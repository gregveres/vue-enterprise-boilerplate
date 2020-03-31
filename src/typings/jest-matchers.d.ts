import { Component, VueConstructor } from "vue";
export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAComponent(component: Component): R;
      toBeAViewComponent(component: Component, mockInstance?: VueConstructor): R;
      toBeAViewComponentUsing(component: Component, mockInstance: VueConstructor): R;
      toBeAVuexModule(): R;
    }
  }
}
