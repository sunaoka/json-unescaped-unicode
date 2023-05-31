import * as assert from 'assert';
import * as vscode from 'vscode';

const json = `{
	"hello": {
		"English": "Hello",
		"Japanese": "\u3053\u3093\u306b\u3061\u306f",
		"Korean": "\uc548\ub155\ud558\uc138\uc694",
		"Chinese": "\u4f60\u597d",
		"Arabic": "\u0645\u0631\u062d\u0628\u0627",
		"Hindi": "\u0928\u092e\u0938\u094d\u0924\u0947",
		"Ukrainian": "\u041f\u0440\u0438\u0432\u0456\u0442"
	}
}`;

const expected = `{
	"hello": {
		"English": "Hello",
		"Japanese": "こんにちは",
		"Korean": "안녕하세요",
		"Chinese": "你好",
		"Arabic": "مرحبا",
		"Hindi": "नमस्ते",
		"Ukrainian": "Привіт"
	}
}`;

const getUnicodeEscapedJson = (json: string) => {
	return JSON.stringify(JSON.parse(json), function (_key, value) {
		if (typeof value !== 'string') {
			return value;
		}
		return value.replace(/[\u007F-\uFFFF]/g, function(chr: string) {
			return '\\u' + ('0000' + chr.charCodeAt(0).toString(16)).slice(-4);
		});
	}).replace(/\\\\u/g, '\\u');
};

suite('Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('The currently active editor is not found', async () => {
		await vscode.commands.executeCommand('json-unescaped-unicode.run');

		assert.strictEqual(undefined, vscode.window.activeTextEditor);
	});

	test('When pressing Tab insert 2 spaces', async () => {
		const newDocument = await vscode.workspace.openTextDocument({
			content: getUnicodeEscapedJson(json),
			language: 'json',
		});

		await vscode.window.showTextDocument(newDocument);

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			assert.fail('The currently active editor is not found');
		}

		editor.options.insertSpaces = true;
		editor.options.tabSize = 2;

		await vscode.commands.executeCommand('json-unescaped-unicode.run');

		assert.strictEqual(
			editor.document.getText(),
			expected.replace(/\t/g, ' '.repeat(editor.options.tabSize))
					.replace(/\n/g, newDocument.eol === vscode.EndOfLine.LF ? '\n' : '\r\n')
		);
	});

	test('When pressing Tab insert tab', async () => {
		const newDocument = await vscode.workspace.openTextDocument({
			content: getUnicodeEscapedJson(json),
			language: 'json',
		});

		await vscode.window.showTextDocument(newDocument);

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			assert.fail('The currently active editor is not found');
		}

		editor.options.insertSpaces = false;

		await vscode.commands.executeCommand('json-unescaped-unicode.run');
		assert.strictEqual(
			editor.document.getText(),
			expected.replace(/\n/g, newDocument.eol === vscode.EndOfLine.LF ? '\n' : '\r\n')
		);
	});
});
