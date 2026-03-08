import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import pkg from './package.json' with {type: "json"};

export default {
  // Entry point for the library.
  input: './src/index.ts',

  plugins: [
    // Compile TypeScript and emit declaration files to the directory specified in tsconfig.json.
    typescript({
      tsconfigDefaults: {compilerOptions: {}},
      tsconfig: 'tsconfig.json',
      tsconfigOverride: {compilerOptions: {}},
      useTsconfigDeclarationDir: true,
    }),

    // Minify the output bundles.
    terser(),

    // Allow importing JSON files.
    json(),

    // Convert CommonJS modules to ES modules for bundling.
    commonjs(),

    // Resolve Node.js module imports (node_modules).
    nodeResolve({
      mainFields: ['module', 'main'],
    }),
  ],

  // Output bundles in three formats: ESM, CJS, and UMD.
  output: [
    {
      format: 'esm',
      file: pkg.module,  // dist/build.mjs
    },
    {
      format: 'cjs',
      file: pkg.main,  // dist/build.cjs
    },
    {
      format: 'umd',
      file: pkg.browser,  // dist/build.js
      // Convert package name "date-japanese" to camelCase "dateJapanese" for the UMD global variable.
      name: pkg.name
        .replace(/^.*\/|\.js$/g, '')
        .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', '')),
    },
  ],

  watch: {
    exclude: 'node_modules/**',
    include: 'src/**',
  },
}
