import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'


export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_LEGACY
  } = viteEnv

  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    vueJsx(),
    vueSetupExtend()
  ]

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  if (isBuild) {
    // production environment
  }
  return vitePlugins
}
