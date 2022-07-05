import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import obfuscatorPlugin from "rollup-plugin-obfuscator";
const config = [
  {
    input: "src/index.ts",
    plugins: [
      typescript({
        tsconfigOverride: { compilerOptions: { module: "es2015" } },
      }),
      obfuscatorPlugin({fileOptions: {},globalOptions:{
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.5,
        debugProtection: false,
        identifierNamesGenerator: "mangled",
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 5,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayEncoding: ["rc4"],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 5,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 5,
        stringArrayWrappersType: "function",
        stringArrayThreshold: 0.5,
        transformObjectKeys: true,
        unicodeEscapeSequence: false,
      }})
    ],
    output: [
      {
        format: "cjs",
        preserveModules: true,
        dir: "dist/cjs",
      },
      {
        format: "esm",
        preserveModules: true,
        dir: "dist/esm",
      },
      {
        format: "umd",
        name: "doppio",
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
