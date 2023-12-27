import {Editor, MarkdownView, Notice, Plugin} from 'obsidian';

const prettier = require("prettier");
const plugins = [
	require("prettier/plugins/babel"),
	require("prettier/plugins/html"),
	require("prettier/plugins/yaml"),
	require("prettier/plugins/graphql"),
	require("prettier/plugins/typescript"),
];

interface Formatter {
	name: string;
	parser: string;
}

export default class FormatCodePlugin extends Plugin {
	async onload() {
		let supportedFormats: Formatter[] = [
			// { name: 'CSS', parser: 'css' },
			// { name: 'PostCSS', parser: 'css' },
			// { name: 'Less', parser: 'less' },
			// { name: 'SCSS', parser: 'scss' },
			// { name: 'GraphQL', parser: 'graphql' },
			// { name: 'Handlebars', parser: 'glimmer' },
			// { name: 'Angular', parser: 'angular' },
			// { name: 'HTML', parser: 'html' },
			// { name: 'Lightning Web Components', parser: 'lwc' },
			// { name: 'Vue', parser: 'vue' },
			// { name: 'JavaScript', parser: 'babel' },
			// { name: 'Flow', parser: 'flow' },
			// { name: 'JSX', parser: 'babel' },
			// { name: 'TypeScript', parser: 'typescript' },
			// { name: 'TSX', parser: 'typescript' },
			// { name: 'JSON.stringify', parser: 'json-stringify' },
			// { name: 'JSON', parser: 'json' },
			// { name: 'JSON with Comments', parser: 'json' },
			// { name: 'JSON5', parser: 'json5' },
			// { name: 'Markdown', parser: 'markdown' },
			// { name: 'MDX', parser: 'mdx' },
			// { name: 'YAML', parser: 'yaml' },
			{ name: "JSON", parser: "json" },
			{ name: "YAML", parser: "yaml" },
			{ name: "HTML", parser: "html" },
			{ name: "GraphQL", parser: "graphql" },
			{ name: "TypeScript", parser: "typescript" },
		];

		supportedFormats.forEach(supportedFormat => {
			this.addCommand({
				id: 'format-prettier-' + supportedFormat.name,
				name: supportedFormat.name,
				editorCallback: (editor: Editor) => {
					try {
						const formatted = prettier.format(editor.getSelection(), {
							semi: true,
							parser: supportedFormat.parser,
							plugins: plugins
						});
						editor.replaceSelection(formatted);
					} catch (error) {
						console.log(error);
						new Notice("Format: " + error);
					}
				}
			});
		});
	}
}

/*
[
  { name: 'CSS', parsers: [ 'css' ] },
  { name: 'PostCSS', parsers: [ 'css' ] },
  { name: 'Less', parsers: [ 'less' ] },
  { name: 'SCSS', parsers: [ 'scss' ] },
  { name: 'GraphQL', parsers: [ 'graphql' ] },
  { name: 'Handlebars', parsers: [ 'glimmer' ] },
  { name: 'Angular', parsers: [ 'angular' ] },
  { name: 'HTML', parsers: [ 'html' ] },
  { name: 'Lightning Web Components', parsers: [ 'lwc' ] },
  { name: 'Vue', parsers: [ 'vue' ] },
  {
    name: 'JavaScript',
    parsers: [
      'babel',
      'acorn',
      'espree',
      'meriyah',
      'babel-flow',
      'babel-ts',
      'flow',
      'typescript'
    ]
  },
  { name: 'Flow', parsers: [ 'flow', 'babel-flow' ] },
  {
    name: 'JSX',
    parsers: [
      'babel',
      'babel-flow',
      'babel-ts',
      'flow',
      'typescript',
      'espree',
      'meriyah'
    ]
  },
  { name: 'TypeScript', parsers: [ 'typescript', 'babel-ts' ] },
  { name: 'TSX', parsers: [ 'typescript', 'babel-ts' ] },
  { name: 'JSON.stringify', parsers: [ 'json-stringify' ] },
  { name: 'JSON', parsers: [ 'json' ] },
  { name: 'JSON with Comments', parsers: [ 'json' ] },
  { name: 'JSON5', parsers: [ 'json5' ] },
  { name: 'Markdown', parsers: [ 'markdown' ] },
  { name: 'MDX', parsers: [ 'mdx' ] },
  { name: 'YAML', parsers: [ 'yaml' ] }
]
*/
