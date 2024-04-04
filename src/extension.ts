import * as vscode from 'vscode';

const getIndentCharacters = () =>
	vscode.window.activeTextEditor?.options.insertSpaces
		? ' '.repeat(vscode.window.activeTextEditor.options.tabSize as number)
		: '\t';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('json-unescaped-unicode.run', async () => {
		const activeTextEditor = vscode.window.activeTextEditor;
		if (!activeTextEditor) {
			return;
		}

		const document = activeTextEditor.document;

		const json = JSON.parse(document.getText());

		await activeTextEditor.edit(editBuilder => {
			const range = new vscode.Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end);
			editBuilder.replace(range, JSON.stringify(json, null, getIndentCharacters()));
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
}
