import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      // Alias for the components directory
      'components/': `${path.resolve(__dirname, 'src/components')}/`,
      'pages/': `${path.resolve(__dirname, 'src/pages')}/`,
      'hooks/': `${path.resolve(__dirname, 'src/hooks')}/`,
      store: path.resolve(__dirname, './src/store'),
      styles: path.resolve(__dirname, './src/styles'),
      utils: path.resolve(__dirname, './src/utils'),
      assets: path.resolve(__dirname, './src/assets'),
      data: path.resolve(__dirname, './src/data'),
    },
  },
});
