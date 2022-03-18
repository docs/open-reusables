<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/docs/open-reusables/master/images/open-reusable-icon.png" alt="logo">
  <br>
  Open a reusable
  <br>
</h1>
<br>

## Overview

Open the file corresponding to a Liquid tag for reusable text, a variable, or feature-based versioning, in the markdown file for an article on [docs.github.com](https://docs.github.com).

This Visual Studio Code extension works with markdown files in the public and internal repositories for GitHub's public-facing documentation. For example, the public [`docs`](https://github.com/github/docs) repository. 

While you're displaying a markdown file for a GitHub help article in Visual Studio Code, you can click the Liquid tag for a variable or a reusable, or the opening tag for feature-based versioning, and then run the extension to open the related file for the variable, reusable, or version in a new Visual Studio Code tab. 

You can also quickly copy the tag for a variable or a reusable. This is useful when you need to use the same variable more than once in an article.

## Using the extension

* To open a reusable file, a variable file, or a feature-based versioning file:

   Either select some markdown containing a reusable, a variable, or a feature-based versioning tag, or just click inside the tag to place the cursor there, then press:

   **Mac**: <kbd>control</kbd> + <kbd>command</kbd> + <kbd>o</kbd>
   
   **Windows**: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>o</kbd>

* To copy a [Liquid tag](https://shopify.github.io/liquid/tags/control-flow/), such as the reference to a reusable or variable:

   Click inside the tag to place the cursor there, then press:

   **Mac**: <kbd>control</kbd> + <kbd>command</kbd> + <kbd>c</kbd>

   **Windows**: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>c</kbd>

Alternatively run the extension from the command palette by choosing **Open reusable file** or **Copy the reusable at the cursor position**.

## Installing the extension

The easiest way is to go to [the page for this extension in the Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=AlistairChristie.open-reusables) and click **Install**.

Alternatively, you can install this extension manually:

1. Download the lastest `.vsix` package file from the [https://github.com/docs/open-reusables](https://github.com/docs/open-reusables#) repository.

1. Launch VS Code and display the extensions panel:

   ![Extensions panel](https://raw.githubusercontent.com/docs/open-reusables/master/images/extension-installation1.png)

1. Click the ellipsis button (top right of the panel).

1. Choose **Install from VSIX**:

   ![Install from VSIX option](https://raw.githubusercontent.com/docs/open-reusables/master/images/extension-installation2.png)

1. Browse to the `.vsix` file and click **Install**.

