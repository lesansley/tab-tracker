module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
    	"ecmaVersion": "6"
    },
    "env": {
    	"node": "true"
    },
    "extends": "standard",
    "rules": {
        "generator-star-spacing": "off", // allow async-await
        "indent": ["error", 2],
        "no-mixed-spaces-and-tabs": "error",
        "semi": ["error", "always"]
    }
};
