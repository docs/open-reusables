const vscode = require('vscode');
const shared = require('./shared.js');

function openMain() {
    var editor = vscode.window.activeTextEditor;
    shared.testNoTab(editor);

    var currentFilePath = editor.document.uri.fsPath;
    // console.log('The current file = ' + currentFilePath);
    if (editor.document.isUntitled) {
        vscode.window.showInformationMessage("This doesn't work on files that aren't saved in the GitHub docs repository.");
        return;
    }

    var selection = editor.selection;
    if (selection.isEmpty) {
        var selectedString = shared.getReusableString(editor);
        // console.log('selectedString = ' + selectedString);
    }
    else selectedString = editor.document.getText(selection);

    var reusableRegex = /{% *data ([^ %]*) *%}/;
    var regexmatchArray = selectedString.match(reusableRegex);

    var regexmatchArrayResultPosition = 1;

    var matchType = null;
    if (regexmatchArray !== null) {
        matchType = 'reusable';
    } else {
        var featureFlagRegex = /(?:{% *(?:if|ifversion) *([^ %]*) *%}|feature: '*([^ ']*)'* *$)/;
        regexmatchArray = selectedString.match(featureFlagRegex);
        // console.log('regexmatchArray = ' + regexmatchArray);
        if (regexmatchArray !== null) {
            matchType = 'feature';
            if (regexmatchArray[regexmatchArrayResultPosition] == null) { regexmatchArrayResultPosition = 2; }
        } else {
            vscode.window.showInformationMessage("You didn't select a valid reusable, variable, or feature flag.");
            return;
        }
    }
    // console.log('matchType = ' + matchType);

    var directorySeparator = "/";
    // Detect whether this is Windows
    var isWin = process.platform === "win32";
    if (isWin) directorySeparator = "\\";

    // console.log('isWin = ' + isWin);
    // console.log('directorySeparator = ' + directorySeparator);

    var filepath = regexmatchArray[regexmatchArrayResultPosition];
    filepath = filepath.replace(/\./g, directorySeparator);
    
    var regex = new RegExp(".*\\" + directorySeparator + "(docs|docs-internal)\\" + directorySeparator, "g");
    regexmatchArray = currentFilePath.match(regex);


    switch (matchType) {
        case 'reusable':
            var basepath = regexmatchArray[0] + "data" + directorySeparator;
            break;
        case 'feature':
            var basepath = regexmatchArray[0] + "data" + directorySeparator + "features" + directorySeparator;
            break;
    }
    // console.log('basepath = ' + basepath);

    if (filepath.indexOf('variables') === 0) {
        var isVariable = true;

        // Get the variable name at the end of the filepath
        regex = new RegExp("\\" + directorySeparator + "([^\\" + directorySeparator + "]*$)");

        regexmatchArray = filepath.match(regex);
        var variableName = regexmatchArray[1];
        // console.log("variableName = " + variableName);

        // Remove directorySeparator + variableName from the end of filepath:
        filepath = filepath.replace(new RegExp("\\" + directorySeparator + variableName + '$'), '');

        filepath = basepath + filepath + ".yml";
    }
    else {
        switch (matchType) {
          case 'reusable':
              filepath = basepath + filepath + ".md";
              break;
          case 'feature':
              filepath = basepath + filepath + ".yml";
              break;
        }
    }

    filepath = decodeURIComponent(filepath);
    // console.log('Path of file to open = ' + filepath);	
    
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

function findLineNumberOfVariable(variableName) {
	var neweditor = vscode.window.activeTextEditor; // The newly opened document
	var lineNumberOfVariable = 0;
	var currentCursorLineNumber = neweditor.selection.active.line + 1;
	var matchResultArray;

	let lineCount = neweditor.document.lineCount;
	for (let parseLine = 0; parseLine < lineCount; parseLine++) {
		let lineText = neweditor.document.lineAt(parseLine);
		let regex = new RegExp(variableName + ":");
		matchResultArray = lineText.text.match(regex);
		if (matchResultArray) {
			lineNumberOfVariable = parseLine + 1;
			// console.log("'" + variableName + ":' matched on line: " + lineNumberOfVariable);
			moveCursor(currentCursorLineNumber, lineNumberOfVariable);
			centralizar(lineNumberOfVariable);
			return;
		}
	}
	if (!matchResultArray) {
		// Move the cursor to line 1 of the variables file
		vscode.commands.executeCommand("cursorMove", {
			to: "up",
			by: "line",
			value: currentCursorLineNumber
		})		
		vscode.window.showInformationMessage("'" + variableName + "' isn't defined in this file.");
	}
}

function centralizar(lineToCenter) {
	// Put the current line as close as possible to the centre of the visible area in the editor
    vscode.commands.executeCommand("revealLine", {
        lineNumber: lineToCenter,
        at: "center"
    });
}

function moveCursor(currentCursorLineNumber, targetLineNumber) {
	// console.log("Move the cursor from its current position on line: " + currentCursorLineNumber);
	var errorPreamble = "Something is wrong with the cursorMove: ";

	// The executeCommand("cursorMove") command only works relative to the current cursor position
	// and doesn't allow you to specify the line you want to move to.
	// So we get around this by moving the cursor to the start of the document
	// and then down to the line we've already determined contains the variable.

	// Move the cursor to line 1 of the variables file
	vscode.commands.executeCommand("cursorMove", {
		to: "up",
		by: "line",
		value: currentCursorLineNumber
	})
	.then(undefined, err => {
		console.error(errorPreamble + "up. " + err);
	 });
	 // Move the cursor down to the desired line
	 vscode.commands.executeCommand("cursorMove", {
		to: "down",
		by: "line",
		value: targetLineNumber -1
	})
	.then(undefined, err => {
		console.error(errorPreamble + "down. " + err);
	 });

	 // The select property allows you to select everything between the current cursor position
	 // and the position you've moved the cursor to.
	 // So to select the whole line we first move the cursor to the start of the current line.
	 // And then to the end of the line, including the select property

	 vscode.commands.executeCommand("cursorMove", {
		to: "wrappedLineStart"
	})
	.then(undefined, err => {
		console.error(errorPreamble + "wrappedLineStart. " + err);
	 });
	 vscode.commands.executeCommand("cursorMove", {
		to: "wrappedLineEnd",
		select: true
	})
	.then(undefined, err => {
		console.error(errorPreamble + "wrappedLineEnd. " + err);
	 });
}

module.exports = {
    openMain
};