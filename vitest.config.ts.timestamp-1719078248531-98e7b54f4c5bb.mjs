// vitest.config.ts
import { defineConfig } from "file:///Users/sendi/Repository/clones/photobook/node_modules/vitest/dist/config.js";
import tsconfigPaths from "file:///Users/sendi/Repository/clones/photobook/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vitest_config_default = defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "src/setupTests.ts",
    // Your setup file, if you have one
    include: ["**/*.test.{js,jsx,ts,tsx}"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*"
    ],
    watchExclude: ["**/node_modules/**", "**/dist/**"]
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9zZW5kaS9SZXBvc2l0b3J5L2Nsb25lcy9waG90b2Jvb2tcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zZW5kaS9SZXBvc2l0b3J5L2Nsb25lcy9waG90b2Jvb2svdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc2VuZGkvUmVwb3NpdG9yeS9jbG9uZXMvcGhvdG9ib29rL3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbdHNjb25maWdQYXRocygpXSxcbiAgdGVzdDoge1xuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgc2V0dXBGaWxlczogJ3NyYy9zZXR1cFRlc3RzLnRzJywgLy8gWW91ciBzZXR1cCBmaWxlLCBpZiB5b3UgaGF2ZSBvbmVcbiAgICBpbmNsdWRlOiBbJyoqLyoudGVzdC57anMsanN4LHRzLHRzeH0nXSxcbiAgICBleGNsdWRlOiBbXG4gICAgICAnKiovbm9kZV9tb2R1bGVzLyoqJyxcbiAgICAgICcqKi9kaXN0LyoqJyxcbiAgICAgICcqKi9jeXByZXNzLyoqJyxcbiAgICAgICcqKi8ue2lkZWEsZ2l0LGNhY2hlLG91dHB1dCx0ZW1wfS8qKicsXG4gICAgICAnKiove2thcm1hLHJvbGx1cCx3ZWJwYWNrLHZpdGUsdml0ZXN0LGplc3QsYXZhLGJhYmVsLG55YyxjeXByZXNzLHRzdXAsYnVpbGQsZXNsaW50LHByZXR0aWVyfS5jb25maWcuKicsXG4gICAgXSxcbiAgICB3YXRjaEV4Y2x1ZGU6IFsnKiovbm9kZV9tb2R1bGVzLyoqJywgJyoqL2Rpc3QvKionXSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4UyxTQUFTLG9CQUFvQjtBQUMzVSxPQUFPLG1CQUFtQjtBQUUxQixJQUFPLHdCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsY0FBYyxDQUFDO0FBQUEsRUFDekIsTUFBTTtBQUFBLElBQ0osYUFBYTtBQUFBLElBQ2IsU0FBUztBQUFBLElBQ1QsWUFBWTtBQUFBO0FBQUEsSUFDWixTQUFTLENBQUMsMkJBQTJCO0FBQUEsSUFDckMsU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsY0FBYyxDQUFDLHNCQUFzQixZQUFZO0FBQUEsRUFDbkQ7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
