import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import importAlias from 'rollup-plugin-import-alias';
import strip from '@rollup/plugin-strip';

const isProd = process.env.NODE_ENV === 'production';

export const rollupBase = {
  plugins: [
    external(),
    postcss({
      minimize: isProd,
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    resolve({
      extensions: ['.mjs', '.js', '.jsx', '.json'],
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react-is/index.js': ['isValidElementType', 'isContextConsumer'],
      },
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    json(),
    // gzipPlugin(),
    importAlias({
      Paths: {
        '@mfs-lib': './src/lib',
        '@mfs-react': './src/react',
        '@mfs-react-redux': './src/react-redux',
        '@mfs-redux': './src/redux',
        '@mfs-registry': './src/registry',
        '@mfs-core': './src/core',
      },
      Extensions: ['js'],
    }),
    strip({
      functions: ['window.__DON_T_USE_PUSH_REDUX_CHANGE_TO_STORYBOOK'],
    }),
    isProd &&
      terser({
        toplevel: true,
      }),
  ],
};
