import { defineConfig } from 'tsup';
export default defineConfig({
    entry: ['lib/main.ts'],
    format: ['cjs'],
    target: 'node14',
    platform: 'node',
    bundle: true,
    clean: true
    // dts: true,
    // watch: true,
    // treeshake: true,
});
//# sourceMappingURL=tsup.config.js.map