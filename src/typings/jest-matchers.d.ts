import { Component, VueConstructor } from "vue";
export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAComponent(): R;
      toBeAViewComponent(mockInstance?: VueConstructor): R;
      toBeAViewComponentUsing(mockInstance: VueConstructor): R;
      toBeAVuexModule(): R;
    }
  }
}
