module.exports = {
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaVersion: 8
	},
	env: {
		node: true
	},
	extends: ["eslint:recommended", "plugin:vue/recommended"],
	rules: {
		"generator-star-spacing": "off", // allow async-await
		indent: ["error", 2],
		"no-mixed-spaces-and-tabs": "error",
		semi: ["error", "always"],
		"no-console": "off",
		"vue/html-self-closing": "off"
	}
};
