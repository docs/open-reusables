const vscode = require('vscode');

function testNoTab(editor) {
    if (!editor) {
        vscode.window.showInformationMessage('No editor tab currently open');
        // Note: this function runs synchronously 
        // so other things will likely have happened before the script is stopped:
        return process.exit(1);
    }
}

// This regex matches liquid tags. e.g:
// - {%<something>%}
const liquidTagRegex = /{%([^%])*%}/;

// This regex matches frontmatter feature flags definitions. e.g.:
// - feature: '<something>'
// - feature: <something>
const frontmatterFeatureFlagRegex = /^ *feature: '*([^ ']*)'* *$/;

// This regex matches paths to a reusable, variable, or feature flag. e.g.:
// - data/reusables/<something>
// - data/variables/<something>
// - data/features/<something>
// As well as the same paths with a backslash as the directory separator.
const reusableOrVariableOrFeatureFlagPathRegex = /data.(reusables|variables|features).(.+)/;

// This regex matches the name of a variable definition on a line in a variable file. e.g.: 
const variableDefinitionNameRegex = /^([^:]*):/;

/* Gets the type and value of a reusable or feature flag.
   Returns an array with the type and value.

   The input can either be a string that is the user selection, or an editor
   object that is the active editor with it's cursor position.

   The return is an array with the type of docs thing being opened (i.e.
   reusable or feature), and the path or name of that thing. For reusables and
   variables, the path is the value of the liquid data tag (e.g.
   variables.product.prodname_dotcom), for feature flags it's the name of the
   flag (e.g. internal-actions).
*/
function getTypeAndValue(editorOrString) {
    let thingString = "";

    // If the parameter is a string we can use that directly.
    // Otherwise, it's an editor and we have to get the string from the editor.
    if (typeof editorOrString === 'string') {
        //console.log('its a string');
        thingString = editorOrString;
    } else {
        //console.log('its an editor');
        thingString = getThingString(editorOrString);
    }

    // console.log('thingString = ' + thingString);

    // Check to see if it's a reusable or a feature flag in a liquid tag.
    if (liquidTagRegex.test(thingString)) {
        // This variable is all the contents inside the liquid tag.
        // e.g. For the liquid tag '{% data variables.product.prodname_dotcom %}', it is 'data variables.product.prodname_dotcom'
        let liquidTagContents = liquidTagRegex.exec(thingString)[0].trim();
        
        //console.log('liquidTagContents = ' + liquidTagContents);

        // If it's a reusable, return the type and value.
        // This regex checks for anything that matches:
        // - data <something>
        let reusableRegex = /data (\S*)/;
        if (reusableRegex.test(liquidTagContents)) {
            // This is just the path of the reusable, (i.e. the stuff in the liquid tag after 'data').
            let reusableValue = reusableRegex.exec(liquidTagContents)[1];
            return ['reusable', reusableValue];
        }

        // If it's a feature flag in a liquid tag, return the type and value.
        // This regex checks for anything that matches:
        // - if <something>
        // - ifversion <something>
        let featureFlagRegex = /(?:if|ifversion) (\S*)/;
        if (featureFlagRegex.test(liquidTagContents)) {
            // This is just the name of the feature flag, (i.e. the stuff in the after 'if' or 'ifversion').
            let featureValue = featureFlagRegex.exec(liquidTagContents)[1];
            return ['feature', featureValue];
        }
    }

    // check for frontmatter feature flags
    if (frontmatterFeatureFlagRegex.test(thingString)) {
        let featureValue = frontmatterFeatureFlagRegex.exec(thingString)[1];
        return ['feature', featureValue];
    }
    // If it's not a liquid or feature flag, return null.
    return null;
}


/* For an editor object that is the active editor with it's cursor position,
    get's the string of a reusable frontmatter feature flag.

    The return is a string that is the liquid tag or frontmatter feature flag syntax.
*/
function getThingString(editor) {
    var regexArray = [liquidTagRegex, frontmatterFeatureFlagRegex];

    // Go through the array of regexes and return a string that matches.
    for (var i = 0; i < regexArray.length; i++) {
        let objSelectTextAroundCursor = editor.document.getWordRangeAtPosition(editor.selection.active, regexArray[i]);
        if (objSelectTextAroundCursor) {
            return editor.document.getText(objSelectTextAroundCursor).trim();
        }
    }

    // If we didn't find a match, return null.
    return null;
}



module.exports = {
    testNoTab,
    getTypeAndValue,
    getThingString,
    reusableOrVariableOrFeatureFlagPathRegex,
    variableDefinitionNameRegex
};