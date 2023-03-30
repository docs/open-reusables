const vscode = require('vscode');
const shared = require('./shared.js');

function copyMain() {

    var editor = vscode.window.activeTextEditor;
    shared.testNoTab(editor);

    var currentFilePath = editor.document.uri.fsPath;

    var reusableString = shared.getThingString(editor);

    if (reusableString) {
        // console.log('reusableString = ' + reusableString);

        // Write to clipboard
        vscode.env.clipboard.writeText(reusableString);

        // Get the range of the reusableString
        let stringRegex = new RegExp(reusableString, 'g');
        let reusableStringRange = editor.document.getWordRangeAtPosition(editor.selection.active, stringRegex);

        // set the selection to range of the reusableString
        editor.selection = new vscode.Selection(reusableStringRange.start, reusableStringRange.end);
    }
    // Else, see if we are in a reusable/variable/feature flag file
    else if (shared.reusableOrVariableOrFeatureFlagPathRegex.test(currentFilePath)) {
        // console.log('current file path = ' + editor.document.uri.fsPath);

        var regexMatchArray = currentFilePath.match(shared.reusableOrVariableOrFeatureFlagPathRegex);

        // console.log('type = ' + regexMatchArray[1]);

        // The first matching group in the regex is the directory of the type of thing: either `reusables`, `variables`, or `features`
        switch (regexMatchArray[1]) {
            case 'reusables':
                //console.log('reusable path = ' + regexMatchArray[2]);

                // Replace directory separators (for both *nix and Windows) with dots
                var reusablePath = regexMatchArray[2].replace(/(\/|\\)/g, '.');
                // strip the `.md` file extension
                reusablePath = reusablePath.replace(/.md$/,"");

                //console.log('revised reusable path = ' + reusablePath);

                // Construct the reusable reference
                var reusableReference = '{% data reusables.' + reusablePath + ' %}';

                // Copy it to the clipboard and display a message:
                vscode.env.clipboard.writeText(reusableReference);
                vscode.window.showInformationMessage("Reusable reference copied to clipboard.");
                break;
            case 'variables':
                // replace directory separators (for both *nix and Windows) with dots
                var variablePath = regexMatchArray[2].replace(/(\/|\\)/g, '.');
                // strip the `.yml` file extension
                variablePath = variablePath.replace(/.yml$/,"");

                //console.log('variable file path = ' + variablePath);

                // Make sure the current line contains a variable definition
                if (shared.variableDefinitionNameRegex.test(editor.document.lineAt(editor.selection.active.line).text)) {
                    // Get the variable name from the current line
                    var variableName = editor.document.lineAt(editor.selection.active.line).text.match(shared.variableDefinitionNameRegex);
                    
                    // console.log('variable name = ' + variableName[1]);

                    // Construct the variable reference
                    var variableReference = '{% data variables.' + variablePath + '.' + variableName[1] + ' %}';

                    // console.log('variableReference = ' + variableReference);

                    // Copy it to the clipboard and display a message:
                    vscode.env.clipboard.writeText(variableReference);
                    vscode.window.showInformationMessage("Variable reference copied to clipboard.");
                } else {
                    vscode.window.showInformationMessage("Cursor is not on a variable definition line.");
                }
                break;
            case 'features':
                // This gets the file name from the path (without the file extension)
                var featureFlagName = regexMatchArray[2].match(/[^/\\]*?(?=\.[^./\\]*$|$)/)[0];

                //console.log('feature flag = ' + featureFlagName);

                //Construct versioning uusing feature flag reference
                var featureFlagReference = '{% ifversion ' + featureFlagName + ' %}{% endif %}';
                // Copy it to the clipboard and display a message:
                vscode.env.clipboard.writeText(featureFlagReference);
                vscode.window.showInformationMessage("Feature flag versioning copied to clipboard.");
                break;
        }
    }
    else {
        vscode.window.showInformationMessage("Cursor is not within a reusable, variable, or feature flag.");
    }

}

module.exports = {
    copyMain
};
