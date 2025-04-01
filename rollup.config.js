import typescript from 'rollup-plugin-typescript2'
import { dts } from 'rollup-plugin-dts'
import del from 'rollup-plugin-delete' // Add this import

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      del({ targets: 'dist/*' }), // Add this to delete dist contents
      typescript({
        exclude: [
          '**/*.test.ts',
          '**/*.spec.ts',
          '**/tests/**',
          '**/__tests__/**',
        ],
      }),
    ],
    external: ['react', 'react/jsx-runtime', 'mixpanel-browser'],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
]

export default config
