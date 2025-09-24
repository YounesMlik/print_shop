import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { readFileSync } from "fs";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/Website/app.tsx"],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },
    server: {
        // https: {
        //     key: read("/data/caddy/certificates/local/localhost/key.pem"),
        //     cert: read("/data/caddy/certificates/local/localhost/cert.pem"),
        // },
        host: "0.0.0.0",
        port: 5173,
        watch: {
            // Make sure vendor, storage, node_modules aren’t watched
            ignored: ['**/vendor/**', '**/storage/**', '**/node_modules/**', '**/.git/**'],
        },
        // hmr: false,
        hmr: {
            protocol: "ws",
            host: "localhost",
            port: 5173,
        },
    },
    build: {
        outDir: "public/build",
        emptyOutDir: true,
    },
});
