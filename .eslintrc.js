module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    plugins: [
        "mocha"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:json/recommended",
        "plugin:mocha/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
