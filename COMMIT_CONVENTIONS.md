# Git Commit Message Conventions

To maintain clarity and consistency in our codebase, use the following commit message prefixes when pushing code.

## 🔤 Prefixes

| Prefix     | Use Case                                      | Example                                      |
|------------|-----------------------------------------------|----------------------------------------------|
| feat:      | For new features or pages                     | feat: create dashboard page design           |
| fix:       | For bug fixes                                 | fix: resolve mobile menu toggle issue        |
| style:     | For UI style changes (no logic changes)       | style: update spacing on homepage            |
| refactor:  | For code restructuring without feature change | refactor: simplify form validation logic     |
| perf:      | For performance improvements                  | perf: lazy-load hero images                  |
| docs:      | For documentation updates                     | docs: add API usage examples to README       |
| test:      | For adding or updating tests                  | test: add unit tests for login component     |
| chore:     | For miscellaneous tasks (e.g., build tools)   | chore: update npm packages                   |
| build:     | For build system or dependency changes        | build: update webpack config                 |
| ci:        | For CI/CD configuration updates               | ci: add GitHub Actions for testing           |
| revert:    | For reverting previous commits                | revert: undo homepage layout changes         |

## ✅ Guidelines

- Use **present tense**: “add feature” not “added” or “adds”
- Keep messages **concise but descriptive**

## 🔧 Examples

```bash
git commit -m "feat: add contact form page"
git commit -m "fix: correct typo in footer component"
git commit -m "docs: update install instructions"
