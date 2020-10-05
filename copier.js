const vscode = require('vscode');
const shared = require('./shared.js');

function copyMain() {

    var editor = vscode.window.activeTextEditor;
    shared.testNoTab(editor);

    var reusableString = shared.getReusableString(editor);

    if (reusableString != "") {
        // console.log('reusableString = ' + reusableString);

        // Write to clipboard
        vscode.env.clipboard.writeText(reusableString);
        /* 
            // Check what's in the clipboard now:
            vscode.env.clipboard.readText().then((text)=>{
                let clipboard_content = text; 
                console.log('clipboard_content = ' + clipboard_content);
            });
        */
        
    }
    else {
        vscode.window.showInformationMessage("Open reusales extension: cursor is not within a reusable or variable");
    }


    
    
}

module.exports = {
    copyMain
};