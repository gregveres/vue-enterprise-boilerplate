import { Component, VueConstructor } from "vue";
export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAComponent(): R;
      toBeAViewComponent(mockInstance?: any): R;
      toBeAViewComponentUsing(mockInstance: any): R;
      toBeAVuexModule(): R;
    }
  }
}
