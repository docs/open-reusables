const vscode = require('vscode');
const copier = require('./copier.js');
const opener = require('./opener.js');

function activate(context) {
	context.subscriptions.push(vscode.commands.registerCommand('open-reusable', opener.openMain));
	context.subscriptions.push(vscode.commands.registerCommand('copy-reusable', copier.copyMain));
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
};