import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
const config = [
  {
    input: "src/index.ts",
    plugins: [
      typescript({
        tsconfigOverride: { compilerOptions: { module: "es2015" } },
      }),
    ],
    output: [
      {
        format: "cjs",
        sourcemap: true,
        preserveModules: true,
        dir: "dist/cjs",
      },
      {
        format: "esm",
        sourcemap: true,
        preserveModules: true,
        dir: "dist/esm",
      },
      {
        format: "umd",
        name: "doppio",
        sourcemap: true,
        file: "dist/umd/index.umd.js",
      },
    ],
  },
  {
    input: "src/index.ts",
    plugins: [dts()],
    output: [{ file: "dist/typings/index.d.ts", format: "es" }],
  },
];
export default config;
