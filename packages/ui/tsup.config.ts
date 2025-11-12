import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  minify: false,
  external: ['vite', 'unplugin', 'ts-node'],
  noExternal: ['ts-node/dist/transpilers/swc.js'],
});
