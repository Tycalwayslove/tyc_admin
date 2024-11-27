import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import pkg from './package.json';
import moment from 'moment';
import { resolve } from 'path'

import { wrapperEnv } from './build/utils';
import { createProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugin';
import { OUTPUT_DIR } from './build/constant';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '', dir)
}
const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss'),
};
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/'
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/'
        },
      ]
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    build: {
      target: "es2015",
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      // build.brotliSize（改为了 build.reportCompressedSize）
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      // __INTLIFY_PROD_DEVTOOLS__: false,
      // __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: createVitePlugins(viteEnv, isBuild),
  }
}
