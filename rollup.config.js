"use strict";

import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import nodeResolve from "rollup-plugin-node-resolve";
import { resolve } from "path";
import { terser } from "rollup-plugin-terser";
import { readFileSync } from "fs";

const dependencies = Object.keys(JSON.parse(readFileSync(resolve(__dirname, "package.json"))).dependencies)

export default {
    input: resolve(__dirname, "src", "main.js"),

    external: dependencies,

    plugins: [
        commonjs(),
        nodeResolve(),
        json({ compact: true, namedExport: false }),
        terser()
    ],

    output: {
        file: resolve(__dirname, "dist", "main.js"),
        format: "cjs"
    }
};
