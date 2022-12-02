const vscode = require('vscode');
const shared = require('./shared.js');

function copyMain() {

    var editor = vscode.window.activeTextEditor;
    shared.testNoTab(editor);

    var reusableString = shared.getThingString(editor);

    if (reusableString != "") {
        // console.log('reusableString = ' + reusableString);

        // Write to clipboard
        vscode.env.clipboard.writeText(reusableString);

        // Get the range of the reusableString
        let stringRegex = new RegExp(reusableString, 'g');
        let reusableStringRange = editor.document.getWordRangeAtPosition(editor.selection.active, stringRegex);

        // set the selection to range of the reusableString
        editor.selection = new vscode.Selection(reusableStringRange.start, reusableStringRange.end);
    }
    else {
        vscode.window.showInformationMessage("Cursor is not within a reusable, variable, or feature flag.");
    }

}

module.exports = {
    copyMain
};
