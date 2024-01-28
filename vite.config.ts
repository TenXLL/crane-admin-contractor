import { defineConfig, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import UnoCSS from 'unocss/vite';
import { createHtmlPlugin } from 'vite-plugin-html';

const pathSrc = path.resolve(__dirname, 'src');
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: './',
    plugins: [
      vue({
        script: {
          defineModel: true
        }
      }),
      UnoCSS({
        /* options */
      }),
      AutoImport({
        imports: ['vue'],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json'
        },
        resolvers: [ElementPlusResolver(), IconsResolver({})],
        vueTemplate: true,
        dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts')
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep']
          })
        ],
        dts: path.resolve(pathSrc, 'types', 'components.d.ts')
      }),
      Icons({
        autoInstall: true
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_NAME,
            injectScript: `<link rel="icon" type="image/svg+xml" href="${env.VITE_APP_ICON}"/>`
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': pathSrc
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: '@import "./src/common.less";'
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: env.VITE_APP_PORT,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true
        }
      }
    }
  } as unknown as UserConfig;
});
