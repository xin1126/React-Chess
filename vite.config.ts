import * as path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  build: {
    outDir: './build',
  },
  plugins: [
    tsconfigPaths(),
    react(),
    AutoImport({
      imports: [
        'react',
        'react-router-dom',
        {
          'react-redux': ['useSelector', 'useDispatch'],
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/socket.io': {
        target: 'ws://localhost:5000',
        ws: true,
      },
    },
  },
})
