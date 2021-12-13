# Change log

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
