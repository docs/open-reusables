const vscode = require('vscode');
const shared = require('./shared.js');

function copyMain() {

    var editor = vscode.window.activeTextEditor;
    shared.testNoTab(editor);

    var reusableString = shared.getReusableString(editor);

    if (reusableString != "") {
        vscode.window.showInformationMessage('reusableString = ' + reusableString);
        console.log('reusableString = ' + reusableString);
    }
    else {
        vscode.window.showInformationMessage("Open reusales extension: cursor is not within a reusable or variable");
    }


    
    
}

module.exports = {
    copyMain
};