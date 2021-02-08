const { compile } = require("svelte/compiler")
const fs = require("fs/promises")

async function run() {
	const text = compile(
		`
<a target={true ? undefined : "_blank"} {...$$props}>
	Hello, world!
</a>
`,
		{
			format: "cjs",
			generate: "ssr",
		},
	).js.code
	await fs.writeFile("component.js", text + "\n")
	const component = require("./component.js").default
	console.log(component.render())
}

run()
