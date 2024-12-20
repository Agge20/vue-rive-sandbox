import type { RiveParameters } from '@rive-app/canvas'

export type UseRiveParameters = Partial<Omit<RiveParameters, 'canvas'>> | null

export type UseRiveOptions = {
  useDevicePixelRatio: boolean
  fitCanvasToArtboardHeight: boolean
  useOffscreenRenderer: boolean
}

export type Dimensions = {
  width: number
  height: number
}
