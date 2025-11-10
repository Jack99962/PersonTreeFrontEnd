declare module 'three/examples/jsm/loaders/GLTFLoader.js' {
  import { Loader, LoadingManager, Object3D } from 'three'
  export interface GLTF {
    scene: Object3D
    scenes: Object3D[]
    cameras: any[]
    animations: any[]
    asset: any
    parser: any
    userData: any
  }
  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager)
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: unknown) => void
    ): void
  }
}

declare module 'three/examples/jsm/controls/OrbitControls.js' {
  import { Camera, EventDispatcher, MOUSE, TOUCH } from 'three'
  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement)
    enabled: boolean
    target: { x: number; y: number; z: number }
    minDistance: number
    maxDistance: number
    enableDamping: boolean
    dampingFactor: number
    mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE }
    touches: { ONE: TOUCH; TWO: TOUCH }
    update(): void
    dispose(): void
  }
}


