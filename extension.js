const vscode = require('vscode');
const copier = require('./copier.js');
const opener = require('./opener.js');

<<<<<<< HEAD
function activate(context) {
	context.subscriptions.push(vscode.commands.registerCommand('open-reusable', opener.openMain));
	context.subscriptions.push(vscode.commands.registerCommand('copy-reusable', copier.copyMain));
=======
// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('The extension "open-reusable" is now active.');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('open-reusable', function () {
		// The code you place here will be executed every time your command is executed
		console.log("****** Console output from the 'open-reusable' extension ******");
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No editor tab currently open');
			return;
		}
		var currentFilePath = editor.document.uri.fsPath;
		console.log('The current file = ' + currentFilePath);
		if (editor.document.isUntitled) {
			vscode.window.showInformationMessage("This doesn't work on files that aren't saved in the GitHub docs repository.");
			return;
		}

		var reusableString = "";
		var selection = editor.selection;
		if (selection.isEmpty) {
			let objSelectTextAroundCursor = editor.document.getWordRangeAtPosition(editor.selection.active, /{%[^%]*%}/ );
			if (objSelectTextAroundCursor) {
				reusableString = editor.document.getText(objSelectTextAroundCursor); 
			}
		}
		else reusableString = editor.document.getText(selection);
	
		var regex = /{% *data ([^ %]*) *%}/;
		var regexmatchArray = reusableString.match(regex);
		if (regexmatchArray === null) {
			vscode.window.showInformationMessage("You didn't select a valid reusable or a variable.");
			return;
		}
		else {		
			var directorySeparator = "/";
			// Detect whether this is Windows
			var isWin = process.platform === "win32";
			if (isWin) directorySeparator = "\\";
	
			console.log('isWin = ' + isWin);
			console.log('directorySeparator = ' + directorySeparator);

			var filepath = regexmatchArray[1];
			filepath = filepath.replace(/\./g, directorySeparator);
			
			regex = new RegExp(".*\\" + directorySeparator + "(docs|docs-internal)\\" + directorySeparator, "g");
			regexmatchArray = currentFilePath.match(regex);
			var basepath = regexmatchArray[0] + "data" + directorySeparator;
			console.log('basepath = ' + basepath);

			if (filepath.indexOf('variables') === 0) {
				var isVariable = true;

				// Get the variable name at the end of the filepath
				regex = new RegExp("\\" + directorySeparator + "([^\\" + directorySeparator + "]*$)");

				regexmatchArray = filepath.match(regex);
				var variableName = regexmatchArray[1];
				console.log("variableName = " + variableName);

				// Remove directorySeparator + variableName from the end of filepath:
				filepath = filepath.replace(new RegExp("\\" + directorySeparator + variableName + '$'), '');

				filepath = basepath + filepath + ".yml";
			}
			else filepath = basepath + filepath + ".md";

			filepath = decodeURIComponent(filepath);
			console.log('Path of file to open = ' + filepath);	
			
			vscode.workspace.openTextDocument(filepath).then(doc => {
				return vscode.window.showTextDocument(doc).then(e => {
					e.edit(editObject => {
						if (isVariable) findLineNumberOfVariable(variableName);
					});
				});
			}, (err) => {
				vscode.window.showErrorMessage("File not found: " + filepath);
			});
		}
	});
	context.subscriptions.push(disposable);
>>>>>>> 21bcea4765b0700ac2e57a28ecf25689decca97d
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
};