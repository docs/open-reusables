# Contributing to Open Reusables

Thank you for your interest in contributing to the Open Reusables VS Code extension! This extension helps GitHub documentation authors work more efficiently with reusables, variables, and feature flags.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- VS Code (version 1.44.0 or higher)
- npm or yarn package manager

### Setting up the Development Environment

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/docs/open-reusables.git
   cd open-reusables
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Open the project in VS Code:
   ```bash
   code .
   ```

### Running and Testing the Extension

1. Press `F5` in VS Code to open a new Extension Development Host window with the extension loaded
2. Open a markdown file from a GitHub docs repository
3. Test the extension functionality using the keyboard shortcuts:
   - **Open file**: `Ctrl+Alt+O` (Windows) or `Ctrl+Cmd+O` (Mac)
   - **Copy reference**: `Ctrl+Alt+C` (Windows) or `Ctrl+Cmd+C` (Mac)

### Running Tests

```bash
npm test
```

## How to Contribute

### Reporting Issues

- Use the GitHub Issues tab to report bugs or request features
- Provide clear steps to reproduce any bugs
- Include your VS Code version and operating system
- Attach screenshots or screen recordings when helpful

### Submitting Changes

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes, following the coding guidelines below

3. Test your changes thoroughly

4. Commit your changes with a clear, descriptive message:
   ```bash
   git commit -m "Add feature: description of what you added"
   ```

5. Push your branch and create a pull request

### Coding Guidelines

- Follow the existing code style and structure
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure your code works on both Windows and macOS
- Test with various GitHub docs repository structures

### Code Structure

- `extension.js` - Main extension entry point
- `opener.js` - Logic for opening reusable/variable/feature files
- `copier.js` - Logic for copying references to clipboard
- `shared.js` - Shared utility functions and regular expressions
- `test/` - Test files

### Pull Request Guidelines

- Keep pull requests focused on a single feature or bugfix
- Include tests for new functionality when possible
- Update documentation if your changes affect usage
- Ensure all existing tests pass
- Be responsive to feedback during the review process

## Release Process

Releases are managed by the maintainers. Version bumps follow semantic versioning:
- Patch releases for bug fixes
- Minor releases for new features
- Major releases for breaking changes

## Questions?

If you have questions about contributing, feel free to:
- Open an issue for discussion
- Check existing issues and pull requests
- Review the README.md for usage information

Thank you for contributing to making GitHub documentation workflows more efficient!