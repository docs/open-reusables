# Change log

## 1.7.1
30 March 2023

Updated the README file with details of how to use the extended features of the copy function.

## 1.7.0
30 March 2023

@lucascosti extended the existing copy command to generate a reference for a reusable, variable, or feature flag based on the cursor's position:

* If you're in a reusable file, this creates the `{% data reusables.path.to.reusable %}` reference and copies it to the clipboard.
* If you're in a variables file and on a variable definition line, this creates the `{% data variables.path.to.variablefile.variable-name %}` reference and copies it to the clipboard.
* If you're in a feature flag file, this creates a versioning tag like `{% ifversion featureFlagName %}{% endif %}` and copies it to the clipboard.

## 1.6.0
2 December 2022

Major refactor of the code by @lucascosti to facilitate future changes to this extension. 

This version:
- Adds the ability for the extension to open reusables/feature versioning tags that contain whitespace control.
- Consolidates various regular expressions to improve code maintainability.

## 1.5.2
14 September 2022

- @lucascosti fixed a bug that would stop the extension working after you attempted to use the copier feature on some `feature` entries in the front matter.

## 1.5.1
19 March 2022

- Update the repository URL in the package.json file.

## 1.5.0
19 August 2022
- @lucascosti modified the extension ([PR #123](https://github.com/hubwriter/open-reusables/pull/123)) to allow you to open a feature flag file from the `feature` versioning in the article's front matter (i.e. the data at the top of the markdown file).

   For example, in articles with front matter like this:

   ```
   versions:
     feature: 'actions-caching'
   ```

   If you place the cursor within the string assigned to `feature` and activate the "Open reusable file" action of the extension - either from the command palette or by using the keyboard shortcut (Ctrl + Alt + o, or control + command + o) - the extension opens the file in which the feature flag is defined. This works if the feature is declared with single quotes, or without quotes.

### Known issue
The following is a known bug with this release. If you place the cursor on the feature string in the front matter and trigger the "Copy the reusable at the cursor position" action - either from the command palette or by using the keyboard shortcut (Ctrl + Alt + c, or control + command + c) - the extension stops working. The workaround if this happens is to disable and then re-enable the extension.

## 1.4.2
18 March 2022

- Update the README to make it suitable for use on the Visual Studio Marketplace.

## 1.4.1
18 March 2022

- Update the publisher name.

## 1.4.0 
6 December 2021

- @lucascosti modified the extension ([PR #115](https://github.com/hubwriter/open-reusables/pull/115)) to allow it to open the appropriate [feature-based versioning](https://github.com/github/docs-internal/tree/main/data/features#feature-based-versioning) file for an inline feature-based versioning tag in a markdown file. For example, put the cursor within text such as `{% if command-palette %}` and run the extension (e.g. by pressing control+command+o) to open the `command-palette.yml` file. This allows you to quickly check which versions of the docs the marked text will appear in.

## 1.3.0 
6 October 2020

- Restructure the JavaScript into modules. Add copying functionality. You can now press control+command+c to copy the variable or reusable at the current cursor position.

## 1.2.0 
30 September 2020

- Change the regular expression to work with the new format for reusables. What was previously `{{ site.data.reusables.package_registry.authenticate-packages }}` is now `{% data reusables.package_registry.authenticate-packages %}`.

## 1.1.1 
11 August 2020

- Get it to work with the renamed `help-docs` repo: now called `docs-internal`.

## 1.1.0 
03 May 2020

- Fixed directory separators so that the extension now works on Windows as well as Mac/Linux.
- You can now open a variable or reusable by just clicking within it (or selecting text containing the variable or reusable), then running the extension. This is a a quicker/easier selection method.
- The variable within the variables file is now selected for you. This avoids you having to look for it yourself after the variables file is opened.
- Removed the message confirming that the reusable or variable file was found and opened.

## 1.0.0 
21 April 2020

- Initial release
