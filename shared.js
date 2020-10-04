const vscode = require('vscode');

function testNoTab(editor) {
    if (!editor) {
        vscode.window.showInformationMessage('No editor tab currently open');
        // Note: this function runs synchronously 
        // so other things will likely have happened before the script is stopped:
        return process.exit(1);
    }
}

function getReusableString(editor) {
    let reusableString = "";
    let objSelectTextAroundCursor = editor.document.getWordRangeAtPosition(editor.selection.active, /{%[^%]*%}/ );
    if (objSelectTextAroundCursor) {
        reusableString = editor.document.getText(objSelectTextAroundCursor); 
    }
    return reusableString;
}





module.exports = {
    testNoTab,
    getReusableString
};