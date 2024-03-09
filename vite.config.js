import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// import{loadEnv} from "vite";
// import dotenv from 'cross-env';
//
// dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
        plugins: [react()],
        build: {
            target: "es2022"
        },
        esbuild: {
            target: "es2022"
        },
        optimizeDeps: {
            esbuildOptions: {
                target: "es2022",
            }
        }
    },
)

// export default defineConfig(({ command, mode }) => {
//     // Load env file based on `mode` in the current working directory.
//     // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
//     const env = loadEnv(mode, process.cwd(), '')
//     return {
//         // vite config
//         plugins: [react()],
//         define: {
//             __APP_ENV__: JSON.stringify(env.BASE_URL),
//         },
//         build: {
//             target: "es2022"
//         },
//         esbuild: {
//             target: "es2022"
//         },
//         optimizeDeps: {
//             esbuildOptions: {
//                 target: "es2022",
//             }
//         }
//     }
// })
