import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    server: {
        host: 'localhost',
        port: 3000,
    },
    optimizeDeps: {
        include: ['jquery', 'datatables.net', 'datatables.net-dt'],
    },
});
