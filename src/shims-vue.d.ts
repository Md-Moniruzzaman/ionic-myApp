declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{readonly}, {readonly}, any>
    export default component
  }
  