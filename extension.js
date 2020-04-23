// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('The extension "open-reusable" is now active.');

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with  registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('open-reusable', function () {
	// 	// The code you place here will be executed every time your command is executed
	// 	var editor = vscode.window.activeTextEditor;
	// 	if (!editor) {
	// 		vscode.window.showInformationMessage('No editor tab currently open');
	// 		return;
	// 	}

	// 	var reusableString = "";
	// 	const range = editor.document.getWordRangeAtPosition(
	// 		editor.selection.active,
	// 		/{{[^}]*}}/
	// 	);
	// 	if (range) {
	// 		reusableString = editor.document.getText(range); 
	// 	}
	// 	if (reusableString === "") {
	// 		var selection = editor.selection;
	// 		reusableString = editor.document.getText(selection);	
	// 	}

	// 	var regex1 = /{{ *site\.data\.([^ }]*) *}}/;
	// 	var regex1matchArray = reusableString.match(regex1);
	// 	if (regex1matchArray === null) {
	// 		vscode.window.showInformationMessage("You didn't select a reusable or a variable.");
	// 		return;
	// 	}
	// 	else {
	// 		let currentFilePath = editor.document.uri.fsPath;
	// 		let regex2 = /.*\/help-docs\//;
	// 		let regex2matchArray = currentFilePath.match(regex2);
	// 		var basepath = regex2matchArray[0] + "data/";
			
	// 		var filepath = regex1matchArray[1];
	// 		filepath = filepath.replace(/\./g, '\/');

	// 		if (filepath.indexOf('variables') === 0) {
	// 			// You selected a variable, so remove the variable name at the end of the string,
	// 			// thereby leaving the file name (minus .yml) at the end of the filepath string.
	// 			let regex3 = /(.*)\//;
	// 			let regex3matchArray = filepath.match(regex3);
	// 			filepath = basepath + regex3matchArray[1] + ".yml";
	// 		}
	// 		else filepath = basepath + filepath + ".md";
			
	// 		vscode.workspace.openTextDocument(filepath)
	// 			.then( (doc) => {
	// 				//vscode.window.showInformationMessage('Opened: ' + filepath);
	// 				console.log('Opened: ' + filepath);
	// 				return vscode.window.showTextDocument(doc);
	// 			});
	// 	}
	// });
	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
