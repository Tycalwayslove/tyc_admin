import type { Plugin } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
export function configSvgIconsPlugin() {
  const configSvgIconsPlugin: Plugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'icon-[dir]-[name]'
  })
  return configSvgIconsPlugin
}
