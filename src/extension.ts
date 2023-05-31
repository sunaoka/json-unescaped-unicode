import * as vscode from 'vscode';

const getIndentCharacters = () => {
	if (vscode.window.activeTextEditor?.options.insertSpaces) {
		return ' '.repeat(vscode.window.activeTextEditor.options.tabSize as number);
	} else {
		return '\t';
	}
};

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('json-unescaped-unicode.run', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const document = editor.document;

		const json = JSON.parse(document.getText());

		await editor.edit(edit => {
			const range = new vscode.Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end);
			edit.replace(range, JSON.stringify(json, null, getIndentCharacters()));
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
