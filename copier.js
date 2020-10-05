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
        
        var startSelection, endSelection, moveLeftBy, moveRightBy;
        startSelection = endSelection = editor.document.offsetAt(editor.selection.anchor);
        // Get the position of the start of the reusable
        // Do this by parsing each character from the cursor leftwards
        // until reaching "{"
        for (let parseCharacter = ""; parseCharacter != "{"; startSelection--) {
            let startPosition = editor.document.positionAt(startSelection);
            let stopPosition = editor.document.positionAt(startSelection+1);
            let textRange = new vscode.Range(startPosition, stopPosition);
            parseCharacter = editor.document.getText(textRange);
            // console.log('startSelection = ' + startSelection + '; parseCharacter = ' + parseCharacter); 
            moveLeftBy =  endSelection - startSelection;
            // console.log('move left by = ' + moveLeftBy);  
        }
        // Get the position of the end of the reusable by parsing forwards
        for (let parseCharacter = ""; parseCharacter != "}"; endSelection++) {
            let startPosition = editor.document.positionAt(endSelection);
            let stopPosition = editor.document.positionAt(endSelection+1);
            let textRange = new vscode.Range(startPosition, stopPosition);
            parseCharacter = editor.document.getText(textRange);
            // console.log('endSelection = ' + endSelection + '; parseCharacter = ' + parseCharacter);
            moveRightBy =  endSelection - startSelection;
            // console.log('move left by = ' + moveRightBy);      
        }       
        
        // Move the cursor to the start of the reusable
        vscode.commands.executeCommand("cursorMove", {
            to: "left",
            by: "character",
            value: moveLeftBy
        })  
        // Move the cursor to the end of the reusable, selecting the text moved over
        vscode.commands.executeCommand("cursorMove", {
            to: "right",
            by: "character",
            value: moveRightBy,
            select: true
        })              

    }
    else {
        vscode.window.showInformationMessage("Open reusales extension: cursor is not within a reusable or variable");
    }

}

module.exports = {
    copyMain
};