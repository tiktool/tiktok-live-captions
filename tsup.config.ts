import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: { resolve: ['@tiktool/live'] },
    clean: true,
    splitting: false,
    sourcemap: false,
    minify: false,
    // @tiktool/live 2.6.x ships a broken CommonJS entry, so the caption client
    // is bundled in; ws stays a normal runtime dependency.
    noExternal: ['@tiktool/live'],
    external: ['ws'],
});
